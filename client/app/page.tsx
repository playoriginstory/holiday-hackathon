"use client";

import CharacterPage from "@/components/character";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WalletConnection from "@/components/WalletConnection";
import { getUserAvatar } from "@/lib/dynamodb";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useAccount, useBalance, useSendTransaction } from "wagmi";
import {
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
} from "@solana/web3.js";

export default function Home() {
  const [selectedChain, setSelectedChain] = useState<"lens" | "solana">(
    "solana"
  );
  const [isTxSuccess, setIsTxSuccess] = useState(false);

  // Lens-specific states
  const { address, isConnecting, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { sendTransaction } = useSendTransaction();

  // Solana-specific states
  const wallet = useWallet();
  const { publicKey, connected } = wallet;
  const { connection } = useConnection();

  useEffect(() => {
    if (selectedChain === "lens" && isConnected) {
      const getAvatar = async () => {
        const address = "0x1"; // Replace with actual logic if needed
        const res = await getUserAvatar(address as string);
        console.log("Avatar fetched:", res?.avatarUrl);
      };
      getAvatar();
    }
  }, [isConnected, address, selectedChain]);

  const handleLensInsert = () => {
    interface TransactionConfig {
      to: string;
      value: ReturnType<typeof parseEther>;
    }

    interface TransactionCallbacks {
      onSuccess: (hash: string) => Promise<void>;
      onError: (error: Error) => void;
    }

    const transactionConfig: TransactionConfig = {
      to: process.env.NEXT_PUBLIC_LENS_RECEIVER_ADDRESS as string,
      value: parseEther("0.01"),
    };

    const transactionCallbacks: TransactionCallbacks = {
      onSuccess: async (hash: string) => {
        setIsTxSuccess(true);
      },
      onError: (error: Error) => {
        console.error("Lens TX ERROR", error);
      },
    };

    sendTransaction(transactionConfig, transactionCallbacks);
  };

  const handleSolanaInsert = async () => {
    try {
      if (!connection || !publicKey || !connected) {
        setIsTxSuccess(false);
        return;
      }

      const senderBalance = await connection.getBalance(publicKey);
      if (senderBalance < LAMPORTS_PER_SOL) {
        console.log("Insufficient balance. You need at least 1 SOL.");
        return;
      }

      const lamportsToSend = 1 * LAMPORTS_PER_SOL;
      const recipientPubKey = new PublicKey(
        process.env.NEXT_PUBLIC_SOLANA_RECEIVER_ADDRESS as string
      );

      const transferTransaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: lamportsToSend,
        })
      );

      const transactionSignature = await wallet.sendTransaction(
        transferTransaction,
        connection,
        {
          preflightCommitment: "processed",
        }
      );

      const confirmation = await connection.confirmTransaction(
        transactionSignature,
        "processed"
      );
      if (confirmation?.value?.err) {
        console.error("Transaction failed", confirmation.value.err);
        return;
      }

      setIsTxSuccess(true);
    } catch (error) {
      console.error("Error during transaction:", error);
      setIsTxSuccess(false);
    }
  };

  if (isConnecting && selectedChain === "lens") {
    return (
      <Card className="w-full max-w-lg">
        <CardContent className="!pt-6 text-center">
          Connecting wallet...
        </CardContent>
      </Card>
    );
  }

  if (!isConnected && selectedChain === "lens") {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle>Welcome to Prompt Destroyers</CardTitle>
          <CardDescription>Connect your wallet to begin</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ConnectKitButton />
        </CardContent>
      </Card>
    );
  }

  if (!connected && selectedChain === "solana") {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle>Welcome to Prompt Destroyers</CardTitle>
          <CardDescription>Connect your Solana wallet to begin</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <WalletConnection />
        </CardContent>
      </Card>
    );
  }

  if (isConnected || connected) {
    return !isTxSuccess ? (
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle>Welcome to Prompt Destroyers</CardTitle>
        </CardHeader>
        <CardContent className="!pt-6">
          <p>Select Chain to Continue</p>
          <select
            value={selectedChain}
            onChange={(e) =>
              setSelectedChain(e.target.value as "lens" | "solana")
            }
            className="mt-4 w-full border p-2 rounded"
          >
            <option value="lens">Lens ($GRASS)</option>
            <option value="solana">Solana</option>
          </select>

          {selectedChain === "lens" ? (
            <>
              <p className="mt-4">Insert $GRASS to play</p>
              {balance?.value <= 0 ? (
                <>
                  <p>
                    You don't have enough $GRASS, use faucet to add and then
                    refresh the page.
                  </p>
                  <Button
                    asChild
                    variant="default"
                    size="lg"
                    className="mt-4 w-full"
                  >
                    <Link
                      target="_blank"
                      href="https://testnet.lenscan.io/faucet"
                    >
                      Add $GRASS
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLensInsert}
                  variant="default"
                  size="lg"
                  className="mt-4 w-full"
                >
                  Insert 1 $GRASS
                </Button>
              )}
            </>
          ) : (
            <>
              <p className="mt-4">Insert Solana to play</p>
              <Button
                onClick={handleSolanaInsert}
                variant="default"
                size="lg"
                className="mt-4 w-full"
              >
                Insert 1 SOL
              </Button>
              <WalletConnection />
            </>
          )}
        </CardContent>
      </Card>
    ) : (
      <CharacterPage />
    );
  }

  return null;
}


// return (
//   <div className="flex min-h-screen flex-col items-center justify-center bg-primary p-4">
//     <div className="w-90 mb-8">
//       {/* <Image src="/logo.jpg" alt="Prompt Destroyers Logo" width={500} height={500} className="rounded-lg shadow-lg" priority /> */}
//       <video className="rounded-lg shadow-lg" width="500" autoPlay loop>
//         <source src="/assets/videos/initialCardVideo.mp4" type="video/mp4" />
//         Your browser doesn't support this video
//       </video>
//     </div>

//     <div className="w-full max-w-lg">
//       {balance && isConnected ? (
//         <Card className="text-center">
//           <CardHeader>
//             <CardTitle>Welcome to Prompt Destroyers</CardTitle>
//           </CardHeader>
//           <CardContent className="!pt-6">
//             {/* <div className="mb-4 flex w-full justify-center">
//               <img
//                 src={userAvatar}
//                 alt="User Avatar"
//                 className="h-24 w-24 rounded-full"
//               />
//             </div> */}
//             <p>Insert 1 $GRASS to play</p>
//             {/* <p className="font-mono">{`${balance?.value} GRASS`}</p> */}

//             {false ? (
//               <>
//                 <p>
//                   You don't have enough $GRASS, use faucet to add and then
//                   refresh page.
//                 </p>
//                 <Button
//                   asChild
//                   variant="default"
//                   size="lg"
//                   className="mt-4 w-full"
//                 >
//                   <Link
//                     target="_blank"
//                     href="https://testnet.lenscan.io/faucet"
//                   >
//                     Add $GRASS
//                   </Link>
//                 </Button>
//               </>
//             ) : (
//               <Button
//                 onClick={handleInsert}
//                 variant="default"
//                 size="lg"
//                 className="mt-4 w-full"
//               >
//                 Insert 1 $GRASS
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       ) : (
//         <>
//           {!isConnected ? (
//             <Card>
//               <CardHeader className="text-center">
//                 <CardTitle>Welcome to Prompt Destroyers</CardTitle>
//                 <CardDescription>
//                   Connect your wallet to begin
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="flex justify-center">
//                 <ConnectKitButton />
//               </CardContent>
//             </Card>
//           ) : (
//             <Card className="flex flex-col items-center gap-6">
//               {/* <CardContent className="w-full rounded-lg bg-black/20 p-4">
//                 {isBalanceLoading ? (
//                   <p className="mt-2 animate-pulse text-gray-300">
//                     Loading balance...
//                   </p>
//                 ) : (
//                   <p className="mt-2 font-mono">
//                     {balance?.formatted} {balance?.symbol}
//                   </p>
//                 )}
//               </CardContent> */}

//               <CardContent className="flex w-full flex-col items-center justify-center gap-4 !pt-6">
//                 <Button
//                   asChild
//                   variant="default"
//                   size="lg"
//                   className="w-full"
//                   // onClick={() => setIsOpenedInsert(true)}
//                 >
//                   <Link href="/profile">Create Your Avatar</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           )}
//         </>
//       )}
//     </div>
//   </div>
// );

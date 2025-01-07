"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance } from "wagmi";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { address, isConnecting, isConnected } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
  });

  if (isConnecting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary">
        <div className="animate-pulse text-lg text-white">Connecting...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary p-4">
      <div className="w-90 mb-8">
        <Image
          src="/logo.jpg"
          alt="Prompt Destroyers Logo"
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
          priority
        />
      </div>

      <div className="w-full max-w-md rounded-xl bg-white p-8 backdrop-blur-sm">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="mb-4 text-2xl font-bold text-white">
              Welcome to Prompt Destroyers
            </h1>
            <p className="mb-4 text-center text-gray-200">
              Connect your wallet to begin:
            </p>
            <ConnectKitButton />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="w-full rounded-lg bg-black/20 p-4">
              {/* <p className="text-sm text-gray-300">Connected as:</p>
              <p className="truncate font-mono text-white">{address}</p> */}

              {isBalanceLoading ? (
                <p className="mt-2 animate-pulse text-gray-300">
                  Loading balance...
                </p>
              ) : (
                <p className="mt-2 font-mono">
                  {balance?.formatted} {balance?.symbol}
                </p>
              )}
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-4">
              <ConnectKitButton />
              <Button asChild variant="default" className="w-full">
                <Link href="/profile">Create Your Avatar</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance } from "wagmi";
import Link from "next/link";

export default function Home() {
  const { address, isConnecting, isConnected } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
  });

  if (isConnecting) return <div>Connecting...</div>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary">
      {!isConnected ? (
        <div>
          <p>Please connect your wallet:</p>
          <ConnectKitButton />
        </div>
      ) : (
        <div>
          <p className="text-white">Connected as: {address}</p>
          {isBalanceLoading ? (
            <p>Loading balance...</p>
          ) : (
            <p className="text-white">
              Balance: {balance?.formatted} {balance?.symbol}
            </p>
          )}
          <div className="flex flex-col items-center gap-4">
            <ConnectKitButton />
            <Link
              href="/profile"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Create Your Avatar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

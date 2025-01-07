"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance } from "wagmi";

export default function Home() {
  const { address, isConnecting, isConnected } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
  });

  if (isConnecting) return <div>Connecting...</div>;

  return (
    <div className="flex min-h-screen flex-col items-center bg-primary justify-center">
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
          <ConnectKitButton />
        </div>
      )}
    </div>
  );
}

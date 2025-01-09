"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";

export default function Home() {
  const [isOpenedInsert, setIsOpenedInsert] = useState<boolean>();
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
        {/* <Image src="/logo.jpg" alt="Prompt Destroyers Logo" width={500} height={500} className="rounded-lg shadow-lg" priority /> */}
        <video className="rounded-lg shadow-lg" width="500" autoPlay loop>
          <source src="/assets/videos/initialCardVideo.mp4" type="video/mp4" />
          Your browser doesn't support this video
        </video>
      </div>

      <div className="w-full max-w-lg">
        {isOpenedInsert && balance ? (
          <Card className="flex flex-col items-center gap-6">
            <CardContent className="!pt-6">
              <p>Insert 1 $GRASS to play</p>
              {/* open this code for deployment */}
              {/* {+balance.formatted < 1 ? (
                            <p>Not enough $GRASS, use faucet to add: LINK</p>
                            ) : (
                              <Button variant="default" className="w-full">
                              Insert
                              </Button>
                              )} */}

              {/* remove this code its for deployment */}
              <Button
                asChild
                variant="default"
                size="lg"
                className="mt-4 w-full"
              >
                <Link href="/profile">Insert</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {!isConnected ? (
              <Card className="flex flex-col items-center justify-center gap-4">
                <h1 className="mb-4 text-2xl font-bold text-white">
                  Welcome to Prompt Destroyers
                </h1>
                <p className="mb-4 text-center text-gray-200">
                  Connect your wallet to begin:
                </p>
                <ConnectKitButton />
              </Card>
            ) : (
              <Card className="flex flex-col items-center gap-6">
                {/* <CardContent className="w-full rounded-lg bg-black/20 p-4">
                  {isBalanceLoading ? (
                    <p className="mt-2 animate-pulse text-gray-300">
                      Loading balance...
                    </p>
                  ) : (
                    <p className="mt-2 font-mono">
                      {balance?.formatted} {balance?.symbol}
                    </p>
                  )}
                </CardContent> */}

                <CardContent className="flex w-full flex-col items-center justify-center gap-4 !pt-6">
                  <ConnectKitButton />
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full"
                    onClick={() => setIsOpenedInsert(true)}
                  >
                    Create Your Avatar
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}

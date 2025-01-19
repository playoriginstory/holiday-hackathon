import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Web3Provider } from "@/providers/Web3Provider";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import WalletContextProvider from "@/providers/WalletContextProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Prompt Destroyers",
  // description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col items-center justify-center bg-primary p-4">
          <div className="w-90 mb-8">
            {/* <Image src="/logo.jpg" alt="Prompt Destroyers Logo" width={500} height={500} className="rounded-lg shadow-lg" priority /> */}
            <video className="rounded-lg shadow-lg" width="500" autoPlay loop>
              <source
                src="/assets/videos/initialCardVideo.mp4"
                type="video/mp4"
              />
              Your browser doesn't support this video
            </video>
          </div>
          <WalletContextProvider>
          <Web3Provider>{children}</Web3Provider></WalletContextProvider>
        </div>
      </body>
    </html>
  );
}

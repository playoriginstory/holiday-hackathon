import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Web3Provider } from "@/providers/Web3Provider";
import Navbar from "@/components/Header/Navbar";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary`}
      >
        <Web3Provider>
          <Navbar />
          <div className="flex min-h-screen flex-col items-center justify-center  p-4">
            <div className="w-90 mb-8">
              <video className="rounded-lg shadow-lg" width="500" autoPlay loop>
                <source
                  src="/assets/videos/initialCardVideo.mp4"
                  type="video/mp4"
                />
                Your browser doesn't support this video
              </video>
            </div>
            {children}
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}

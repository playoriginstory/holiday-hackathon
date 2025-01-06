import React from 'react';
import { ConnectKitButton } from 'connectkit';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-6xl font-bold text-center mb-8">
          Prompt Destroyers
        </h1>
        <div className="max-w-xl mx-auto text-center">
          <ConnectKitButton />
        </div>
      </div>
    </div>
  );
}
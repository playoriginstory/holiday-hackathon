// File: src/app.tsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { WagmiConfig, createConfig } from 'wagmi';
import { ConnectKitProvider } from 'connectkit';
import { mainnet } from 'wagmi/chains';

// Pages
import Home from '../pages/Home';
import Game from '../pages/Game';
import CharacterSelect from '../pages/CharacterSelect';
import Leaderboard from '../pages/Leaderboard';

const wagmiConfig = createConfig({
  chains: [mainnet],
  // Add your wallet connectors configuration here
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/play',
    element: <Game />,
  },
  {
    path: '/characters',
    element: <CharacterSelect />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
]);

const App = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider>
        <RouterProvider router={router} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
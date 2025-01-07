import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { mainnet } from 'wagmi/chains';
import Home from './Home';
import Game from './Game';
import CharacterSelect from './CharacterSelect';
import Leaderboard from './Leaderboard';

// Configure Wagmi with chains and connectors
const { provider, webSocketProvider } = configureChains([mainnet], [
  // Add any providers you want to use, e.g., alchemyProvider, publicProvider
]);

const wagmiConfig = createConfig(
  getDefaultClient({
    appName: 'Prompt Destroyers',
    chains: [mainnet],
    provider,
    webSocketProvider,
  })
);

// Define routes for the application
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

const App: React.FC = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider>
        <RouterProvider router={router} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;

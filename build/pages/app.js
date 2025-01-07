"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const wagmi_1 = require("wagmi");
const connectkit_1 = require("connectkit");
const chains_1 = require("wagmi/chains");
const Home_1 = __importDefault(require("./Home"));
const Game_1 = __importDefault(require("./Game"));
const CharacterSelect_1 = __importDefault(require("./CharacterSelect"));
const Leaderboard_1 = __importDefault(require("./Leaderboard"));
// Configure Wagmi with chains and connectors
const { provider, webSocketProvider } = (0, wagmi_1.configureChains)([chains_1.mainnet], [
// Add any providers you want to use, e.g., alchemyProvider, publicProvider
]);
const wagmiConfig = (0, wagmi_1.createConfig)((0, connectkit_1.getDefaultClient)({
    appName: 'Prompt Destroyers',
    chains: [chains_1.mainnet],
    provider,
    webSocketProvider,
}));
// Define routes for the application
const router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: '/',
        element: react_1.default.createElement(Home_1.default, null),
    },
    {
        path: '/play',
        element: react_1.default.createElement(Game_1.default, null),
    },
    {
        path: '/characters',
        element: react_1.default.createElement(CharacterSelect_1.default, null),
    },
    {
        path: '/leaderboard',
        element: react_1.default.createElement(Leaderboard_1.default, null),
    },
]);
const App = () => {
    return (react_1.default.createElement(wagmi_1.WagmiConfig, { config: wagmiConfig },
        react_1.default.createElement(connectkit_1.ConnectKitProvider, null,
            react_1.default.createElement(react_router_dom_1.RouterProvider, { router: router }))));
};
exports.default = App;

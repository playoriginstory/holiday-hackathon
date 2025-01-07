"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const react_1 = __importDefault(require("react"));
const connectkit_1 = require("connectkit");
function Home() {
    return (react_1.default.createElement("div", { className: "min-h-screen bg-gradient-to-br from-purple-900 to-black text-white" },
        react_1.default.createElement("div", { className: "container mx-auto px-4 py-8" },
            react_1.default.createElement("h1", { className: "text-6xl font-bold text-center mb-8" }, "Prompt Destroyers"),
            react_1.default.createElement("div", { className: "max-w-xl mx-auto text-center" },
                react_1.default.createElement(connectkit_1.ConnectKitButton, null)))));
}

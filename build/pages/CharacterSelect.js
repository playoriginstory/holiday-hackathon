"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CharacterSelect;
const react_1 = __importDefault(require("react"));
function CharacterSelect() {
    return (react_1.default.createElement("div", { className: "min-h-screen bg-gradient-to-br from-purple-900 to-black text-white" },
        react_1.default.createElement("h1", null, "Character Select")));
}

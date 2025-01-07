"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToLeaderboard = exports.getLeaderboard = void 0;
let leaderboard = [];
const getLeaderboard = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => resolve(leaderboard), 500); // Simulate network delay
    });
});
exports.getLeaderboard = getLeaderboard;
const addToLeaderboard = (name, score) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            leaderboard.push({ name, score });
            leaderboard.sort((a, b) => b.score - a.score); // Sort by score (highest first)
            resolve();
        }, 500);
    });
});
exports.addToLeaderboard = addToLeaderboard;

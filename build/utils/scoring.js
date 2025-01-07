"use strict";
// src/utils/scoring.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSemanticAccuracy = exports.calculateAccuracy = void 0;
const axios_1 = __importDefault(require("axios"));
// Function to calculate accuracy based on exact word matches
const calculateAccuracy = (correctPrompt, userPrompt) => {
    const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
    const correctWords = normalize(correctPrompt).split(" ");
    const userWords = normalize(userPrompt).split(" ");
    const totalWords = correctWords.length;
    const matchedWords = correctWords.filter((word) => userWords.includes(word));
    return Math.round((matchedWords.length / totalWords) * 100);
};
exports.calculateAccuracy = calculateAccuracy;
// Function to calculate accuracy based on semantic similarity using OpenAI API
const calculateSemanticAccuracy = (correctPrompt, userPrompt) => __awaiter(void 0, void 0, void 0, function* () {
    const apiUrl = 'https://api.openai.com/v1/completions';
    try {
        const response = yield axios_1.default.post(apiUrl, {
            model: 'text-davinci-003',
            prompt: `Compare the following sentences for semantic similarity:\n1. ${correctPrompt}\n2. ${userPrompt}\nProvide a similarity score between 0 and 1.`,
            max_tokens: 10,
            temperature: 0,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });
        const similarityScore = parseFloat(response.data.choices[0].text.trim());
        return Math.round(similarityScore * 100); // Convert to percentage
    }
    catch (error) {
        console.error('Error in semantic scoring:', error);
        return 0; // Fallback score in case of error
    }
});
exports.calculateSemanticAccuracy = calculateSemanticAccuracy;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.default = Game;
const react_1 = __importStar(require("react"));
const prompts_1 = require("../game/prompts");
const scoring_1 = require("../utils/scoring"); // Import the new semantic scoring function
const leaderboard_1 = require("../utils/leaderboard");
const api_1 = require("../utils/api");
function Game() {
    const [playerName, setPlayerName] = (0, react_1.useState)('Player Name');
    const [category, setCategory] = (0, react_1.useState)(null);
    const [currentPrompt, setCurrentPrompt] = (0, react_1.useState)(null);
    const [image, setImage] = (0, react_1.useState)(null);
    const [userInput, setUserInput] = (0, react_1.useState)('');
    const [score, setScore] = (0, react_1.useState)(null);
    const [timer, setTimer] = (0, react_1.useState)(30);
    const [isTimeUp, setIsTimeUp] = (0, react_1.useState)(false);
    const [round, setRound] = (0, react_1.useState)(0);
    const [totalRounds, setTotalRounds] = (0, react_1.useState)(3); // Default to 3 rounds
    const [totalScore, setTotalScore] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        let timerInterval;
        if (timer > 0 && currentPrompt) {
            timerInterval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        else if (timer === 0) {
            setIsTimeUp(true);
            clearInterval(timerInterval);
        }
        return () => clearInterval(timerInterval);
    }, [timer, currentPrompt]);
    const handleCategorySelect = (selectedCategory) => {
        if (selectedCategory in prompts_1.categories) {
            setCategory(selectedCategory);
            setRound(1);
            setTotalScore(0);
            loadNewPrompt(selectedCategory);
        }
        else {
            console.error('Invalid category selected:', selectedCategory);
        }
    };
    const loadNewPrompt = (selectedCategory) => __awaiter(this, void 0, void 0, function* () {
        const prompts = prompts_1.categories[selectedCategory];
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setCurrentPrompt(randomPrompt.prompt);
        setImage(randomPrompt.image);
        setTimer(30);
        setIsTimeUp(false);
        setScore(null);
        setUserInput('');
    });
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        if (currentPrompt && !isTimeUp) {
            // Use the new semantic scoring function
            const accuracy = yield (0, scoring_1.calculateSemanticAccuracy)(currentPrompt, userInput);
            setScore(accuracy);
            setTotalScore((prev) => prev + accuracy);
            // Call the Subnet API to generate a new image based on user input
            try {
                const newImageUrl = yield (0, api_1.generateImageSubnet)(userInput, 'horizontal');
                setImage(newImageUrl);
            }
            catch (error) {
                console.error('Error generating image:', error);
            }
        }
    });
    const handleNextRound = () => {
        if (round < totalRounds) {
            setRound((prev) => prev + 1);
            loadNewPrompt(category);
        }
        else {
            handleEndGame();
        }
    };
    const handleEndGame = () => __awaiter(this, void 0, void 0, function* () {
        if (category) {
            yield (0, leaderboard_1.addToLeaderboard)(playerName, totalScore); // Use dynamic player name
            setCategory(null); // Reset game
        }
    });
    return (react_1.default.createElement("div", { className: "min-h-screen bg-gradient-to-br from-purple-900 to-black text-white" }, !category ? (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Enter Player Name"),
        react_1.default.createElement("input", { type: "text", placeholder: "Enter your name", value: playerName, onChange: (e) => setPlayerName(e.target.value) }),
        react_1.default.createElement("h1", null, "Select a Category"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null,
                "Number of Rounds:",
                react_1.default.createElement("select", { onChange: (e) => setTotalRounds(parseInt(e.target.value, 10)), value: totalRounds },
                    react_1.default.createElement("option", { value: 3 }, "3"),
                    react_1.default.createElement("option", { value: 5 }, "5"),
                    react_1.default.createElement("option", { value: 7 }, "7")))),
        Object.keys(prompts_1.categories).map((cat) => (react_1.default.createElement("button", { key: cat, onClick: () => handleCategorySelect(cat) }, cat))))) : (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, category),
        react_1.default.createElement("p", null,
            "Round ",
            round,
            " of ",
            totalRounds),
        react_1.default.createElement("p", null,
            "Total Score: ",
            totalScore),
        image && react_1.default.createElement("img", { src: image, alt: currentPrompt !== null && currentPrompt !== void 0 ? currentPrompt : 'Prompt Destroyers image' }),
        react_1.default.createElement("p", null,
            "Time remaining: ",
            timer,
            " seconds"),
        react_1.default.createElement("p", null, "Write the prompt for the image shown above:"),
        react_1.default.createElement("input", { type: "text", placeholder: "Enter your prompt", value: userInput, onChange: (e) => setUserInput(e.target.value), disabled: isTimeUp }),
        react_1.default.createElement("button", { onClick: handleSubmit, disabled: isTimeUp }, "Submit"),
        score !== null && (react_1.default.createElement("div", null,
            react_1.default.createElement("p", null,
                "Your accuracy score: ",
                score,
                "%"),
            react_1.default.createElement("button", { onClick: handleNextRound }, "Next Round"))),
        isTimeUp && react_1.default.createElement("p", null, "Time's up! You scored 0 for this round.")))));
}

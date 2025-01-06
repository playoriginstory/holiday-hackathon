import React, { useState, useEffect } from 'react';
import { categories } from '../game/prompts';
import { calculateAccuracy } from '../utils/scoring';
import { addToLeaderboard } from '../utils/leaderboard';

export default function Game() {
  const [playerName, setPlayerName] = useState<string>('Player Name');
  const [category, setCategory] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(30);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);
  const [totalRounds, setTotalRounds] = useState<number>(3); // Default to 3 rounds
  const [totalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | undefined;
    if (timer > 0 && currentPrompt) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimeUp(true);
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [timer, currentPrompt]);

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setRound(1);
    setTotalScore(0);
    loadNewPrompt(selectedCategory);
  };

  const loadNewPrompt = (selectedCategory: string) => {
    const prompts = categories[selectedCategory];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt.prompt);
    setImage(randomPrompt.image);
    setTimer(30);
    setIsTimeUp(false);
    setScore(null);
    setUserInput('');
  };

  const handleSubmit = () => {
    if (currentPrompt && !isTimeUp) {
      const accuracy = calculateAccuracy(currentPrompt, userInput);
      setScore(accuracy);
      setTotalScore((prev) => prev + accuracy);
    }
  };

  const handleNextRound = () => {
    if (round < totalRounds) {
      setRound((prev) => prev + 1);
      loadNewPrompt(category!);
    } else {
      handleEndGame();
    }
  };

  const handleEndGame = async () => {
    if (category) {
      await addToLeaderboard(playerName, totalScore); // Use dynamic player name
      setCategory(null); // Reset game
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      {!category ? (
        <div>
          <h1>Enter Player Name</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <h1>Select a Category</h1>
          <div>
            <label>
              Number of Rounds:
              <select onChange={(e) => setTotalRounds(parseInt(e.target.value, 10))} value={totalRounds}>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
              </select>
            </label>
          </div>
          {Object.keys(categories).map((cat) => (
            <button key={cat} onClick={() => handleCategorySelect(cat)}>
              {cat}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h1>{category}</h1>
          <p>Round {round} of {totalRounds}</p>
          <p>Total Score: {totalScore}</p>
          {image && <img src={`/assets/images/${image}`} alt={currentPrompt ?? 'Prompt Destroyers image'} />}
          <p>Time remaining: {timer} seconds</p>
          <p>Write the prompt for the image shown above:</p>
          <input
            type="text"
            placeholder="Enter your prompt"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isTimeUp}
          />
          <button onClick={handleSubmit} disabled={isTimeUp}>Submit</button>
          {score !== null && (
            <div>
              <p>Your accuracy score: {score}%</p>
              <button onClick={handleNextRound}>Next Round</button>
            </div>
          )}
          {isTimeUp && <p>Time's up! You scored 0 for this round.</p>}
        </div>
      )}
    </div>
  );
}

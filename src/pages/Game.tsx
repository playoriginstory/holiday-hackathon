import React, { useState } from 'react';
import { categories } from '../game/prompts';
import { calculateAccuracy } from '../utils/scoring';

export default function Game() {
  const [category, setCategory] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    const prompts = categories[selectedCategory];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt.prompt);
    setImage(randomPrompt.image);
  };

  const handleSubmit = () => {
    if (currentPrompt) {
      const accuracy = calculateAccuracy(currentPrompt, userInput);
      setScore(accuracy);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      {!category ? (
        <div>
          <h1>Select a Category</h1>
          {Object.keys(categories).map((cat) => (
            <button key={cat} onClick={() => handleCategorySelect(cat)}>
              {cat}
            </button>
          ))}
        </div>
      ) : (
        <div>
        <h1>{category}</h1>
        {image && <img src={`/assets/images/${image}`} alt={currentPrompt ?? 'Prompt Destroyers image'} />}
        <p>Write the prompt for the image shown above:</p>
        <input
          type="text"
          placeholder="Enter your prompt"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        {score !== null && <p>Your accuracy score: {score}%</p>}
      </div>
      )}
    </div>
  );
}

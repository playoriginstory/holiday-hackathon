export const calculateAccuracy = (correctPrompt: string, userPrompt: string): number => {
    const normalize = (text: string) =>
      text.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
    const correctWords = normalize(correctPrompt).split(" ");
    const userWords = normalize(userPrompt).split(" ");
  
    const totalWords = correctWords.length;
    const matchedWords = correctWords.filter((word) => userWords.includes(word));
  
    return Math.round((matchedWords.length / totalWords) * 100);
  };
  
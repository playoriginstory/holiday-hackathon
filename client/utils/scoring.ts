import axios from 'axios';

// Function to calculate accuracy based on exact word matches
export const calculateAccuracy = (correctPrompt: string, userPrompt: string): number => {
  const normalize = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
  
  const correctWords = normalize(correctPrompt).split(" ");
  const userWords = normalize(userPrompt).split(" ");
  
  const totalWords = correctWords.length;
  const matchedWords = correctWords.filter((word) => userWords.includes(word));
  
  return Math.round((matchedWords.length / totalWords) * 100);
};

// Function to calculate accuracy based on semantic similarity using OpenAI API
export const calculateSemanticAccuracy = async (
  correctPrompt: string,
  userPrompt: string
): Promise<number> => {
  const apiUrl = 'https://api.openai.com/v1/completions';

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: 'text-davinci-003',
        prompt: `Compare the following sentences for semantic similarity:\n1. ${correctPrompt}\n2. ${userPrompt}\nProvide a similarity score between 0 and 1.`,
        max_tokens: 10,
        temperature: 0,
      },
      {
        headers: {
          // remove API_KEY default string for deployment 
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY || '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'}`,
        },
      }
    );

    const similarityScore = parseFloat(response.data.choices[0].text.trim());
    return Math.round(similarityScore * 100); // Convert to percentage
  } catch (error) {
    console.error('Error in semantic scoring:', error);
    return 0; // Fallback score in case of error
  }
};

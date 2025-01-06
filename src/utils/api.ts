export const fetchPromptsByCategory = async (category: string) => {
    const mockData = {
      HistoricalFigures: [
        { prompt: "Albert Einstein giving a lecture", image: "einstein.jpg" },
        { prompt: "Napoleon Bonaparte at a battlefield", image: "napoleon.jpg" },
      ],
      Science: [
        { prompt: "A futuristic robot in a lab", image: "robot.jpg" },
        { prompt: "A DNA double helix in space", image: "dna.jpg" },
      ],
      Memes: [
        { prompt: "A cat wearing a top hat", image: "cat_hat.jpg" },
        { prompt: "A dog driving a car", image: "dog_car.jpg" },
      ],
    };
  
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData[category]), 500); // Simulate network delay
    });
  };
  
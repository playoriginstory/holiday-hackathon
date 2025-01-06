interface LeaderboardEntry {
    name: string;
    score: number;
  }
  
  let leaderboard: LeaderboardEntry[] = [];
  
  export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(leaderboard), 500); // Simulate network delay
    });
  };
  
  export const addToLeaderboard = async (name: string, score: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        leaderboard.push({ name, score });
        leaderboard.sort((a, b) => b.score - a.score); // Sort by score (highest first)
        resolve();
      }, 500);
    });
  };
  
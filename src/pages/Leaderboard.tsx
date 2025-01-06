import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../utils/leaderboard';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      <h1 className="text-3xl text-center my-4">Leaderboard</h1>
      <div className="container mx-auto">
        {leaderboard.length > 0 ? (
          <table className="table-auto w-full text-center text-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{entry.name}</td>
                  <td className="border px-4 py-2">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No scores yet! Be the first to play!</p>
        )}
      </div>
    </div>
  );
}

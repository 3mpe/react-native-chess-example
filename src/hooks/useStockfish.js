import { useState } from 'react';

export const useStockfish = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getBestMove = async (fen, depth = 10) => {
    setIsLoading(true);
    try {
      // Ücretsiz Stockfish API'si
      const response = await fetch(
        `https://stockfish.online/api/s/v2.php?fen=${fen}&depth=${depth}`
      );
      const data = await response.json();
      
      if (data && data.bestmove) {
        const move = data.bestmove.split(' ')[1]; // "bestmove e2e4 ponder..." -> "e2e4"
        return move;
      }
    } catch (error) {
      console.error("Stockfish Error:", error);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  return { getBestMove, isLoading };
};
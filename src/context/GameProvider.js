import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
} from 'react';
import { Chess } from 'chess.js';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const gameRef = useRef(new Chess());

  const [fen, setFen] = useState(gameRef.current.fen());

  const [board, setBoard] = useState(gameRef.current.board());

  const makeMove = (from, to) => {
    const game = gameRef.current;

    try {
      const moveResult = game.move({
        from,
        to,
        promotion: 'q',
      });

      if (moveResult) {
        setFen(game.fen());
        setBoard(game.board());
        return true;
      }
    } catch (e) {
      console.log('Geçersiz hamle:', e);
      return false;
    }

    return false;
  };

  const undoMove = () => {
    const game = gameRef.current;

    const undoResult = game.undo();

    if (undoResult) {
      setFen(game.fen());
      setBoard(game.board());
    }
  };

  /**
   * Oyunu sıfırlar ve state'i günceller
   */
  const resetGame = () => {
    const game = gameRef.current;

    game.reset();

    setFen(game.fen());
    setBoard(game.board());
  };

  const contextValue = useMemo(() => {
    const game = gameRef.current;

    return {
      fen,
      board,
      makeMove,
      resetGame,
      undoMove,
      turn: game.turn(),
      isCheckmate: game.isCheckmate(),
      isDraw: game.isDraw(),
      isGameOver: game.isGameOver(),
    };
  }, [fen, board]);

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame, GameProvider içinde kullanılmalıdır.');
  }
  return context;
};

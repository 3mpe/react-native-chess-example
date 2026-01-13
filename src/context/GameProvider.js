import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { Chess } from 'chess.js';
import { useStockfish } from '../hooks/useStockfish';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const gameRef = useRef(new Chess());
  const { getBestMove, isLoading: isAiThinking } = useStockfish();

  const [fen, setFen] = useState(gameRef.current.fen());
  const [board, setBoard] = useState(gameRef.current.board());
  const [depth, setDepth] = useState(10); // AI Zorluk Seviyesi
  const [userColor, setUserColor] = useState('w'); // 'w' veya 'b'
  const [isGameStarted, setIsGameStarted] = useState(false);

  
  /**
   * AI'nin hamle yapması için fen değiştiğinde kontrol et
   */
  useEffect(() => {
    const game = gameRef.current;

    // Eğer sıra KULLANICIDA DEĞİLSE ve oyun bitmediyse -> AI OYNAR
    if (game.turn() !== userColor && !game.isGameOver()) {
      playAi();
    }
  }, [fen, userColor]);


  /**
   * Takım renklerini değiştirir
   */
  const switchSides = () => {
    const newColor = userColor === 'w' ? 'b' : 'w';
    setUserColor(newColor);
  };

  /**
   * Belirtilen hamleyi yapar ve state'i günceller
   */
  const makeMove = (from, to) => {
    const game = gameRef.current;

    // Oyuncunun sırası değilse hamle yapma
    if (game.turn() !== userColor) return false;

    try {
      const moveResult = game.move({
        from,
        to,
        promotion: 'q', // Varsayılan olarak vezir terfisi
      });

      if (moveResult) {
        setFen(game.fen());
        setBoard(game.board());

        // İlk hamle yapıldığında oyunu başlat
        if (!isGameStarted) setIsGameStarted(true);

        return true;
      }
    } catch (e) {
      console.log('Geçersiz hamle:', e);
      return false;
    }

    return false;
  };

  /**
   * Son hamleyi geri alır ve state'i günceller
   */
  const undoMove = () => {
    const game = gameRef.current;

    // 1. Önce son yapılan hamleyi geri al (Genelde bu AI'nın hamlesidir)
    const result = game.undo();

    // 2. Eğer başarılı bir geri alma yaptıysak VE sıra şu an kullanıcıda değilse
    // (Yani sadece AI hamlesini geri aldık, sıra AI'ya geçtiyse)
    // Bir adım daha geri almalıyız ki sıra kullanıcıya gelsin ve hamlesini değiştirebilsin.
    if (result && game.turn() !== userColor) {
      game.undo();
    }

    // State'i güncelle
    setFen(game.fen());
    setBoard(game.board());
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

  /**
   * AI'nin hamle yapmasını sağlar
   */
  const playAi = async () => {
    const game = gameRef.current;

    // Oyun bittiyse hamle yapma
    if (game.isGameOver()) return;

    // Biraz bekle (İnsani gecikme)
    await new Promise(r => setTimeout(r, 500));
    
    // Stockfish'e sor (Ref üzerinden güncel FEN'i gönder)
    const bestMove = await getBestMove(game.fen(), depth); 
    
    if (bestMove) {
      const from = bestMove.substring(0, 2);
      const to = bestMove.substring(2, 4);
      
      // AI'nin hamlesini uygula
      makeMove(from, to);
    }
  };

  /**
   * Context value'yu hazırlar
   */
  const contextValue = useMemo(() => {
    const game = gameRef.current;

    return {
      fen,
      board,
      // Oyun ile ilgili fonksiyonlar ve state
      makeMove,
      resetGame,
      undoMove,
      turn: game.turn(),
      isCheckmate: game.isCheckmate(),
      isDraw: game.isDraw(),
      isGameOver: game.isGameOver(),

      // AI ile ilgili fonksiyonlar ve state
      isAiThinking,
      playAi,
      setDepth,

      // Oyuncu renk değiştirme fonksiyonu
      switchSides, // Takım renklerini değiştirme 
      userColor,   // Kullanıcının rengi
      setUserColor, // Kullanıcının rengini doğrudan atama 
    };
  }, [fen, board, isAiThinking]);

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
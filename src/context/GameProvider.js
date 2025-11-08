// src/context/GameContext.js

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
} from 'react';
// chess.js kütüphanesini import ediyoruz
import { Chess } from 'chess.js';

// 1. Context'i oluştur
const GameContext = createContext();

// 2. Provider (Sağlayıcı) bileşenini oluştur
export const GameProvider = ({ children }) => {
  // useRef kullanarak chess.js'in mutable (değişken)
  // game nesnesini saklıyoruz.
  const gameRef = useRef(new Chess());

  // React'in re-render tetiklemesini sağlamak için
  // FEN (tahta pozisyonu) string'ini state'te tutuyoruz.
  const [fen, setFen] = useState(gameRef.current.fen());

  // Tahtayı 2D array olarak state'te tutalım.
  const [board, setBoard] = useState(gameRef.current.board());

  /**
   * Hamle yapmayı deneyen ana fonksiyon
   * @param {string} from - örn: "e2"
   * @param {string} to - örn: "e4"
   * @returns {boolean} - Hamle başarılıysa true
   */
  const makeMove = (from, to) => {
    const game = gameRef.current;

    try {
      // chess.js'in move fonksiyonunu çağırıyoruz
      // Piyon en sona ulaştığında otomatik 'q' (vezir) alması için 'promotion' ekledik
      const moveResult = game.move({
        from,
        to,
        promotion: 'q',
      });

      // Eğer hamle geçerliyse (moveResult null değilse)
      if (moveResult) {
        // arayüz de güncellensin diye state'leri güncelliyoruz
        setFen(game.fen());
        setBoard(game.board());
        return true;
      }
    } catch (e) {
      // Genelde geçersiz hamle 'null' döndürür, ancak 'try-catch'
      // olası hatalara karşı ekstra bir güvencedir.
      console.log('Geçersiz hamle:', e);
      return false;
    }

    // Geçersiz hamle
    return false;
  };

  /**
   * Son hamleyi geri alır
   */
  const undoMove = () => {
    const game = gameRef.current;

    // Hamleyi geri al
    const undoResult = game.undo();

    // Eğer geri alınacak bir hamle varsa (null değilse)
    if (undoResult) {
      // React state'lerini güncelle ki arayüz değişsin
      setFen(game.fen());
      setBoard(game.board());
    }
  };

  /**
   * Oyunu sıfırlar ve state'i günceller
   */
  const resetGame = () => {
    const game = gameRef.current;

    // chess.js kütüphanesindeki oyunu sıfırla
    game.reset();

    // React state'lerini de sıfırla ki arayüz güncellensin
    setFen(game.fen());
    setBoard(game.board());
  };

  // 3. Context aracılığıyla dışarıya açacağımız değerler
  // useMemo ile gereksiz re-render'ların önüne geçiyoruz.
  const contextValue = useMemo(() => {
    const game = gameRef.current;

    return {
      fen, // Tahtanın FEN durumu (örn: "rnbqkbnr/pp...p/8/8/4P3/8/PPP...NBQKBNR w KQkq - 0 1")
      board, // Tahtanın 2D array hali
      makeMove, // Hamle yapma fonksiyonumuz
      resetGame, // Oyunu sıfırlama fonksiyonu
      undoMove, // Hamleyi geri alma fonksiyonu
      turn: game.turn(), // Sıranın kimde olduğu ('w' = beyaz, 'b' = siyah)
      isCheckmate: game.isCheckmate(), // Şah-Mat mı?
      isDraw: game.isDraw(), // Beraberlik mi?
      isGameOver: game.isGameOver(), // Oyun bitti mi?
    };
  }, [fen, board]); // Sadece fen veya board değiştiğinde bu değerleri yeniden hesapla

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

// 4. Diğer bileşenlerden kolayca kullanmak için bir custom hook
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame, GameProvider içinde kullanılmalıdır.');
  }
  return context;
};

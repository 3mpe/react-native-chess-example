import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { useGame } from '../../../context/GameProvider';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS, // JS thread'inde fonksiyon çalıştırmak için
} from 'react-native-reanimated';

// --- Sabitler ---
// BOARD_SIZE ve CELL_SIZE buradan kaldırıldı, prop olarak alınacak

const PIECE_MAP = {
  p: '♙',
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
  k: '♚',
  P: '♙',
  R: '♖',
  N: '♘',
  B: '♗',
  Q: '♕',
  K: '♔',
};

// Piksel koordinatını satranç notasyonuna çevirir (örn: 4, 4 -> "e4")
// Artık CELL_SIZE'ı parametre olarak alıyor
const toSquare = (x, y, CELL_SIZE) => {
  const col = Math.floor(x / CELL_SIZE);
  const row = Math.floor(y / CELL_SIZE);
  // Sınırların dışındaysa null dön
  if (col < 0 || col > 7 || row < 0 || row > 7) return null;

  const files = 'abcdefgh';
  const ranks = '87654321'; // Tahta dizisi 0. index'i 8. rank olarak alır
  return `${files[col]}${ranks[row]}`;
};

// Bileşenin adını 'Piece' olarak değiştirdim (sen öyle import etmişsin)
const Piece = ({ piece, rowIndex, colIndex, CELL_SIZE }) => {
  // CELL_SIZE prop'u eklendi
  // Context'ten hamle fonksiyonunu ve sırayı al
  const { makeMove, turn, isGameOver } = useGame();

  const square = piece.square; // örn: "e2"
  const isMyTurn = turn === piece.color;

  // Animasyon için paylaşımlı değerler
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const zIndex = useSharedValue(1);

  // Hamle yapmayı deneyen ve JS thread'inde çalışan fonksiyon
  const handleMove = (from, to) => {
    const moveSuccess = makeMove(from, to);
    if (!moveSuccess) {
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
      zIndex.value = 1;
    }
  };

  // Parmak hareketlerini yöneten handler
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      if (!isMyTurn || isGameOver) return;
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      zIndex.value = 100;
    },
    onActive: (event, ctx) => {
      if (!isMyTurn || isGameOver) return;
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      if (!isMyTurn || isGameOver) return;

      const finalX = colIndex * CELL_SIZE + translateX.value;
      const finalY = rowIndex * CELL_SIZE + translateY.value;

      const targetSquare = toSquare(
        finalX + CELL_SIZE / 2,
        finalY + CELL_SIZE / 2,
        CELL_SIZE, // 'toSquare' fonksiyonuna CELL_SIZE geçirildi
      );

      if (targetSquare && targetSquare !== square) {
        runOnJS(handleMove)(square, targetSquare);
      } else {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        zIndex.value = 1;
      }
    },
  });

  // Animasyon stilini oluştur
  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: zIndex.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  // Taşın tahtadaki piksel pozisyonu
  const piecePositionStyle = {
    position: 'absolute',
    left: colIndex * CELL_SIZE,
    top: rowIndex * CELL_SIZE,
    // CELL_SIZE'a bağlı stiller dinamik hale getirildi
    width: CELL_SIZE,
    height: CELL_SIZE,
  };

  const pieceType = piece.type;
  const pieceColor = piece.color;

  return (
    <PanGestureHandler
      onGestureEvent={gestureHandler}
      enabled={isMyTurn && !isGameOver}
    >
      <Animated.View
        style={[styles.pieceContainer, piecePositionStyle, animatedStyle]}
      >
        <Text
          style={[
            styles.piece,
            { fontSize: CELL_SIZE * 0.7 }, // Font boyutu dinamik hale getirildi
            pieceColor === 'b' ? styles.blackPiece : styles.whitePiece,
          ]}
        >
          {
            PIECE_MAP[
              pieceType.toUpperCase() === pieceType
                ? pieceType
                : pieceType.toLowerCase()
            ]
          }
        </Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

// Stiller buraya taşındı ve dinamik hale getirildi
const styles = StyleSheet.create({
  pieceContainer: {
    // width ve height piecePositionStyle'a taşındı
    justifyContent: 'center',
    alignItems: 'center',
  },
  piece: {
    // fontSize animated style'a taşındı
  },
  whitePiece: {
    color: '#FFFFFF',
  },
  blackPiece: {
    color: '#000000',
  },
});

export default Piece;

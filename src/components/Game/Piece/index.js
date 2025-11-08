import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { useGame } from '../../../context/GameProvider';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

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

const toSquare = (x, y, CELL_SIZE) => {
  'worklet';
  const col = Math.floor(x / CELL_SIZE);
  const row = Math.floor(y / CELL_SIZE);
  if (col < 0 || col > 7 || row < 0 || row > 7) return null;

  const files = 'abcdefgh';
  const ranks = '87654321';
  return `${files[col]}${ranks[row]}`;
};

const Piece = ({ piece, rowIndex, colIndex, CELL_SIZE }) => {
  const { makeMove, turn, isGameOver } = useGame();

  const square = piece.square;
  const isMyTurn = turn === piece.color;

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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: zIndex.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const piecePositionStyle = {
    position: 'absolute',
    left: colIndex * CELL_SIZE,
    top: rowIndex * CELL_SIZE,
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
            { fontSize: CELL_SIZE * 0.7 },
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

const styles = StyleSheet.create({
  pieceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  piece: {},
  whitePiece: {
    color: '#FFFFFF',
  },
  blackPiece: {
    color: '#000000',
  },
});

export default Piece;

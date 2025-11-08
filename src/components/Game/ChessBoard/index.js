import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Piece } from './../../';
import { useGame } from '../../../context/GameProvider';

const { width } = Dimensions.get('window');
const BOARD_SIZE = width * 0.999;
const CELL_SIZE = BOARD_SIZE / 8;

const ChessBoard = () => {
  const { board } = useGame();

  const renderBackground = () => {
    return board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((_, colIndex) => {
          const isLightSquare = (rowIndex + colIndex) % 2 === 0;
          const squareColor = isLightSquare
            ? styles.lightSquare
            : styles.darkSquare;
          return <View key={colIndex} style={[styles.cell, squareColor]} />;
        })}
      </View>
    ));
  };

  const renderPieces = () => {
    return board.flatMap((row, rowIndex) =>
      row.map((square, colIndex) => {
        if (square) {
          return (
            <Piece
              key={`${rowIndex}-${colIndex}`}
              piece={square}
              rowIndex={rowIndex}
              colIndex={colIndex}
              CELL_SIZE={CELL_SIZE}
            />
          );
        }
        return null;
      }),
    );
  };

  return (
    <View style={styles.boardContainer}>
      <View style={styles.backgroundContainer}>{renderBackground()}</View>
      <View style={styles.piecesContainer}>{renderPieces()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
  backgroundContainer: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  lightSquare: {
    backgroundColor: '#F0D9B5', // Açık
  },
  darkSquare: {
    backgroundColor: '#B58863', // Koyu
  },
  piecesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ChessBoard;

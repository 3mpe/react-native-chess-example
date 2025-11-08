import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native'; // 'View' buraya eklendi
import { Piece } from './../../'; // 'Piece' import edildi (DraggablePiece yerine)
import { useGame } from '../../../context/GameProvider';

// Ekran genişliğini alarak tahta boyutunu ona göre ayarlayalım
const { width } = Dimensions.get('window');
const BOARD_SIZE = width * 0.999; // Ekran genişliğinin %99'u
const CELL_SIZE = BOARD_SIZE / 8; // Her bir karenin boyutu

const ChessBoard = () => {
  const { board } = useGame();

  // 1. Arka Planı (Kareleri) Çiz
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

  // 2. Taşları Çiz
  const renderPieces = () => {
    return board.flatMap(
      (
        row,
        rowIndex, // flatMap ile diziyi düzleştir
      ) =>
        row.map((square, colIndex) => {
          // Eğer karede taş varsa (null değilse)
          if (square) {
            return (
              <Piece
                key={`${rowIndex}-${colIndex}`}
                piece={square}
                rowIndex={rowIndex}
                colIndex={colIndex}
                CELL_SIZE={CELL_SIZE} // CELL_SIZE prop olarak geçirildi
              />
            );
          }
          return null; // Boş kare için null dön
        }),
    );
  };

  return (
    <View style={styles.boardContainer}>
      {/* Arka plan kareleri */}
      <View style={styles.backgroundContainer}>{renderBackground()}</View>

      {/* Taşlar (arka planın üstünde, position: 'absolute' ile) */}
      <View style={styles.piecesContainer}>{renderPieces()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
  // Arka plan (sabit kareler)
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

  // Taşlar (sürüklenebilir alan)
  piecesContainer: {
    ...StyleSheet.absoluteFillObject, // Arka planla aynı boyutta ve üstünde
  },
  // Gereksiz stiller buradan kaldırıldı
});

export default ChessBoard;

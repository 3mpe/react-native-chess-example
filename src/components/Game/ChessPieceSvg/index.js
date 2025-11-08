import React from 'react';
import Svg, { Path } from 'react-native-svg';

// Standart "cburnett" satranç seti SVG path verileri
// Her bir path, 45x45'lik bir Svg viewbox'ına göre ayarlanmıştır.
const PIECE_PATHS = {
  p: 'M22.5,9C19.5,9 17,11.5 17,14.5C17,17.5 19.5,20 22.5,20C25.5,20 28,17.5 28,14.5C28,11.5 25.5,9 22.5,9z M22.5,22C18.5,22 15,25.5 15,29.5L15,31L30,31L30,29.5C30,25.5 26.5,22 22.5,22z M20,32L20,36L25,36L25,32L20,32z', // Piyon
  r: 'M9,39L36,39L36,36L9,36L9,39z M12,36L12,32L15,32L15,36L12,36z M19.5,36L19.5,32L22.5,32L22.5,36L19.5,36z M27,36L27,32L30,32L30,36L27,36z M33,36L33,32L36,32L36,36L33,36z M9,31L36,31L36,10L9,10L9,31z M12,28L12,13L15,13L15,28L12,28z M30,28L30,13L33,13L33,28L30,28z M9,9L12,9L12,6L15,6L15,9L19.5,9L19.5,6L22.5,6L22.5,9L27,9L27,6L30,6L30,9L33,9L33,6L36,6L36,9L9,9z', // Kale
  n: 'M22,10C19.5,10 17,12.5 17,15C17,17.5 19.5,20 22,20C24.5,20 27,17.5 27,15C27,12.5 24.5,10 22,10z M31.5,14.5C31.5,14.5 31.5,18 31.5,18C31.5,24 28.5,27 28.5,27L28.5,30L31.5,30L31.5,34.5L28,34.5L28,39.5L17,39.5L17,34.5L13.5,34.5L13.5,30L16.5,30L16.5,27C16.5,27 13.5,24 13.5,18C13.5,18 13.5,14.5 13.5,14.5C13.5,11.5 14,8.5 17.5,7.5C17.5,7.5 18.5,8 20.5,8C20.5,8 21.5,6 23.5,6C23.5,6 28,6 31.5,14.5z', // At
  b: 'M22.5 9 C 19.5 9 17 11.5 17 14.5 C 17 17.5 19.5 20 22.5 20 C 25.5 20 28 17.5 28 14.5 C 28 11.5 25.5 9 22.5 9 Z M 15 22 L 15 31 L 30 31 L 30 22 L 28 22 L 27 24 L 25.5 25.5 L 22.5 28 L 19.5 25.5 L 18 24 L 17 22 L 15 22 Z M 20 32 L 20 36 L 25 36 L 25 32 L 20 32 Z', // Fil
  q: 'M12 9 L 14 12 L 17 11 L 18.5 14 L 21.5 12 L 23.5 14 L 26.5 11 L 28 12 L 30 9 L 12 9 Z M 15 14.5 L 15 18 L 30 18 L 30 14.5 L 28 14.5 L 27 16 L 25.5 17.5 L 22.5 20 L 19.5 17.5 L 18 16 L 17 14.5 L 15 14.5 Z M 15 19 L 15 31 L 30 31 L 30 19 L 27.5 19 L 27.5 21 L 25 21 L 25 19 L 22.5 19 L 22.5 21 L 20 21 L 20 19 L 17.5 19 L 17.5 21 L 15 21 L 15 19 Z M 15 32 L 15 36 L 30 36 L 30 32 L 15 32 Z', // Vezir
  k: 'M22.5 9 L 22.5 6 L 20 6 L 20 9 L 17 9 L 17 11 L 20 11 L 20 14 L 17 14 L 17 16 L 20 16 L 20 31 L 25 31 L 25 16 L 28 16 L 28 14 L 25 14 L 25 11 L 28 11 L 28 9 L 25 9 L 25 6 L 22.5 6 Z M 15 32 L 15 36 L 30 36 L 30 32 L 15 32 Z', // Şah
};

/**
 * @param {object} props
 * @param {'p'|'r'|'n'|'b'|'q'|'k'} props.type - Taşın tipi (her zaman küçük harf)
 * @param {'w'|'b'} props.color - Taşın rengi
 * @param {number} props.size - Karenin boyutu (CELL_SIZE)
 */
const ChessPieceSvg = ({ type, color, size }) => {
  const piecePath = PIECE_PATHS[type];

  // Beyaz taşlar için: Beyaz dolgu, Siyah dış çizgi
  // Siyah taşlar için: Siyah dolgu, Beyaz dış çizgi
  // (Bu, koyu karelerde daha iyi görünürlük sağlar)
  const pieceColor = color === 'w' ? '#FFFFFF' : '#000000';
  const strokeColor = color === 'w' ? '#000000' : '#FFFFFF';

  if (!piecePath) {
    return null; // Bilinmeyen taş tipi
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <Path
        d={piecePath}
        fill={pieceColor}
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ChessPieceSvg;

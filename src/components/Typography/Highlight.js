import React from 'react';
import Typography from '.';
import colors from '../../utils/colors';

// Bu yardımcı fonksiyon, arama metnindeki özel regex karakterlerini etkisiz hale getirir.
// Örneğin "C++" gibi bir arama yapıldığında regex'in bozulmasını engeller.
const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const Highlight = ({
  text = '',
  htmlContent = null, // Yeni prop: htmlContent
  highlight = '',
  highlightColor = colors.secondary6,
  color = colors.default10,
  semibold = true,
  ...rest
}) => {
  // Eğer highlight metni boşsa veya yoksa, hiçbir işlem yapma, direkt bas.
  if (!highlight || highlight.trim() === '') {
    if (htmlContent) {
      return <Typography {...rest} htmlContent={htmlContent} />;
    }
    return (
      <Typography {...rest} color={color}>
        {text}
      </Typography>
    );
  }

  // 1. Eğer htmlContent prop'u verildiyse HTML içinde arama yap
  if (htmlContent) {
    const escapedHighlight = escapeRegExp(highlight);
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');

    // fontWeight stilini semibold prop'una göre ayarla
    const fontWeight = semibold ? '600' : 'normal';

    const highlightedHtml = htmlContent.replace(
      regex,
      // Eşleşen metni ($&) al ve etrafını stil verilmiş bir span ile sar.
      `<span style="color: ${highlightColor}; font-weight: ${fontWeight};">$1</span>`,
    );

    return <Typography {...rest} htmlContent={highlightedHtml} />;
  }

  // 2. Eğer htmlContent yoksa, eski düz metin (text) mantığıyla devam et
  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
  const parts = text.split(regex);

  return (
    <Typography variant="s4" color={color} {...rest}>
      {parts.map((part, i) =>
        // part'ın aranan kelimeyle (case-insensitive) eşleşip eşleşmediğini kontrol et
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Typography
            key={i}
            semibold={semibold}
            wrapView={false}
            {...rest}
            color={highlightColor}>
            {part}
          </Typography>
        ) : (
          part
        ),
      )}
    </Typography>
  );
};

export default Highlight;

import React, { lazy, Suspense } from 'react';
import { Text } from 'react-native';
import colors from '../../utils/colors';

// Bu yardımcı fonksiyon, arama metnindeki özel regex karakterlerini etkisiz hale getirir.
// Örneğin "C++" gibi bir arama yapıldığında regex'in bozulmasını engeller.
const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Typography bileşenini döngüye neden olmadan, ihtiyaç anında yüklemek için `lazy` kullanıyoruz.
const Typography = lazy(() => import('.'));

const Highlight = React.forwardRef(
  (
    {
      text = '',
      htmlContent = null, // Yeni prop: htmlContent
      highlight = '',
      highlightColor = colors.secondary6,
      color = colors.default10,
      semibold = true,
      ...rest
    },
    ref,
  ) => {
    // Eğer highlight metni boşsa veya yoksa, hiçbir işlem yapma, direkt bas.
    if (!highlight || highlight.trim() === '') {
      if (htmlContent) {
        return (
          <Suspense fallback={<Text />}>
            <Typography {...rest} htmlContent={htmlContent} ref={ref} />
          </Suspense>
        );
      }
      return (
        <Suspense fallback={<Text />}>
          <Typography {...rest} color={color} ref={ref}>
            {text}
          </Typography>
        </Suspense>
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

      return (
        <Suspense fallback={<Text />}>
          <Typography {...rest} htmlContent={highlightedHtml} ref={ref} />
        </Suspense>
      );
    }

    // 2. Eğer htmlContent yoksa, eski düz metin (text) mantığıyla devam et
    const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
    const parts = text.split(regex);

    return (
      <Suspense fallback={<Text />}>
        <Typography variant="s4" color={color} {...rest} ref={ref}>
          {parts.map((part, i) =>
            // part'ın aranan kelimeyle (case-insensitive) eşleşip eşleşmediğini kontrol et
            part.toLowerCase() === highlight.toLowerCase() ? (
              <Typography
                key={i}
                semibold={semibold}
                wrapView={false}
                {...rest}
                color={highlightColor}
              >
                {part}
              </Typography>
            ) : (
              part
            ),
          )}
        </Typography>
      </Suspense>
    );
  },
);

export default Highlight;

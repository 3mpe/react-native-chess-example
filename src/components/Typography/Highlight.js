import React, { lazy, Suspense } from 'react';
import { Text } from 'react-native';
import colors from '../../utils/colors';

const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

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

    if (htmlContent) {
      const escapedHighlight = escapeRegExp(highlight);
      const regex = new RegExp(`(${escapedHighlight})`, 'gi');

      const fontWeight = semibold ? '600' : 'normal';

      const highlightedHtml = htmlContent.replace(
        regex,
        `<span style="color: ${highlightColor}; font-weight: ${fontWeight};">$1</span>`,
      );

      return (
        <Suspense fallback={<Text />}>
          <Typography {...rest} htmlContent={highlightedHtml} ref={ref} />
        </Suspense>
      );
    }

    const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
    const parts = text.split(regex);

    return (
      <Suspense fallback={<Text />}>
        <Typography variant="s4" color={color} {...rest} ref={ref}>
          {parts.map((part, i) =>
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

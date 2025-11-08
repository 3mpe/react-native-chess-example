/* eslint-disable react-native/no-inline-styles */
import PropTypes from 'prop-types';
import React from 'react';
import {Text, useWindowDimensions} from 'react-native';
import RenderHTML from 'react-native-render-html';
import Content from './Content';
import styles from './styled';
import fontFamily from '../../utils/fontAssets';
import tokens from '../../utils/themeToken';
import View from '../View';
import HeaderTitle from './HeaderTitle';
import Highlight from './Highlight';

/**
 * @param {import('react-native').TextProps & {
 *  ifCond?: boolean,
 *  flex?: boolean | number,
 *  center?: boolean,
 *  alignCenter?: boolean,
 *  between?: boolean,
 *  around?: boolean,
 *  evenly?: boolean,
 *  start?: boolean,
 *  end?: boolean,
 *  stretch?: boolean,
 *  baseline?: boolean,
 *  row?: boolean,
 *  column?: boolean,
 *  wrap?: boolean,
 *  padding?: number | string,
 *  paddingTop?: number | string,
 *  paddingBottom?: number | string,
 *  paddingLeft?: number | string,
 *  paddingRight?: number | string,
 *  margin?: number | string,
 *  marginTop?: number | string,
 *  marginBottom?: number | string,
 *  marginLeft?: number | string,
 *  marginRight?: number | string,
 *  width?: number | string,
 *  height?: number | string,
 *  borderRadius?: number,
 *  bgColor?: string,
 *  textRight?: boolean,
 *  textLeft?: boolean,
 *  textCenter?: boolean,
 *  bold?: boolean,
 *  semibold?: boolean,
 *  regular?: boolean,
 *  align?: 'left' | 'center' | 'right' | 'justify',
 *  color?: string,
 *  variant: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6'|'s1'|'s2'|'s3'|'s4'|'p1'|'p2'|'p3'|'p4'|'p5',
 *  paragraph?: boolean,
 *  wrapView?: boolean,
 *  truncate?: boolean,
 *  htmlContent?: string,
 *  children?: React.ReactNode,
 *  font?: keyof typeof fontFamily
 * }} props
 */
const Typography = ({
  flex,
  center,
  alignCenter,
  between,
  around,
  evenly,
  start,
  end,
  stretch,
  baseline,
  row,
  column,
  wrap,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  width,
  height,
  borderRadius,
  bgColor,
  textRight,
  textLeft,
  textCenter,
  bold,
  semibold,
  regular,
  align,
  color,
  variant,
  style,
  children,
  paragraph = false,
  wrapView = true,
  truncate = false,
  ifCond = false,
  htmlContent = null,
  font = null,
  opacity = 1,
  ...props
}) => {
  const styled = styles();
  const {width: windowWidth} = useWindowDimensions();

  // 1. Font ağırlığını ve ailesini belirle
  const baseFont = font ? fontFamily[font] : fontFamily.Ubuntu;
  const fontStyle = {};
  if (bold) {
    fontStyle.fontFamily = fontFamily.Ubuntu_Bold;
  } else if (semibold) {
    fontStyle.fontFamily = fontFamily.Ubuntu_Medium;
    fontStyle.fontWeight = '600';
  } else if (font) {
    fontStyle.fontFamily = fontFamily[font];
  } else {
    fontStyle.fontFamily = baseFont;
  }

  // 2. Text için temel stil objesi
  const baseText = {
    ...fontStyle,
    textAlign:
      align ||
      (textRight
        ? 'right'
        : textLeft
        ? 'left'
        : textCenter
        ? 'center'
        : undefined),
  };

  if (color) {
    baseText.color = tokens.colors[color] || color;
  }

  // 3. truncate prop'una göre Text component'ine eklenecek proplar
  const textProps = {
    ...props,
  };

  if (truncate) {
    textProps.numberOfLines = 1;
    textProps.ellipsizeMode = 'tail';
  }

  // View (dış kapsayıcı) için kullanılacak proplar
  const containerProps = {
    flex,
    center,
    alignCenter,
    between,
    around,
    evenly,
    start,
    end,
    stretch,
    baseline,
    row,
    column,
    wrap,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    width,
    height,
    borderRadius,
    bgColor,
    ifCond,
  };

  // Paragraf mantığı (children tek bir eleman olsa bile array'e çevirerek map kullanımı için)
  const paragraphs =
    paragraph && typeof children === 'string'
      ? children.split('\n\n')
      : [children];

  // Text component'lerini render eden fonksiyon
  const renderText = () => {
    return paragraphs.map((p, index) => (
      <Text
        key={index}
        style={[
          styled[variant],
          baseText,
          style,
          paragraph && index < paragraphs.length - 1 && {marginBottom: 8},
          opacity !== 1 && {opacity},
        ]}
        {...textProps}>
        {p}
      </Text>
    ));
  };

  // wrapView false ise, Text'i doğrudan döndür
  if (!wrapView) {
    return renderText();
  }

  // HTML içeriği varsa Content component döndür
  if (htmlContent) {
    // Tüm metinler için uygulanacak olan temel stil objesi
    const baseStyle = {
      fontFamily: 'Ubuntu',
      fontSize: 14,
      padding: 0,
      margin: 0,
    };
    const html = `
      <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap" rel="stylesheet">

            <style>
                * {
                    font-family: 'Ubuntu', 'Helvetica Neue', Helvetica, sans-serif; 
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            ${htmlContent}
        </body>
        </html>
    `;
    return (
      <View style={{flex: 1}} {...containerProps}>
        <RenderHTML
          contentWidth={width || windowWidth}
          source={{html}}
          {...textProps}
          baseStyle={baseStyle}
          defaultTextProps={{
            allowFontScaling: false,
          }}
        />
      </View>
    );
  }
  // <Content htmlContent={htmlContent} {...props} />;

  // Children yoksa veya tanımsızsa null döndür
  if (children === null || children === undefined) return null;

  // Artık truncate olsa da olmasa da aynı yapı dönüyor.
  return <View {...containerProps}>{renderText()}</View>;
};

Typography.propTypes = {
  wrapView: PropTypes.bool,
  flex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  wrap: PropTypes.bool,
  center: PropTypes.bool,
  alignCenter: PropTypes.bool,
  row: PropTypes.bool,
  column: PropTypes.bool,
  between: PropTypes.bool,
  around: PropTypes.bool,
  evenly: PropTypes.bool,
  start: PropTypes.bool,
  end: PropTypes.bool,
  stretch: PropTypes.bool,
  baseline: PropTypes.bool,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderRadius: PropTypes.number,
  bgColor: PropTypes.string,
  textCenter: PropTypes.bool,
  textLeft: PropTypes.bool,
  textRight: PropTypes.bool,
  color: PropTypes.string,
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    's1',
    's2',
    's3',
    's4',
    'p1',
    'p2',
    'p3',
    'p4',
    'p5',
  ]).isRequired,
  style: PropTypes.object,
  children: PropTypes.node,
  bold: PropTypes.bool,
  semibold: PropTypes.bool,
  regular: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  paragraph: PropTypes.bool,
  truncate: PropTypes.bool,
  htmlContent: PropTypes.string,
  font: PropTypes.oneOf(Object.keys(fontFamily)),
  opacity: PropTypes.number,
  ifCond: PropTypes.bool,
};

Typography.HeaderTitle = HeaderTitle;
Typography.Highlight = Highlight;
export default Typography;

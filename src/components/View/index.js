import PropTypes from 'prop-types';
import React from 'react';
import { View as RNView } from 'react-native';
import { s } from './../../utils';
import styled from './styled';
import tokens from '../../utils/themeToken';
import Loading from '../Loading';

const View = ({
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
  style,
  children,
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
  minWidth,
  minHeight,
  borderStartStartRadius,
  borderStartEndRadius,
  borderEndStartRadius,
  borderEndEndRadius,
  borderRadius,
  borderWidth,
  borderColor,
  borderStyle,
  bgColor,
  position,
  relative,
  absolute,
  left,
  right,
  top,
  bottom,
  overflow,
  opacity,

  useShadow,
  ifCond = false,
  loading = false,
  loadingHeight = 300,
  ...props
}) => {
  const styles = styled();
  const baseStyle = {
    flex: flex ? 1 : undefined,
    justifyContent: center
      ? 'center'
      : between
      ? 'space-between'
      : around
      ? 'space-around'
      : evenly
      ? 'space-evenly'
      : start
      ? 'flex-start'
      : end
      ? 'flex-end'
      : undefined,
    alignItems: alignCenter
      ? 'center'
      : start
      ? 'flex-start'
      : end
      ? 'flex-end'
      : stretch
      ? 'stretch'
      : baseline
      ? 'baseline'
      : undefined,
    flexWrap: wrap ? 'wrap' : undefined,
    flexDirection: row ? 'row' : column ? 'column' : undefined,
    padding: padding ? s(padding) : undefined,
    paddingTop: paddingTop ? s(paddingTop) : undefined,
    paddingBottom: paddingBottom ? s(paddingBottom) : undefined,
    paddingLeft: paddingLeft ? s(paddingLeft) : undefined,
    paddingRight: paddingRight ? s(paddingRight) : undefined,
    margin: margin ? s(margin) : undefined,
    marginTop: marginTop ? s(marginTop) : undefined,
    marginBottom: marginBottom ? s(marginBottom) : undefined,
    marginLeft: marginLeft ? s(marginLeft) : undefined,
    marginRight: marginRight ? s(marginRight) : undefined,
    backgroundColor: tokens.colors[bgColor] || bgColor || undefined,
    width: typeof width === 'string' ? width : s(width) || undefined,
    height: typeof height === 'string' ? height : s(height) || undefined,
    minWidth:
      typeof minWidth === 'string' ? minWidth : s(minWidth) || undefined,
    minHeight:
      typeof minHeight === 'string' ? minHeight : s(minHeight) || undefined,
    borderWidth: borderWidth || undefined,
    borderColor: tokens.colors[borderColor] || borderColor || undefined,
    borderRadius: borderRadius || undefined,
    borderStartStartRadius: borderStartStartRadius || undefined,
    borderStartEndRadius: borderStartEndRadius || undefined,
    borderEndStartRadius: borderEndStartRadius || undefined,
    borderEndEndRadius: borderEndEndRadius || undefined,
    borderStyle: borderStyle || undefined,
    position: relative ? 'relative' : absolute ? 'absolute' : position,
    left: left ? left : undefined,
    right: right ? right : undefined,
    top: top ? top : undefined,
    bottom: bottom ? bottom : undefined,
    overflow: overflow || undefined,
    opacity: opacity || undefined,
  };

  if (ifCond) return null;

  if (useShadow) {
    baseStyle.backgroundColor = 'white';
    baseStyle.shadowColor = tokens.colors.neutral1;
    baseStyle.shadowOffset = { width: 0, height: 2 };
    baseStyle.shadowOpacity = 0.1;
    baseStyle.shadowRadius = 5;
    baseStyle.elevation = 5;
    baseStyle.borderWidth = 1;
    baseStyle.borderColor = 'transparent';
  }
  if (loading) {
    return (
      <RNView
        {...props}
        style={[
          styles.loadingStyle,
          baseStyle,
          styles.base,
          flex && styles.flex,
          center && styles.center,
          alignCenter && styles.alignCenter,
          style,
          {
            height: loadingHeight,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Loading loading size="small" color={baseStyle.backgroundColor} />
      </RNView>
    );
  }

  return (
    <RNView
      style={[
        baseStyle,
        styles.base,
        flex && styles.flex,
        center && styles.center,
        alignCenter && styles.alignCenter,
        style,
      ]}
      {...props}
    >
      {children}
    </RNView>
  );
};

View.propTypes = {
  ...RNView.propTypes,
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
  bgColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      'primary1',
      'primary2',
      'primary3',
      'primary4',
      'primary5',
      'primary6',
      'primary7',
      'primary8',
      'primary9',
      'primary10',
      'secondary1',
      'secondary2',
      'secondary3',
      'secondary4',
      'secondary5',
      'secondary6',
      'secondary7',
      'secondary8',
      'secondary9',
      'secondary10',
      'success1',
      'success2',
      'success3',
      'success4',
      'success5',
      'success6',
      'success7',
      'success8',
      'success9',
      'success10',
      'danger1',
      'danger2',
      'danger3',
      'danger4',
      'danger5',
      'danger6',
      'danger7',
      'danger8',
      'danger9',
      'danger10',
      'warning1',
      'warning2',
      'warning3',
      'warning4',
      'warning5',
      'warning6',
      'warning7',
      'warning8',
      'warning9',
      'warning10',
      'default1',
      'default2',
      'default3',
      'default4',
      'default5',
      'default6',
      'default7',
      'default8',
      'default9',
      'default10',
      'purple1',
      'purple2',
      'purple3',
      'purple4',
      'purple5',
      'purple6',
      'purple7',
      'purple8',
      'purple9',
      'purple10',
      'surface1',
      'surface2',
      'neutral1',
      'neutral2',
    ]),
  ]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderRadius: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  position: PropTypes.oneOf(['relative', 'absolute']),
  absolute: PropTypes.bool,
  relative: PropTypes.bool,
  loading: PropTypes.bool,
  left: PropTypes.number,
  right: PropTypes.number,
  top: PropTypes.number,
  bottom: PropTypes.number,
  overflow: PropTypes.string,
  opacity: PropTypes.number,
  useShadow: PropTypes.bool,
  borderStyle: PropTypes.string,
  children: PropTypes.node,
};

const Image = require('../Image').default;
const Typography = require('../Typography').default;

const InfoWrapper = ({
  text = '',
  icon = 'infoModal',
  tintColor,
  color = 'default10',
  htmlContent = null,
  ...rest
}) => {
  return (
    <View>
      <View
        row
        bgColor="neutral2"
        borderColor="primary6"
        borderWidth={1}
        borderRadius={8}
        padding={16}
        {...rest}
      >
        <Image
          name={icon}
          width={24}
          height={24}
          tintColor={tintColor}
          margin={0}
        />
        <Typography
          variant="p3"
          color={color}
          marginLeft={8}
          marginRight={8}
          paddingRight={8}
          htmlContent={htmlContent}
        >
          {typeof text === 'string' ? text : <>{text}</>}
        </Typography>
      </View>
    </View>
  );
};

View.InfoWrapper = InfoWrapper;
export default View;

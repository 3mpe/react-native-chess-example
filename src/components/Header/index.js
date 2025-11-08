/* eslint-disable no-unreachable */
import PropTypes from 'prop-types';
import React from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from './../../utils';
import HeaderWithBackground from './HeaderWithBackground';
import useStyle from './styled';
import {Typography, Image, View, Button} from '../';

const Header = ({
  title,
  subTitle,
  barStyle,
  leftIcon = 'back',
  rightIcon = 'close',
  showRightIcon = false,
  showLeftIcon = false,
  height = 50,
  onPress,
  color,
  bgColor = 'neutral2',
  showStatusBar = false,
  statusBarColor = '#FFFFFF',
  statusBarStyle = 'dark-content',
}) => {
  const styles = useStyle();
  const navigation = useNavigation();

  const handleBack = type => {
    if (typeof onPress === 'function') {
      onPress(type);
      return;
    }
    if (type !== 'right' && navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View height={height} bgColor={bgColor}>
      {/* {barStyle && <StatusBar barStyle={barStyle} />} */}
      {showStatusBar && (
        <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarColor} />
      )}
      <View
        flex
        row
        between
        alignCenter
        paddingLeft={14}
        paddingRight={14}
        paddingTop={14}
        paddingBottom={14}
        style={styles.container}>
        {showLeftIcon ? (
          <Button onPress={handleBack}>
            <Image name={leftIcon} tintColor={color} />
          </Button>
        ) : (
          <View width={24} />
        )}
        <View flex center alignCenter>
          {!title && <Image name="logo" tintColor={color} />}
          {title && (
            <Typography color={color} variant="s3" semibold truncate>
              {title}
            </Typography>
          )}
          {subTitle && (
            <Typography color={color} variant="p3" truncate>
              {subTitle}
            </Typography>
          )}
        </View>
        {showRightIcon ? (
          <Button
            onPress={() => {
              handleBack('right');
            }}>
            <Image name={rightIcon} tintColor={color} />
          </Button>
        ) : (
          <View width={24} />
        )}
      </View>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  barStyle: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  showRightIcon: PropTypes.bool,
  showLeftIcon: PropTypes.bool,
  onPress: PropTypes.func,
  height: PropTypes.number,
  subTitle: PropTypes.string,
};

Header.widthBackground = HeaderWithBackground;
export default Header;

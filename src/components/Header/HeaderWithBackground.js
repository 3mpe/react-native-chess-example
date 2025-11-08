/* eslint-disable no-unreachable */
import PropTypes from 'prop-types';
import React from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from './../../utils';
import useStyle from './styled';
import {Typography, Image, View, Button, SafeAreaView} from '../';

const HeaderWithBackground = ({
  title,
  barStyle,
  bgImage,
  leftIcon = 'back',
  rightIcon = 'close',
  showRightIcon = false,
  showLeftIcon = false,
  height = 50,
  onClick = () => {},
}) => {
  const styles = useStyle();
  const navigation = useNavigation();
  const handleBack = type => {
    navigation.goBack();
    return;

    const isRightClick = type === 'right';

    navigation.canGoBack() && !isRightClick && navigation.goBack();
    typeof onClick === 'function' && onClick(isRightClick);
  };

  return (
    <View height={height}>
      <Image.Background source={{uri: bgImage}}>
        <SafeAreaView>
          <View
            flex
            row
            between
            alignCenter
            paddingLeft={16}
            paddingRight={16}
            paddingTop={30}
            paddingBottom={14}>
            {showLeftIcon ? (
              <View
                center
                alignCenter
                width={40}
                height={40}
                padding={6}
                marginLeft={16}
                bgColor="neutral2"
                borderRadius={40}>
                <Button onPress={handleBack}>
                  <Image name={leftIcon} tintColor="primary6" />
                </Button>
              </View>
            ) : (
              <View width={24} />
            )}
            <View center alignCenter>
              {!title && <Image name="logo" />}
              {title && (
                <Typography variant="s3" semibold>
                  {title}
                </Typography>
              )}
            </View>
            {showRightIcon ? (
              <View
                center
                alignCenter
                width={40}
                height={40}
                padding={6}
                bgColor="neutral2"
                borderRadius={40}
                marginRight={16}>
                <Button
                  onPress={() => {
                    handleBack('right');
                  }}>
                  <Image name={rightIcon} tintColor="primary6" />
                </Button>
              </View>
            ) : (
              <View width={24} />
            )}
          </View>
        </SafeAreaView>
      </Image.Background>
    </View>
  );
};

HeaderWithBackground.prototype = {
  title: PropTypes.string.isRequired,
  barStyle: PropTypes.string,
};

export default HeaderWithBackground;

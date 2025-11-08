/* eslint-disable react-native/no-inline-styles */
import PropTypes from 'prop-types';
import React from 'react';
import {Button, Card, Image, Typography, View} from '../../';

const SpecialForMe = ({
  cardType = 'Vertical',
  title,
  location,
  date,
  activityName,
  imageUrl,

  extraInfo = null,
  joined = false,
  buttonText = 'Git',
  buttonIcon = 'rightArrow',
  onClick,
}) => {
  let cardImageStyle = {
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  };
  const isVertical = cardType === 'Vertical';
  if (isVertical) {
    // cardImageStyle.height = 130;
    cardImageStyle.borderTopStartRadius = 12;
    cardImageStyle.borderTopEndRadius = 12;
    cardImageStyle.borderBottomStartRadius = 12;
    cardImageStyle.borderBottomEndRadius = 12;
    cardImageStyle.width = 136;
    cardImageStyle.height = 136;
    cardImageStyle.borderRadius = 12;
  }
  // Eğer onClick var ise alanın tamamının tıklanabilir olmasını saglamak amacı ile Oluşturuldu.
  const Wrapper = typeof onClick === 'function' ? Button : View;
  return (
    <Card
      style={{
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        // Android shadow property
        elevation: 2,
        borderRadius: 16,
        padding: 12,

        borderWidth: 1,
        borderColor: '#E0E0E0',
      }}>
      <Wrapper onPress={onClick}>
        <View position="relative" row={isVertical} center>
          <View
            position="relative"
            // width={isVertical ? 136 : '100%'}
            // maxHeight={isVertical ? 146 : '100%'}
            start>
            <Image
              source={{uri: imageUrl}}
              resizeMode={isVertical ? 'cover' : 'stretch'}
              style={{...cardImageStyle}}
            />
            {/* <View
              bgColor="#EBF0FF"
              opacity={0.25}
              position="absolute"
              width="100%"
              height="100%"
              borderRadius={12}
              top={0}
              left={0}
              zIndex={1}
            /> */}
            {joined && (
              <View
                row
                center
                alignCenter
                position="absolute"
                bottom={4}
                left={4}
                bgColor="primary1"
                borderRadius={4}>
                <Image name="userJoin" marginLeft={4} />
                <Typography variant="p4" color="primary6" semibold padding={4}>
                  Katılıyorum
                </Typography>
              </View>
            )}

            {extraInfo && (
              <View
                row
                center
                alignCenter
                position="absolute"
                bottom={4}
                left={4}
                bgColor="primary1"
                borderRadius={4}>
                <Typography variant="p4" color="primary6" semibold padding={4}>
                  {extraInfo}
                </Typography>
              </View>
            )}
          </View>
          <View flex={1} marginLeft={0} between>
            <View flex={1} marginLeft={8}>
              <Typography variant="s3" semibold marginTop={0} numberOfLines={3}>
                {title}
              </Typography>
              <View>
                {location && (
                  <View row alignCenter marginTop={8}>
                    <Image name="location" />
                    <Typography variant="p3" marginLeft={4} color="default7">
                      {location}
                    </Typography>
                  </View>
                )}

                {date && (
                  <View row alignCenter marginTop={4}>
                    <Image name="date" />
                    <Typography variant="p3" marginLeft={4} color="default7">
                      {date}
                    </Typography>
                  </View>
                )}

                {activityName && (
                  <View row alignCenter marginTop={4}>
                    <Image name="profiles" />
                    <Typography variant="p3" marginLeft={4}>
                      {activityName}
                    </Typography>
                  </View>
                )}
              </View>
            </View>
            {onClick && (
              <View
                // position="absolute"
                bottom={2}
                right={2}
                end
                row
                alignCenter>
                <View row center alignCenter between>
                  <Typography
                    variant="p3"
                    semibold
                    color="primary6"
                    marginRight={4}>
                    {buttonText}
                  </Typography>
                  <Image name={buttonIcon} />
                </View>
              </View>
            )}
          </View>
        </View>
      </Wrapper>
    </Card>
  );
};

SpecialForMe.prototypes = {
  cardType: PropTypes.oneOf(['Vertical', 'Horizontal']),
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  activityName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SpecialForMe;

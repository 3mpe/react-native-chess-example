import React, {useCallback, useMemo} from 'react';
import {TransportationType} from '../../services';
import {dateFormat} from '../../utils';
import Button from '../Button';
import Dot from '../Dot';
import Image from '../Image';
import Typography from '../Typography';
import View from '../View';

const CustomTransportSelectionItem = ({
  isActive,
  hideDot,
  hideFooter,
  showRightIconHeader = true,
  showRightIcon,
  useShadow = true,
  hideBorder = false,
  margin = 16,
  headerIcon = 'flight',
  headerText,

  type = TransportationType.CAR,

  // global
  title,
  date,
  plateOrPnr,

  // car
  toCity,
  fromCity,

  // flight
  code,
  from,
  fromCode,
  fromTime,

  to,
  toCode,
  toTime,

  totalTime,
  onPress,

  isQuotaFull,
}) => {
  const handleClick = useCallback(() => {
    if (isQuotaFull) return;
    if (typeof onPress === 'function') onPress();
  }, [isQuotaFull, onPress]);
  const opacity = useMemo(() => (isQuotaFull ? 0.3 : 1), [isQuotaFull]);
  return (
    <Button onPress={handleClick}>
      <View
        position="relative"
        row
        useShadow={useShadow}
        borderRadius={8}
        margin={margin}
        padding={16}
        alignCenter={showRightIcon}>
        {!hideDot && <Dot isActive={isActive} opacity={opacity} />}
        <View flex={1} left>
          {headerIcon && (
            <View row end={showRightIconHeader} alignCenter marginBottom={8}>
              {isQuotaFull ? (
                <Typography variant="p3" color="default10" semibold>
                  Kontenjan Dolu
                </Typography>
              ) : (
                <View row center alignCenter opacity={opacity}>
                  <Image name={headerIcon} tintColor="primary6" />
                  <Typography
                    ifCond={!headerText}
                    variant="p2"
                    color="default10"
                    marginTop={showRightIconHeader ? 0 : 4}
                    textAlign="center"
                    marginLeft={4}
                    // marginTop={0}
                    center>
                    {headerText}
                  </Typography>
                </View>
              )}
            </View>
          )}
          {/* Header */}
          <View row opacity={opacity}>
            <View row between marginBottom={!hideBorder ? 0 : 16}>
              <View width={type === TransportationType.CAR ? '40%' : '50%'}>
                <Typography
                  variant="p2"
                  textAlign="center"
                  marginBottom={4}
                  semibold>
                  {title}
                </Typography>
                <Typography variant="p3" textAlign="center">
                  {date ? date : dateFormat(toCity, 'DD.MM.YYYY')}
                </Typography>
              </View>
              <View
                ifCond={type !== TransportationType.CAR}
                width="20%"
                center
                alignCenter>
                <Image name="next" />
              </View>
              <View width={type === TransportationType.CAR ? '40%' : '50%'}>
                <Typography
                  variant="p2"
                  end
                  marginBottom={4}
                  textRight
                  semibold>
                  {plateOrPnr}
                </Typography>
              </View>
            </View>
          </View>
          {/* End Header */}

          {!hideBorder && (
            <View
              bgColor="default4"
              marginTop={16}
              marginBottom={type === TransportationType.CAR ? -16 : 16}
              borderWidth={1}
              borderStyle="dotted"
              borderColor="default4"
              opacity={opacity}
            />
          )}
          <View
            row
            between
            ifCond={type === TransportationType.CAR}
            opacity={opacity}>
            <View>
              <Typography variant="p2" semibold>
                {fromCode}
              </Typography>
              <Typography variant="p3" color="default7" marginTop={2}>
                {from}
              </Typography>
              <Typography variant="p3" color="default7" marginTop={2}>
                {dateFormat(fromTime, 'HH:mm')}
              </Typography>
            </View>

            <View row center alignCenter ifCond={!totalTime}>
              <View
                width={8}
                height={8}
                bgColor="primary6"
                padding={4}
                borderRadius={200}
                marginRight={8}
              />
              <Typography variant="p3" color="default7">
                {totalTime}
              </Typography>
              <Image name="next" marginLeft={4} />
            </View>

            <View>
              <Typography variant="p2" semibold end>
                {toCode}
              </Typography>
              <Typography variant="p3" color="default7" end marginTop={2}>
                {to}
              </Typography>
              <Typography variant="p3" color="default7" end marginTop={4}>
                {dateFormat(toTime, 'HH:mm')}
              </Typography>
            </View>
          </View>

          {/* {!hideFooter && (
            <>
              <View
                height={1}
                bgColor="default4"
                marginTop={16}
                marginBottom={16}
              />

              <View row between alignCenter>
                <Image name="flight" />
                <View row>
                  <Typography variant="p3" marginRight={8}>
                    Kalan Kontenjan:
                  </Typography>
                  <Typography variant="p3" semibold>
                    27
                  </Typography>
                </View>
              </View>
            </>
          )} */}
        </View>
        {showRightIcon && (
          <Image name="rightArrow" marginLeft={16} marginRight={-8} />
        )}
      </View>
    </Button>
  );
};

export default CustomTransportSelectionItem;

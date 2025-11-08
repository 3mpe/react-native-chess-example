/* eslint-disable react-native/no-inline-styles */
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Image, Button, Typography, Avatar} from '../../../components';
import {ActivitiesService} from '../../../services';
import {RoutesNames, useNavigation} from './../../../utils';
import {AppliedTypes} from '../../../services/_activities.service';

// type: old, new, volunteer
const Join = ({
  activityGuid,
  isFinished,
  type = 'old',
  appliedUserCount = 0,
  infoMessage,
  onPress = () => {},
  title,
  isApplied,
  // participants,
}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        await getEventParticipants();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, [activityGuid, getEventParticipants, appliedUserCount, isApplied]);

  const getEventParticipants = useCallback(async () => {
    const {data, isSuccessful} = await ActivitiesService.getEventPraticipants(
      activityGuid,
    );

    if (isSuccessful) {
      setParticipants(data);
    }
  }, [activityGuid]);

  const renderButton = useMemo(() => {
    if (type === 'old') {
      return (
        <View>
          <Button disabled>
            <View
              row
              alignCenter
              center
              borderWidth={1}
              borderColor="default8"
              paddingLeft={16}
              paddingRight={16}
              paddingTop={10}
              paddingBottom={10}
              borderRadius={40}
              marginTop={16}>
              <Image
                name="activity"
                width={24}
                height={24}
                marginRight={4}
                tintColor="default9"
              />
              <Typography variant="s3" color="default9" center semibold>
                Etkinlik Sona Erdi
              </Typography>
            </View>
          </Button>
        </View>
      );
    }

    if (type === 'new') {
      return (
        <View row alignCenter>
          {isApplied === AppliedTypes.PENDING && (
            <View start center marginTop={16}>
              <Button
                onPress={() => {
                  onPress('reject');
                }}>
                <View
                  center
                  alignCenter
                  paddingTop={10}
                  paddingBottom={10}
                  paddingLeft={10}
                  paddingRight={10}
                  borderColor="primary6"
                  borderWidth={1}
                  borderRadius={40}
                  marginRight={16}>
                  <Typography variant="s3" color="primary6" center semibold>
                    Katılmayacağım
                  </Typography>
                </View>
              </Button>
            </View>
          )}
          {(isApplied === AppliedTypes.PENDING ||
            isApplied === AppliedTypes.REJECT) && (
            <View flex marginTop={16}>
              <Button
                loading={loading}
                onPress={() => {
                  onPress('join');
                }}>
                <View
                  center
                  alignCenter
                  paddingTop={10}
                  paddingBottom={10}
                  paddingLeft={16}
                  paddingRight={16}
                  bgColor="primary6"
                  borderRadius={40}>
                  <Typography
                    variant="s3"
                    color="neutral2"
                    align="center"
                    semibold>
                    Katılacağım
                  </Typography>
                </View>
              </Button>
            </View>
          )}
        </View>
      );
    }

    if (type === 'volunteer') {
      return (
        <View marginTop={16}>
          <Button disabled>
            <View
              row
              alignCenter
              center
              borderWidth={1}
              bgColor="primary6"
              paddingLeft={16}
              paddingRight={16}
              paddingTop={10}
              paddingBottom={10}
              borderRadius={40}>
              <Typography variant="s3" color="neutral2" center semibold>
                Sıraya Gir
              </Typography>
            </View>
          </Button>
        </View>
      );
    }

    return null;
  }, [type, isApplied, loading, onPress]);

  return (
    <View loading={loading} loadingHeight={50}>
      {appliedUserCount > 0 && (
        <View row alignCenter between>
          <View row paddingTop={16}>
            {participants
              .filter((_, index) => index < 5)
              .map((participant, index) => {
                return (
                  <View key={index} marginLeft={index === 0 ? -16 : -52}>
                    <Avatar
                      size="p3"
                      width={32}
                      height={32}
                      source={{uri: participant.avatarImage}}
                      nameSurname={participant.userName}
                      containerProps={{
                        marginLeft: 18,
                      }}
                    />
                  </View>
                );
              })}
          </View>
          <Button
            onPress={() => {
              if (!isFinished) {
                navigation.navigate(RoutesNames.Participant, {
                  activityGuid,
                  title,
                });
              }
            }}>
            <View
              row
              center
              alignCenter
              style={{borderBottomWidth: 1}}
              marginTop={16}>
              <Typography
                variant="p3"
                color="primary6"
                align="center"
                center
                alignCenter
                semibold
                marginRight={4}>
                {appliedUserCount}
              </Typography>
              <Typography
                variant="p3"
                color="primary6"
                align="center"
                center
                semibold
                alignCenter>
                kişi bu etkinliğe {isFinished ? 'katıldı' : 'katılıyor'}
              </Typography>
            </View>
          </Button>
        </View>
      )}

      <View>{renderButton}</View>

      {infoMessage && (
        <View
          marginTop={16}
          row
          alignCenter
          bgColor="primary1"
          padding={16}
          borderRadius={8}>
          <Image name="infoModal" width={24} height={24} marginRight={8} />
          <Typography variant="p2" color="default10" align="center">
            {infoMessage}
          </Typography>
        </View>
      )}
      <View
        ifCond={
          isApplied === AppliedTypes.PENDING ||
          isApplied === AppliedTypes.REJECT
        }
        marginTop={16}
        bgColor="default4"
        height={1}
      />
    </View>
  );
};

Join.propTypes = {
  isFinished: PropTypes.bool,
  type: PropTypes.oneOf(['old', 'new', 'volunteer']),
};

export default Join;

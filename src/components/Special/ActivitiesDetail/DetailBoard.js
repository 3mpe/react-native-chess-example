import React, {useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {View, Typography, Image, Button} from './../../';
import {RoutesNames, useNavigation} from './../../../utils';
import useStyled from './styled';
import {ActivityStepStatusType} from '../../../services';

const DetailBoard = ({
  title,
  activityGuid,
  isActive = true,
  complatedListIndexes = [],
  stepStatusWhiteList = [],
  stepStatus,
  isFnished,

  transportationSelectionTitle,
  transportationSelectionDescription,

  roommateSelectionTitle,
  roommateSelectionDescription,

  transferListSelectionTitle,
  transferListSelectionDescription,

  activityBeginTitle,
  activityBeginDescription,
}) => {
  const navigation = useNavigation();
  const styles = useStyled();
  const [infoList] = useState([
    {
      type: ActivityStepStatusType.TRANSPORTATION,
      title: transportationSelectionTitle,
      description: transportationSelectionDescription,
    },
    {
      type: ActivityStepStatusType.ACCOMMODATION_ROOMMATE,
      title: roommateSelectionTitle,
      description: roommateSelectionDescription,
    },
    {
      type: ActivityStepStatusType.TRANSFERLIST,
      title: transferListSelectionTitle,
      description: transferListSelectionDescription,
    },
  ]);

  const [transferList] = useState([
    {
      id: ActivityStepStatusType.TRANSPORTATION,
      title: 'Ulaşım\nBilgileri',
      icon: 'userTravel',
      color: 'primary6',
    },
    {
      id: ActivityStepStatusType.ACCOMMODATION_ROOMMATE,
      title: 'Oda\nArkadaşı',
      icon: 'userAdd',
      color: 'default4',
    },
    {
      id: ActivityStepStatusType.TRANSFERLIST,
      title: 'Transfer\nListesi',
      icon: 'userTransfer2',
      color: 'default4',
    },
    // {
    //   id: '4',
    //   title: 'Paylaşım Duvarı',
    //   icon: 'userSharedWall',
    //   color: 'default4',
    // },
  ]);

  const handlePress = (item, index) => {
    const complated = isComplated(item.id);
    const _isActive = isOppened(item.id, index);

    if (complated || !_isActive) return null;

    switch (item.id) {
      case ActivityStepStatusType.TRANSPORTATION:
        navigation.navigate(RoutesNames.Transport, {item, title, activityGuid});
        break;
      case ActivityStepStatusType.ACCOMMODATION_ROOMMATE:
        navigation.navigate(RoutesNames.Rommate, {item, title, activityGuid});
        break;
      case ActivityStepStatusType.TRANSFERLIST:
        navigation.navigate(RoutesNames.ShowPdf, {
          item,
          title,
          activityGuid,
          headerTitle: 'Transfer Bilgisi',
        });
        break;
      case '4':
        Alert.alert('Paylaşım Duvarı', 'Henüz yapım aşamasında');
        break;
      default:
        break;
    }
  };

  // TODO: id is array, you can not use includes
  const isComplated = useCallback(
    id => {
      if (isFnished) return null;

      // API'den gelen 'roommate' ve bileşen içindeki 'accommodationRoommate'
      if (id === ActivityStepStatusType.ACCOMMODATION_ROOMMATE) {
        return (
          complatedListIndexes.includes('roommate') ||
          complatedListIndexes.includes(id)
        );
      }

      return complatedListIndexes.includes(id);
    },
    [complatedListIndexes, isFnished],
  );

  const isOppened = useCallback(
    (id, index) => {
      if (isFnished) return true;

      // The current step must be active to be considered open
      if (!stepStatus.includes(id)) {
        return false;
      }

      // The first step is open if it's active (no previous steps)
      if (index === 0) {
        return true;
      }

      // For all other steps, check if ALL previous steps are completed
      const previousSteps = transferList.slice(0, index);
      const allPreviousCompleted = previousSteps.every(step =>
        isComplated(step.id),
      );

      return allPreviousCompleted;
    },
    [stepStatus, isFnished, transferList, isComplated],
  );

  const detailInfo = useMemo(() => {
    const nextActionableStep = transferList.find(
      (item, index) => isOppened(item.id, index) && !isComplated(item.id),
    );

    if (nextActionableStep) {
      return infoList.find(info => info.type === nextActionableStep.id) || {};
    }

    return {
      title: activityBeginTitle,
      description: activityBeginDescription,
    };
  }, [
    transferList,
    activityBeginTitle,
    activityBeginDescription,
    isOppened,
    isComplated,
    infoList,
  ]);

  const allStepsCompleted = useMemo(
    () => transferList.every(step => isComplated(step.id)),
    [isComplated, transferList],
  );

  const stepColors = useMemo(() => {
    const nextActionableStep = transferList.find(
      (item, index) => isOppened(item.id, index) && !isComplated(item.id),
    );

    // Eğer tüm adımlar tamamlandıysa veya yapılacak aktif bir adım yoksa (örn: transfer listesi bekleniyor)
    // bilgi kutusunu pasif renklere çevir.
    if (allStepsCompleted || !nextActionableStep) {
      return {
        bgColor: 'surface1',
        bgAndBorderColor: 'default4',
        textColor: 'default10',
      };
    }

    return {
      bgColor: 'primary6',
      bgAndBorderColor: 'primary6',
      textColor: 'neutral2',
    };
  }, [allStepsCompleted, transferList, isOppened, isComplated]);
  if (transferList.length === 0) return null;
  // if (transferList.length === complatedListIndexes.length) return null;

  return (
    <View
      useShadow
      marginTop={16}
      marginBottom={16}
      borderColor="primary6"
      borderEndEndRadius={16}
      borderRadius={16}>
      {detailInfo?.title && detailInfo?.description && (
        <View
          padding={16}
          bgColor={stepColors.bgColor}
          borderColor={stepColors.bgAndBorderColor}
          borderTopStartRadius={16}
          borderTopEndRadius={16}>
          <Typography variant="s3" semibold color={stepColors.textColor}>
            {detailInfo.title}
          </Typography>
          <Typography variant="p2" color={stepColors.textColor} marginTop={8}>
            {detailInfo.description}
          </Typography>
        </View>
      )}

      <View row between alignCenter>
        {transferList.map((item, index) => (
          <View key={index} flex>
            <Button activeOpacity={1} onPress={() => handlePress(item, index)}>
              <View flex center alignCenter marginBottom={16} marginTop={16}>
                <View
                  style={styles.detailBoard.imageContainer}
                  borderWidth={1}
                  bgColor={
                    isComplated(item.id)
                      ? 'neutral2'
                      : isOppened(item.id, index)
                      ? 'primary6'
                      : 'neutral2'
                  }
                  borderColor={
                    isComplated(item.id)
                      ? 'default7'
                      : isOppened(item.id, index)
                      ? 'primary6'
                      : 'default7'
                  }>
                  <Image
                    name={isComplated(item.id) ? 'check' : item.icon}
                    width={20}
                    height={20}
                    marginBottom={8}
                    marginTop={6}
                    tintColor={
                      isComplated(item.id)
                        ? 'default7'
                        : isOppened(item.id, index)
                        ? 'neutral2'
                        : 'default7'
                    }
                  />
                </View>
                <Typography
                  variant="p2"
                  color={
                    isComplated(item.id)
                      ? 'default7'
                      : isOppened(item.id, index)
                      ? 'primary6'
                      : 'default7'
                  }
                  width={80}
                  oneOfType="2"
                  marginTop={2}
                  textCenter
                  semibold>
                  {item.title}
                </Typography>
              </View>
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DetailBoard;

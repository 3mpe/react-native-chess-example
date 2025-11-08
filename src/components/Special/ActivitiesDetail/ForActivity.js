import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import DetailBoard from './DetailBoard';
import Photier from './Photier';
import WhatsApp from './WhatsApp';
import {
  ActivityStepStatusType,
  RoommateRequestStatus,
  RoommateService,
  TransportationService,
  TransportationType,
} from '../../../services';
import {
  RoutesNames,
  calculateTimeDifference,
  errorHandler,
  format,
} from '../../../utils';
import {View, Typography, Image, Card, Button} from '../../index';

// const DontForget = ({onPress = () => {}}) => {
//   const cardStyles = CardStyles();
//   return (
//     <View>
//       <Card
//         marginLeft={0}
//         marginRight={0}
//         style={{
//           ...cardStyles.cardShadow,
//           backgroundColor: '#001A64',
//         }}>
//         <Button onPress={onPress}>
//           <View row alignCenter between>
//             <View row center alignCenter>
//               <Image name="newPage" tintColor="#fff" />
//               <Typography
//                 marginLeft={8}
//                 variant="s3"
//                 color="#fff"
//                 semibold
//                 numberOfLines={2}>
//                 Belge yüklemeyi unutma!
//               </Typography>
//             </View>
//             <Image name="rightArrow" tintColor="#fff" />
//           </View>
//         </Button>
//       </Card>

//       <InfoWrapper
//         text="Kimlik belgeni yüklemezsen, etkinlik için gerekli rezervasyon adımlarını tamamlayamazsın."
//         marginTop={16}
//         marginBottom={16}
//         borderColor="warning6"
//         icon="modalWarning"
//       />
//       <InfoWrapper text="Herhangi bir değişiklik ya da bilgi için lütfen iletişim sayfasından ilgili kişiye ulaşın." />
//     </View>
//   );
// };

const ForActivity = ({
  title,
  activityGuid,
  hasIdentityDocument,
  stepStatus,
  isFnished,
  currentUserTransportation,
  roommateSelectionDate,
  transportationSelectionDate,
  complatedListIndexes = [],
  stepStatusWhiteList = [],
  isActivityAccommodationActivity,

  transportationSelectionTitle,
  transportationSelectionDescription,

  roommateSelectionTitle,
  roommateSelectionDescription,

  transferListSelectionTitle,
  transferListSelectionDescription,

  activityBeginTitle,
  activityBeginDescription,

  photierTitle,
  photierDescription,
  photierLink,

  handleRoommateAccept = () => {},
  handleRoommateReject = () => {},
}) => {
  // const currentUserTransportation = TransportationType.OTHER; //
  // const {authUser} = useAuthContext();
  const [transporttation, setTransportation] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [roommateRequest, setRoommateRequest] = useState([]);

  // const handleDontForget = () => {
  //   navigation.navigate(RoutesNames.UploadDocument, {activityGuid});
  // };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await getRoommateRequest();

      // await getTrapsportationBus();
      if (currentUserTransportation === TransportationType.CAR)
        await getTrapsportationCar();
      else if (currentUserTransportation === TransportationType.FLIGHT)
        await getTrapsportationFlight();
      else if (currentUserTransportation === TransportationType.OTHER)
        await getTrapsportationOther();
      setLoading(false);
    }
    fetchData();
  }, [
    currentUserTransportation,
    getRoommateRequest,
    getTrapsportationCar,
    getTrapsportationFlight,
    getTrapsportationOther,
  ]);

  const getRoommateRequest = useCallback(async () => {
    try {
      const {data, isSuccessful} = await RoommateService.getEventRoommate(
        activityGuid,
      );
      if (isSuccessful) {
        setRoommateRequest(data);
      }
    } catch (error) {
      errorHandler(error);
    }
  }, [activityGuid]);

  const getTrapsportationCar = useCallback(async () => {
    try {
      const {data, isSuccessful} = await TransportationService.getUserCarDetail(
        activityGuid,
      );
      if (isSuccessful) {
        setTransportation(data);
      }
    } catch (error) {
      errorHandler(error);
    }
  }, [activityGuid]);

  const getTrapsportationFlight = useCallback(async () => {
    try {
      const {data, isSuccessful} = await TransportationService.getPlaneDetail(
        activityGuid,
      );
      if (isSuccessful) {
        setTransportation(data);
      }
    } catch (error) {
      errorHandler(error);
    }
  }, [activityGuid]);

  const getTrapsportationOther = useCallback(async () => {
    try {
      const {data, isSuccessful} = await TransportationService.getOtherDetail(
        activityGuid,
      );
      if (isSuccessful) {
        setTransportation(data);
      }
    } catch (error) {
      errorHandler(error);
    }
  }, [activityGuid]);

  const getStatusText = useCallback(status => {
    const statuses = {
      [RoommateRequestStatus.REJECT]: {
        text: 'Reddedildi',
        color: 'error7',
        bgColor: 'error1',
      },
      [RoommateRequestStatus.ACCEPT]: {
        text: 'Kabul Edildi',
        color: 'success7',
        bgColor: 'success1',
      },
      [RoommateRequestStatus.PENDING]: {
        text: 'Beklemede',
        color: 'warning7',
        bgColor: 'warning1',
      },
    };
    return (
      statuses[status] || {
        text: 'Bilinmiyor',
        color: 'default10',
        bgColor: 'default1',
      }
    );
  }, []);

  const renderTrasportation = useMemo(() => {
    const transportTypes = {
      [TransportationType.CAR]: (
        <View padding={16}>
          <View row alignCenter between>
            <View row alignCenter>
              <Image name="car" tintColor="primary6" />
              <Typography variant="p2" color="default10" marginLeft={8}>
                Gidiş/Dönüş
              </Typography>
            </View>
            <Typography variant="p2" color="default10" textCenter semibold>
              Kendi Aracım
            </Typography>
          </View>
        </View>
      ),
      [TransportationType.FLIGHT]: (
        <Card.CustomTransportSelection
          margin={0}
          useShadow={false}
          hideDot
          hideFooter
          hideBorder
          headerIcon="flight"
          headerText="Gidiş"
          showRightIconHeader={false}
          type={TransportationType.FLIGHT}
          currentUserTransportation={currentUserTransportation}
          title={transporttation?.departurePlane?.transportationCompany}
          plateOrPnr={transporttation?.departurePlane?.pnrNumber}
          fromCity={transporttation?.departurePlane?.fromCityName}
          code={transporttation?.departurePlane?.flightNumber}
          fromCode={transporttation?.departurePlane?.fromCityIATA}
          fromTime={transporttation?.departurePlane?.departureTime}
          from={transporttation?.departurePlane?.fromCityName}
          toCode={transporttation?.departurePlane?.toCityIATA}
          toCity={transporttation?.departurePlane?.arrivalTime}
          to={transporttation?.departurePlane?.toCityName}
          toTime={transporttation?.departurePlane?.arrivalTime}
          // totalTime="2 saat 15 dakika"
          totalTime={calculateTimeDifference(
            transporttation?.departurePlane?.departureTime,
            transporttation?.departurePlane?.arrivalTime,
          )}
        />
      ),
      [TransportationType.OTHER]: (
        <View padding={16}>
          <View row alignCenter between>
            <View row alignCenter>
              <Image name="bag" tintColor="primary6" />
              <Typography variant="p2" color="default10" marginLeft={8}>
                Gidiş/Dönüş
              </Typography>
            </View>
            <Typography variant="p2" color="default10" textCenter semibold>
              Diğer
            </Typography>
          </View>
          <Typography variant="p2" color="default10" marginTop={10}>
            “{format.truncateText(transporttation?.description, 250)}”
          </Typography>
        </View>
      ),
    };

    return transportTypes[currentUserTransportation] || null;
  }, [currentUserTransportation, transporttation]);

  const renderTrasportationReturn = useMemo(() => {
    const transportTypes = {
      [TransportationType.CAR]: null,
      [TransportationType.FLIGHT]: (
        <>
          <View
            height={1}
            bgColor="default4"
            marginTop={4}
            marginBottom={2}
            borderstyle="dashed"
          />
          <Card.CustomTransportSelection
            margin={0}
            useShadow={false}
            hideDot
            hideFooter
            hideBorder
            headerIcon="flight"
            headerText="Dönüş"
            showRightIconHeader={false}
            type={TransportationType.FLIGHT}
            currentUserTransportation={currentUserTransportation}
            title={transporttation?.returnPlane?.transportationCompany}
            plateOrPnr={transporttation?.returnPlane?.pnrNumber}
            fromCity={transporttation?.returnPlane?.fromCityName}
            code={transporttation?.returnPlane?.flightNumber}
            fromCode={transporttation?.returnPlane?.fromCityIATA}
            fromTime={transporttation?.returnPlane?.departureTime}
            from={transporttation?.returnPlane?.fromCityName}
            toCode={transporttation?.returnPlane?.toCityIATA}
            toCity={transporttation?.returnPlane?.arrivalTime}
            to={transporttation?.returnPlane?.toCityName}
            toTime={transporttation?.returnPlane?.arrivalTime}
            // totalTime="2 saat 15 dakika"
            totalTime={calculateTimeDifference(
              transporttation?.returnPlane?.departureTime,
              transporttation?.returnPlane?.arrivalTime,
            )}
          />
        </>
      ),
      [TransportationType.OTHER]: null,
    };

    return transportTypes[currentUserTransportation] || null;
  }, [currentUserTransportation, transporttation]);

  const handleGoTransfer = useCallback(() => {
    navigation.navigate(RoutesNames.ShowPdf, {
      activityGuid,
      title,
      headerTitle: 'Transfer Bilgisi',
    });
  }, [activityGuid, navigation, title]);

  // servisten dönen bu alan
  // False ise ulaşım, arkadaş ve transfer list yok demektir
  // if (!isActivityAccommodationActivity) return null;

  const handleAcceptOrReject = useCallback(
    async (item, isAccepted = true) => {
      try {
        setLoading(true);
        const {isSuccessful} = await RoommateService.responseRequest(
          activityGuid,
          item.userGUID,
          isAccepted,
        );
        if (isSuccessful) {
          await getRoommateRequest();
          if (isAccepted) handleRoommateAccept(item);
          else handleRoommateReject(item);
        }
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    },
    [
      activityGuid,
      getRoommateRequest,
      handleRoommateAccept,
      handleRoommateReject,
    ],
  );

  const hasRoommateStep = [
    // ActivityStepStatusType.ACCOMMODATION_ROOMMATE.toLowerCase(),
    'roommate',
  ]
    .map(key => complatedListIndexes.includes(key))
    .reduce((acc, val) => acc || val, false);

  return (
    <View>
      {/* {hasIdentityDocument && <DontForget onPress={handleDontForget} />} */}

      <View ifCond={!isActivityAccommodationActivity}>
        <DetailBoard
          title={title}
          activityGuid={activityGuid}
          stepStatus={stepStatus}
          isFnished={isFnished}
          complatedListIndexes={complatedListIndexes}
          stepStatusWhiteList={stepStatusWhiteList}
          transportationSelectionTitle={transportationSelectionTitle}
          transportationSelectionDescription={
            transportationSelectionDescription
          }
          roommateSelectionTitle={roommateSelectionTitle}
          roommateSelectionDescription={roommateSelectionDescription}
          transferListSelectionTitle={transferListSelectionTitle}
          transferListSelectionDescription={transferListSelectionDescription}
          activityBeginTitle={activityBeginTitle}
          activityBeginDescription={activityBeginDescription}
        />

        {/* <InfoWrapper text="Herhangi bir değişiklik ya da bilgi için lütfen iletişim sayfasından ilgili kişiye ulaşın." /> */}
      </View>

      <Photier
        activityGuid={activityGuid}
        title={photierTitle}
        link={photierLink}
        description={photierDescription}
      />
      <View
        ifCond={transporttation === null}
        useShadow
        borderRadius={8}
        marginTop={16}>
        <Typography.HeaderTitle title="Ulaşım Bilgilerin Tamamlandı" />
        {renderTrasportation}
        {renderTrasportationReturn}
      </View>

      <View
        useShadow
        borderRadius={8}
        marginTop={16}
        ifCond={roommateRequest.length === 0}>
        <Typography.HeaderTitle title="Oda Arkadaşı Seçimi" />

        {roommateRequest.map((item, index) => {
          const status = getStatusText(item.status);
          return (
            <>
              <View ifCond={item.isSingleRoom} key={index} flex>
                <View key={index} row alignCenter between padding={16}>
                  <View flex={1} row alignCenter marginRight={16}>
                    <Image name="userPlus" />
                    <View marginLeft={8} marginRight={8}>
                      <Typography variant="p2" color="default10" semibold>
                        {item.userName}
                      </Typography>
                      <Typography variant="p2" color="default10">
                        {item.jobTitle}
                      </Typography>
                    </View>
                  </View>
                  <View>
                    <View
                      row
                      alignCenter
                      bgColor={status.bgColor}
                      paddingLeft={12}
                      paddingRight={12}
                      paddingTop={8}
                      paddingBottom={8}
                      borderRadius={20}>
                      <Typography variant="p2" color={status.color} semibold>
                        {status.text}
                      </Typography>
                    </View>
                  </View>
                </View>
                <View
                  ifCond={
                    (item.status === RoommateRequestStatus.PENDING &&
                      item.requestType === 'SentRequest') ||
                    item.status !== RoommateRequestStatus.PENDING
                  }
                  row
                  flex
                  center
                  alignCenter>
                  <View
                    flex
                    center
                    alignCenter
                    marginRight={8}
                    marginLeft={16}
                    marginBottom={16}
                    borderWidth={1}
                    borderColor="primary6"
                    borderRadius={200}
                    minHeight={36}>
                    <Button
                      disabled={loading}
                      onPress={() => handleAcceptOrReject(item, false)}>
                      <Typography
                        variant="s3"
                        color="primary6"
                        semibold
                        textCenter
                        center
                        alignCenter
                        marginTop={8}
                        marginBottom={8}
                        marginLeft={16}
                        marginRight={16}>
                        Reddet
                      </Typography>
                    </Button>
                  </View>

                  <View
                    flex
                    center
                    alignCenter
                    marginBottom={16}
                    borderWidth={1}
                    bgColor="primary6"
                    borderRadius={200}
                    marginRight={16}>
                    <Button
                      disabled={loading}
                      onPress={() => handleAcceptOrReject(item, true)}>
                      <Typography
                        variant="s3"
                        color="neutral2"
                        semibold
                        textCenter
                        marginTop={8}
                        marginBottom={8}
                        marginLeft={16}
                        marginRight={16}>
                        Onayla
                      </Typography>
                    </Button>
                  </View>
                </View>
              </View>
              <View ifCond={!item.isSingleRoom} key={index} flex>
                <View key={index} row alignCenter between padding={16}>
                  <View flex={1} row alignCenter marginRight={16}>
                    <Image name="userPlus" />
                    <View marginLeft={8} marginRight={8}>
                      <Typography variant="p2" color="default10" semibold>
                        Oda Arkadaşı Yok
                      </Typography>
                      <Typography variant="p2" color="default10">
                        Tek kişilik oda
                      </Typography>
                    </View>
                  </View>
                  <View>
                    <View
                      row
                      alignCenter
                      bgColor={status.bgColor}
                      paddingLeft={12}
                      paddingRight={12}
                      paddingTop={8}
                      paddingBottom={8}
                      borderRadius={20}>
                      <Typography variant="p2" color={status.color} semibold>
                        {status.text}
                      </Typography>
                    </View>
                  </View>
                </View>
              </View>
            </>
          );
        })}
      </View>

      <View
        ifCond={
          !stepStatus.includes(ActivityStepStatusType.TRANSFERLIST) ||
          (!complatedListIndexes.includes(
            ActivityStepStatusType.TRANSPORTATION.toLowerCase(),
          ) &&
            !hasRoommateStep)
        }
        useShadow
        borderRadius={8}
        marginTop={16}>
        <Typography.HeaderTitle
          title={
            !stepStatus.includes(ActivityStepStatusType.TRANSFERLIST)
              ? 'Transfer listesi belli olana kadar bekle.'
              : 'Transfer Bilgisi Belli Oldu'
          }
        />
        <View alignCenter between padding={16}>
          <View row alignCenter>
            <Image name="userTransfer2" />
            <View marginLeft={8} marginRight={8}>
              <Typography variant="p2" color="default10">
                {!stepStatus.includes(ActivityStepStatusType.TRANSFERLIST)
                  ? 'Transfer listeleri belli olduktan sonra etkinlik sonuna kadar buradan takip edebilirsin.'
                  : 'Etkinlik sonuna kadar buradan takip edebilirsin.'}
              </Typography>
            </View>
          </View>
          <View
            marginTop={20}
            width="100%"
            ifCond={!stepStatus.includes(ActivityStepStatusType.TRANSFERLIST)}>
            <Button onPress={handleGoTransfer}>
              <View borderWidth={1} borderColor="primary6" borderRadius={200}>
                <Typography
                  variant="s3"
                  color="primary6"
                  semibold
                  textCenter
                  padding={10}>
                  Transfer Listesini Gör
                </Typography>
              </View>
            </Button>
          </View>
        </View>
      </View>

      <View.InfoWrapper
        marginTop={16}
        text="Etkinlik ve uygulama hakkında destek almak için Önemli Bilgiler altındaki iletişim adreslerimizden bize ulaşabilirsin."
      />
    </View>
  );
};

export default ForActivity;

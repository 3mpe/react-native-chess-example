import React, {useState, useEffect, useCallback} from 'react';
import {Linking} from 'react-native';
import Contact from './Contact';
import SSS from './SSS';
import WhatsApp from './WhatsApp';
import {Button, Image, Typography, View} from '../../';
import {ActivitiesService} from '../../../services';
import {
  navigate,
  RoutesNames,
  errorHandler,
  useNavigation,
  format,
} from '../../../utils';

const EmergencyEvacuationPlan = ({
  emergencyTitle,
  emergencyDescription,
  emergencyButtonText,
  emergencyMedia,
  ...rest
}) => {
  const navigation = useNavigation();
  const handleLink = useCallback(() => {
    if (emergencyMedia) {
      navigation.navigate(RoutesNames.ShowPdf, {
        showExtraUrl: true,
        url: emergencyMedia,
        headerTitle: emergencyTitle,
        title: '',
      });
    }
  }, [emergencyMedia, emergencyTitle, navigation]);
  return (
    <View
      ifCond={!emergencyTitle && !emergencyDescription && !emergencyButtonText}
      marginTop={16}
      useShadow
      borderRadius={16}>
      <Typography.HeaderTitle title={emergencyTitle} bgColor="danger1" />
      <View.InfoWrapper
        icon="emergencyEvacuationPlan"
        text={emergencyDescription}
        tintColor="danger6"
        borderWidth={0}
        center
        alignCenter
      />
      <View row evenly marginLeft={16} marginRight={16} marginBottom={16}>
        <View flex>
          <Button onPress={handleLink}>
            <View
              center
              alignCenter
              paddingTop={10}
              paddingBottom={10}
              paddingLeft={16}
              paddingRight={16}
              borderWidth={1}
              borderColor="primary6"
              borderRadius={40}>
              <Typography variant="s3" color="primary6" align="center" semibold>
                {emergencyButtonText}
              </Typography>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
};

const UseFullInformation = ({
  activityGuid,
  title,
  isAccommodationActivity,
  emergencyDescription,
  emergencyButtonText,
  emergencyTitle,
  emergencyMedia,

  whatsappTitle,
  whatsappDescription,
  whatsappLink,
}) => {
  const [loading, setLoading] = useState(false);
  const [dressCodeList, setDressCodeList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (activityGuid) {
        await getDressCodeList();
      }
    }
    fetchData();
  }, [activityGuid, getDressCodeList]);

  const getDressCodeList = useCallback(async () => {
    try {
      setLoading(false);
      const {data, isSuccessful} = await ActivitiesService.getDressCodeListing(
        activityGuid,
      );

      if (isSuccessful) {
        setDressCodeList(data);
      }
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  }, [activityGuid]);

  const handleGoToHotel = useCallback(() => {
    navigate(RoutesNames.AboutTheHotel, {activityGuid, title});
  }, [activityGuid, title]);

  return (
    <View>
      <WhatsApp
        activityGuid={activityGuid}
        title={whatsappTitle}
        description={whatsappDescription}
        link={whatsappLink}
      />

      <Contact activityGuid={activityGuid} />

      <View
        loading={loading}
        useShadow
        borderWidth={1}
        borderColor="default4"
        padding={16}
        borderRadius={16}
        marginTop={16}
        ifCond={dressCodeList.length === 0}>
        <Typography variant="s3" color="primary6" semibold>
          Kıyafet Kodu
        </Typography>

        <View marginTop={16}>
          {dressCodeList.map((dressCode, index) => (
            <View
              key={index}
              row={dressCode.dressType.length <= 40}
              marginBottom={8}
              flex>
              <Typography flex variant="p2" color="default10">
                {dressCode.program}
              </Typography>
              <Typography variant="p2" color="default10" semibold marginTop={4}>
                {dressCode.dressType}
              </Typography>
            </View>
          ))}
        </View>
      </View>

      {isAccommodationActivity && (
        <Button onPress={handleGoToHotel}>
          <View
            borderWidth={1}
            borderColor="default4"
            useShadow
            padding={16}
            borderRadius={16}
            marginTop={16}
            row>
            <Typography flex variant="s3" color="primary6" semibold>
              Otel Hakkında
            </Typography>
            <Image name="rightArrow" width={24} height={24} />
          </View>
        </Button>
      )}

      <EmergencyEvacuationPlan
        emergencyTitle={emergencyTitle}
        emergencyDescription={emergencyDescription}
        emergencyButtonText={emergencyButtonText}
        emergencyMedia={emergencyMedia}
      />

      <View.InfoWrapper
        marginTop={16}
        text="Etkinlik ve uygulama hakkında destek almak için Önemli Bilgiler altındaki iletişim adreslerimizden bize ulaşabilirsin."
      />

      {/* <View useShadow padding={16} borderRadius={16} marginTop={16}>
        <Typography variant="s3" color="primary6" semibold>
          Sıkça Sorulan Sorular
        </Typography>
        <View>
          <SSS activityGuid={activityGuid} />
        </View>
      </View> */}
    </View>
  );
};

export default UseFullInformation;

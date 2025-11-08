import React, {useCallback, useEffect, useState} from 'react';
import {Button, EmptyList, Tab, Typography, View} from '../../';
import {ActivitiesService} from '../../../services';
import {RoutesNames, errorHandler, format, useNavigation} from '../../../utils';

const ForProgram = ({activityGuid}) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [programGroup, setProgramGroup] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        await getProgramDetail();

        setLoading(false);
      } catch (error) {
        errorHandler(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [getProgramDetail]);

  const getProgramDetail = useCallback(async () => {
    const {data, isSuccessful} = await ActivitiesService.getProgramDetail(
      activityGuid,
    );

    if (isSuccessful) {
      setList(data);
      setProgramGroup(
        data.map(item => ({title: item.dateGroup.replace(/-/g, '.')})),
      );
      if (data.length > 0) {
        setSelectedTab(0);
      }
    }
  }, [activityGuid]);

  const handleRedirectProgramDetail = item => {
    navigation.navigate(RoutesNames.ProgramDetail, {
      header: {
        title: item.title,
        subTitle: item.text,
      },
      content: {
        title: item.title,
        location: item.text,
        date: item.date,
        description: item.detail,
      },
    });
  };

  return (
    <View loading={loading} loadingHeight={90}>
      <View marginTop={12} />
      {list.length > 1 && (
        <Tab
          paddingLeft={0}
          paddingRight={16}
          maxHeight={50}
          selectedTab={selectedTab}
          tabs={programGroup}
          renderItem={(tab, index) => (
            <Button onPress={() => setSelectedTab(index)}>
              <View
                key={index}
                marginRight={16}
                borderWidth={1}
                bgColor={selectedTab === index ? 'neutral2' : 'primary1'}
                borderColor={selectedTab === index ? 'primary6' : 'primary1'}
                borderRadius={8}
                padding={6}>
                <Typography variant="s4" color="neutral1" semibold>
                  {tab.title}
                </Typography>
              </View>
            </Button>
          )}
          onChange={index => setSelectedTab(index)}
        />
      )}

      {list.length > 0 &&
        list[selectedTab].programDetailModelDto.map(
          (programDetailItem, index) => (
            <View
              key={index}
              useShadow
              padding={12}
              marginTop={16}
              borderRadius={8}>
              <Button
              // onPress={() => handleRedirectProgramDetail(programDetailItem)}
              >
                <View row between>
                  <Typography variant="s3" color="primary6" semibold>
                    {/* {format.truncateText(programDetailItem.title, 60)} */}
                    {programDetailItem.title}
                  </Typography>
                  {/* <Image name="rightArrow" /> */}
                </View>
                <View
                  marginTop={16}
                  ifCond={!programDetailItem.text && !programDetailItem.detail}>
                  <Typography variant="p2" color="default10">
                    {/* {format.truncateText(programDetailItem.text, 100)} */}
                    {programDetailItem.text}
                  </Typography>
                  <Typography
                    variant="p2"
                    color="default10"
                    marginTop={4}
                    htmlContent={format.truncateText(
                      programDetailItem.detail,
                      100,
                    )}>
                    {format.truncateText(programDetailItem.detail, 100)}
                  </Typography>
                </View>
              </Button>
            </View>
          ),
        )}

      <View ifCond={list.length !== 0} marginTop={32}>
        <EmptyList
          text={'Program bilgisi yakında paylaşılacaktır.'}
          subtext={
            'Etkinlik programı yayınlandığında buradan takip edebilirsin.'
          }
          icon={'emptyNotification'}
        />
      </View>
      <View.InfoWrapper
        ifCond={list.length === 0}
        marginTop={16}
        text="Etkinlik ve uygulama hakkında destek almak için Önemli Bilgiler altındaki iletişim adreslerimizden bize ulaşabilirsin."
      />
    </View>
  );
};

export default ForProgram;

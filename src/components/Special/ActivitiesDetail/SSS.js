import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Typography,
  Button,
  Image,
  TextInput,
  Form,
  EmptyList,
} from '../../../components';
import {ActivitiesService} from '../../../services';
import {errorHandler, useForm} from '../../../utils';
import colors from '../../../utils/colors';
import {width} from '../../../utils/dimensionsHelper';

const SssItem = ({title, description, isOpened, onToggle, searchText}) => {
  return (
    <View
      marginBottom={8}
      borderRadius={8}
      borderWidth={1}
      borderColor="default4"
      padding={16}>
      <Button onPress={onToggle}>
        <View row between alignCenter>
          <Typography.Highlight
            text={title}
            highlight={searchText}
            variant="s4"
            color="default10"
            width="90%"
          />
          <Image
            name={isOpened ? 'arrowDown' : 'arrowUp'}
            width={24}
            height={24}
          />
        </View>
      </Button>
      <View ifCond={isOpened}>
        <Typography.Highlight
          variant="s4"
          color="default10"
          marginTop={8}
          htmlContent={description}
          highlight={searchText}
        />
      </View>
    </View>
  );
};

const SSS = ({activityGuid, detailPageScrollRef}) => {
  const [loading, setLoading] = useState(false);
  const [faqListOld, setFaqListOld] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const [openedItemIndex, setOpenedItemIndex] = useState(null);
  const form = useForm();
  const searchText = form.watch('searchText', '');

  // useEffect(() => {
  //   Keyboard.addListener('keyboardDidShow', () => {
  //     // console.log('Keyboard Shown');
  //     if (detailPageScrollRef && detailPageScrollRef.current) {
  //       detailPageScrollRef.current.scrollTo({
  //         y: 320,
  //         animated: true,
  //       });
  //     }
  //   });

  //   Keyboard.addListener('keyboardDidHide', () => {
  //     // console.log('Keyboard Hidden');
  //     if (detailPageScrollRef && detailPageScrollRef.current) {
  //       detailPageScrollRef.current.scrollTo({
  //         y: 320,
  //         animated: true,
  //       });
  //     }
  //   });
  // }, [detailPageScrollRef]);

  useEffect(() => {
    form.register('searchText', {defaultValue: ''});
  }, [form]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const {data, isSuccessful} = await ActivitiesService.getFaqSection(
          activityGuid,
        );
        if (isSuccessful) {
          setFaqList(data);
          setFaqListOld(data);
        }
        setLoading(false);
      } catch (error) {
        errorHandler(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [activityGuid]);

  const handleToggleItem = index => {
    // Eğer tıklanan öğe zaten açıksa, onu kapat (null yap).
    // Değilse, tıklanan öğenin index'ini state'e ata.
    setOpenedItemIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleSearch = useCallback(
    text => {
      if (!text || text.length === 0) {
        setFaqList(faqListOld);
        setOpenedItemIndex(null);
        return;
      }
      const lowercasedText = text.toLowerCase();
      const filteredFaqs = faqListOld.filter(
        item =>
          item.activityFaqQuestion.toLowerCase().includes(lowercasedText) ||
          item.activityFaqAnswer.toLowerCase().includes(lowercasedText),
      );

      // Arama sonucunda tek eleman varsa onu aç, yoksa hepsini kapat.
      if (filteredFaqs.length >= 1) {
        setOpenedItemIndex(0);
      } else {
        setOpenedItemIndex(null);
      }
      setFaqList(filteredFaqs);
    },
    [faqListOld],
  );

  return (
    <View loading={loading} loadingHeight={90}>
      <View marginTop={16} marginBottom={16} marginLeft={-16} marginRight={-16}>
        <Form form={form}>
          <Form.Item>
            <TextInput
              // width={width - 590}
              name="searchText"
              placeholder="Ara..."
              placeholderTextColor={colors.default6}
              prefix={
                <Image
                  name="search"
                  tintColor="primary6"
                  width={20}
                  height={20}
                />
              }
              inputStyle={{
                color: colors.default10,
                borderColor: colors.default4,
              }}
              onChangeText={handleSearch}
              onFocus={() => {
                // setTimeout(() => {
                // detay sayfası scrollview referansını kullanarak en üste kaydır
                if (detailPageScrollRef && detailPageScrollRef.current) {
                  detailPageScrollRef.current.scrollTo({
                    y: 320,
                    animated: true,
                  });
                }
                // }, 0);
              }}
              returnKeyType="done"
            />
          </Form.Item>
        </Form>
      </View>
      {faqList.map((item, index) => (
        <SssItem
          key={index}
          title={item.activityFaqQuestion}
          description={item.activityFaqAnswer}
          isOpened={openedItemIndex !== index}
          onToggle={() => handleToggleItem(index)}
          searchText={searchText}
        />
      ))}
      <View.InfoWrapper
        ifCond={faqList.length === 0}
        marginTop={16}
        text="Etkinlik ve uygulama hakkında destek almak için Önemli Bilgiler altındaki iletişim adreslerimizden bize ulaşabilirsin."
      />
      {/* <EmptyList
        // ifCond={faqList.length >= 0}
        icon="emptyActivity"
        text="Arama kriterine uygun SSS bulunamadı."
        // subtext="Senin için yeni etkinlikler hazırlandığında burada görebileceksin."
      /> */}
    </View>
  );
};
export default SSS;

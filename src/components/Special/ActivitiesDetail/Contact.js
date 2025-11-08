import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Linking} from 'react-native';
import {View, Button, Typography} from '../../../components';
import {ActivitiesService} from '../../../services';
import {errorHandler} from '../../../utils';

const ContactCard = ({loading, contactItem = {}}) => {
  const openEmailApp = async () => {
    const email = contactItem.activityContactInformationDetailText;

    const url = `mailto:${email}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url).catch(err =>
        console.error('Error opening email app:', err),
      );
    }
  };

  const checkMailControl = useMemo(() => {
    const mailControlRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return mailControlRegex.test(contactItem.activityContactInformationText);
  }, [contactItem]);

  return (
    <View
      borderWidth={1}
      borderColor="default4"
      useShadow
      padding={16}
      borderRadius={16}
      marginTop={16}>
      <Typography
        ifCond={!contactItem?.activityContactInformationSectionTitle}
        variant="s3"
        color="primary6"
        semibold>
        {contactItem?.activityContactInformationSectionTitle}
      </Typography>
      <View loading={loading} loadingHeight={90} paddingTop={16}>
        <View start>
          <Typography
            ifCond={!contactItem?.activityContactInformationTitle}
            flex
            variant="p2"
            marginBottom={4}
            semibold>
            {contactItem?.activityContactInformationTitle}
          </Typography>

          <Typography
            ifCond={!contactItem?.activityContactInformationText}
            alignCenter
            variant="p2"
            semibold>
            {contactItem?.activityContactInformationText}
          </Typography>
        </View>

        {/* <View row evenly marginTop={checkMailControl ? 16 : 0}>
          <View flex ifCond={!checkMailControl}>
            <Button onPress={openEmailApp} disabled={!checkMailControl}>
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
                <Typography
                  variant="s3"
                  color="primary6"
                  align="center"
                  semibold>
                  E-posta Gönder
                </Typography>
              </View>
            </Button>
          </View>
        </View> */}
      </View>
    </View>
  );
};

const Contact = ({activityGuid}) => {
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        await getContact();
        setLoading(false);
      } catch (error) {
        errorHandler(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [getContact]);

  const getContact = useCallback(async () => {
    const {data, isSuccessful} = await ActivitiesService.getContactSelection(
      activityGuid,
    );

    if (isSuccessful) {
      setContact(data);
    }
  }, [activityGuid]);

  return (
    <>
      {contact.map((contactItem, index) => (
        <ContactCard key={index} loading={loading} contactItem={contactItem} />
      ))}
    </>
  );
};

export default Contact;

import Contact from './Contact';
import Photier from './Photier';
import View from '../../View';

const ActivityFinished = ({navigateParams}) => {
  return (
    <View flex margin={16}>
      <Photier
        visible={navigateParams.isPhotierModalVisible}
        title={navigateParams.photierTitle}
        description={navigateParams.photierDescription}
        link={navigateParams.photierLink}
      />
      <Contact activityGuid={navigateParams.activity.activityGuid} />
    </View>
  );
};

export default ActivityFinished;

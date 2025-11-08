import {Platform} from 'react-native';
import {ScaledSheet} from './../../utils';

const useStyle = (token = {}) => {
  // const tokens = Object.assign(themeToken, token);
  const styles = ScaledSheet.create({
    container: {
      marginBottom: -2,
      borderBottomWidth: 1,
    },
    containerWrapper: {
      // borderBottomWidth: 2,
      borderBottomWidth: Platform.OS === 'ios' ? 0 : 2,
      borderBottomColor: '#D8E0ED',
      marginBottom: 4,
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

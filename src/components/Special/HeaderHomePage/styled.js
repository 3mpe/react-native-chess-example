import {ScaledSheet} from '../../../utils';

const useStyle = (token = {}) => {
  // const tokens = Object.assign(themeToken, token);

  const styles = ScaledSheet.create({
    imageContainer: {},
    image: {
      width: '80@vs',
      height: '80@vs',
      borderRadius: '50@vs',
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

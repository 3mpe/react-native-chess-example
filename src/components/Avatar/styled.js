import {ScaledSheet, themeToken} from '../../utils';

const useStyle = (token = {}) => {
  const tokens = Object.assign(themeToken, token);

  const styles = ScaledSheet.create({
    imageContainer: {
      position: 'relative',
      borderWidth: '1@vs',
      borderColor: tokens.colors.default4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: tokens.colors.primary2,
    },
    image: {},
    editImageContainer: {
      position: 'absolute',
      right: -6,
      top: 0,
      backgroundColor: tokens.colors.primary6,
      borderRadius: '50@ms',
      padding: '4@ms',
      zIndex: 99,
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

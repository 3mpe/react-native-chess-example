import {ScaledSheet, themeToken} from '../../utils';

const useStyle = (token = {}) => {
  const tokens = Object.assign(themeToken, token);
  const styles = ScaledSheet.create({
    container: {
      flex: 1,
    },
    floatButton: {
      position: 'absolute',
      bottom: '16@s',
      right: '16@s',
      width: '40@s',
      height: '40@s',
      borderRadius: '28@s',
      backgroundColor: tokens.colors.secondary6,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: tokens.colors.default1,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      zIndex: 1,
    },
    disabledButton: {
      opacity: 0.5,
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

import {ScaledSheet, themeToken} from '../../utils';

const useStyle = (token = {}) => {
  const tokens = Object.assign(themeToken, token);
  const styles = ScaledSheet.create({
    container: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: tokens.colors.default4,
      shadowColor: tokens.colors.neutral1,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 3, // Android için
      backgroundColor: tokens.colors.neutral2, // Gölgenin görünmesi için arka plan rengi belirtmek gerekebilir
    },
    headerWrapper: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      backgroundColor: tokens.colors.surface1,
      margin: 0,
    },
    qrWrapper: {
      backgroundColor: tokens.colors.neutral2,
    },
    closeIcon: {
      position: 'absolute',
      right: 16,
      top: 16,
      zIndex: 9,
    },

    cardShadow: {
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 3, // Android için gölge
      borderRadius: 16,
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

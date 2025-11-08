import {ScaledSheet, themeToken} from '../../utils';

const useStyle = (token = {}) => {
  const tokens = Object.assign(themeToken, token);
  const styles = ScaledSheet.create({
    container: {
      position: 'relative',
      height: '40@s',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: tokens.colors.neutral2,
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: tokens.colors.default7,
      marginLeft: '16@s',
      marginRight: '16@s',
      paddingLeft: '10@s',
      paddingRight: '10@s',
    },
    prefixIcon: {
      tintColor: tokens.colors.neutral2,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: tokens.colors.neutral2,
      padding: 8,
      objectFit: 'contain',
      width: '100%',
      height: '100%',
    },
    surfixIcon: {
      tintColor: tokens.colors.neutral2,
      objectFit: 'contain',
      width: '100%',
      height: '100%',
    },
    input: {
      flex: 1,
      height: '100%',
      // color: tokens.colors.neutral2,
      fontSize: tokens.typography.p3.fontSize,
      fontFamily: tokens.typography.p3.fontFamily,
      textAlignVertical: 'center', // Çok satırlı girişler için metni üstte hizalar

      backgroundColor: 'transparent', // Arka plan rengini transparan yapar
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

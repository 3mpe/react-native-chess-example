import {ScaledSheet, themeToken} from '../../utils';

const useStyle = (token = {}) => {
  const tokens = Object.assign(themeToken, token);
  const styles = ScaledSheet.create({
    container: {
      height: '44@s',
      justifyContent: 'center',
      alignContent: 'center',
      // paddingVertical: '16@s',
      paddingHorizontal: '10@s',
      marginVertical: '10@s',
      marginHorizontal: '16@s',
      borderColor: '#D8E0ED',
      borderRadius: 10,
      borderWidth: 1,
      marginBottom: 0,
      color: '#000',
      backgroundColor: '#fff',
    },
    dropdown: {},
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

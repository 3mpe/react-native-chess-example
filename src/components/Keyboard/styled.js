import {ScaledSheet} from '../../utils';

const useStyle = (token = {}) => {
  // const tokens = Object.assign(themeToken, token);
  const styles = ScaledSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContainer: {
      flexGrow: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    footerContainer: {
      flexGrow: 0,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

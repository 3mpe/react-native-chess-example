import {ScaledSheet} from '../../../utils';

const useStyle = (token = {}) => {
  // const tokens = Object.assign(themeToken, token);

  const styles = ScaledSheet.create({
    detailBoard: {
      imageContainer: {
        width: '40@s',
        height: '40@s',
        borderRadius: '20@s',
        // backgroundColor: 'primary6',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

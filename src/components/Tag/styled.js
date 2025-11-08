import {ScaledSheet, themeToken} from '../../utils';

const useStyle = (token = {}) => {
  const tokens = Object.assign(themeToken, token);
  const styles = ScaledSheet.create({
    container: {
      backgroundColor: tokens.colors.primary1,
      borderRadius: tokens.tag.borderRadius,
    },
    text: {
      color: tokens.colors.primary7,
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

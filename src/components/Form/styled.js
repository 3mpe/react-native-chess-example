import {ScaledSheet, themeToken} from '../../utils';

const useFormStyle = (token = {}) => {
  const tokens = Object.assign(themeToken, token);
  const styles = ScaledSheet.create({
    error: {
      color: tokens.colors.danger6,
    },
    inputError: {
      borderWidth: 1,
      borderColor: tokens.colors.danger6,
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useFormStyle;

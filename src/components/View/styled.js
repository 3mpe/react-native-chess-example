import {ScaledSheet, themeToken} from '../../utils';

const useStyle = (token = {}) => {
  const tokens = Object.assign(themeToken, token);
  const styles = ScaledSheet.create({
    base: {
      ...tokens.view.base,
    },
    flex: {
      ...tokens.view.flex,
    },
    center: {
      ...tokens.view.center,
    },
    alignCenter: {
      ...tokens.view.alignCenter,
    },
    loadingStyle: {
      justifyContent: 'center',
      alignContent: 'center',
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

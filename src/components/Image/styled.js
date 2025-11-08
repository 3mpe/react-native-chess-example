import {ScaledSheet, themeToken} from '../../utils';

const useStyle = (token = {}) => {
  const tokens = Object.assign(themeToken, token);
  const styles = ScaledSheet.create({
    imageContainer: {
      ...tokens.header.imageContainer.container,
    },
    loader: {
      ...tokens.header.imageContainer.loader,
    },
    error: {
      ...tokens.header.imageContainer.error,
    },
    image: {
      ...tokens.header.imageContainer.image,
    },
  });

  return styles;
};

// Bir hook kullanımı olacak şekilde beslenmesi için çağırıldı.
// genel bir thema tokken üzerinden okuma işlemi yapacak şekilde düzeltilmesi gerekecek.
export default useStyle;

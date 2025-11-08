import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
// import API from '../services/api';

const images = {
  error: '',
  notfound: '',
};

const checkImageUrl = (url = '') => {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve({ isError: true, isImageExist: false });
    }

    // API.get(url)
    //   .then(blob => {
    //     const contentType = blob.type;
    //     if (!contentType.startsWith('image/')) {
    //       resolve({ isError: true, isImageExist: false });
    //     }
    //   })
    //   .catch(error => {
    //     resolve({ isError: true, isImageExist: false });
    //   });

    // Image.getSize(
    //   url,
    //   w => {
    //     // Eğer image yuklenmesi sırasında bir hata yoksa ve yüklenmesi bekleniyorsa
    //     const isError = false;
    //     const isImageExist = w > 0;
    //     resolve({isError, isImageExist});
    //   },
    //   () => {
    //     // eğer hata varsa loading bittiğini anlaması için 2. parametreyi gönder
    //     resolve({isError: true, isImageExist: false});
    //   },
    // );
  });
};

/**
 * Verilen Base64 verisini cihazın önbelleğinde geçici bir resim dosyası olarak kaydeder.
 * @param {string} base64Data - 'data:image/png;base64,' kısmı olmayan ham base64 string'i.
 * @returns {Promise<string>} Kaydedilen dosyanın URI'si (örn: 'file:///...')
 */
export const saveBase64AsImageFile = async base64Data => {
  if (!base64Data) {
    return null;
  }

  // Benzersiz bir dosya adı oluştur
  const fileName = new Date().getTime() + '.png';
  const filePath = `${RNFS.CachesDirectoryPath}/${fileName}`;

  try {
    // Base64 verisini dosyaya yaz. 'base64' parametresi verinin formatını belirtir.
    await RNFS.writeFile(filePath, base64Data, 'base64');

    // iOS için 'file://' prefix'i gerekebilir, platforma göre kontrol edelim.
    return Platform.OS === 'ios' ? `file://${filePath}` : filePath;
  } catch (error) {
    console.error('Error saving Base64 as image file:', error);
    return null;
  }
};

export { checkImageUrl };
export default images;

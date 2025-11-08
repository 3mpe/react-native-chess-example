export const errorHandler = async error => {
  console.error(
    'Hata Oluştu (DEBUG MODE)',
    'Bir hata oluştu. Lütfen tekrar deneyiniz. --- ',
    error,
  );
};

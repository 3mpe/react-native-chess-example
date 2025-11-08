export function formatPhoneNumber(phoneNumber) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  const match = cleaned.match(/^(\d{1,3})(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }

  return phoneNumber;
}

export const getFirstName = data => {
  const fullName = data?.fullName || '';
  // String'i boşluklardan bölerek bir dizi oluşturur.
  const nameParts = fullName.split(' ');

  // Dizinin son elemanı (soyadı) hariç tüm elemanları seçer.
  const firstNames = nameParts.slice(0, -1);

  // Seçilen isimleri tekrar boşlukla birleştirerek tek bir string haline getirir.
  return firstNames.join(' ');
};

export const getLastName = data => {
  const fullName = data?.fullName || '';

  // String'i boşluklardan ayırıp oluşan dizinin son elemanını al.
  const lastName = fullName.split(' ').pop();

  return lastName;
};

const truncateText = (text, limit) => {
  if (!text) return null;

  if (text.length <= limit) {
    return text;
  }
  return text.substring(0, limit) + '...';
};

export const isNullOrUndefined = value => {
  return value === null || value === undefined;
};

export default {
  formatPhoneNumber,
  getFirstName,
  getLastName,
  isNullOrUndefined,
  truncateText,
};

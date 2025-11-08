import moment from 'moment';
const formatList = [
  'DD.MM.YYYY HH:mm',
  'DD.MM.YYYY',
  moment.ISO_8601,
  'YYYY-MM-DD HH:mm:ss',
  'YYYY-MM-DD',
];

export const calculateTimeDifference = (departureTime, arrivalTime) => {
  const departure = moment(departureTime, formatList, true);
  const arrival = moment(arrivalTime, formatList, true);

  if (
    !departure.isValid() ||
    !arrival.isValid() ||
    arrival.isBefore(departure)
  ) {
    return 'Belirsiz';
  }

  const duration = moment.duration(arrival.diff(departure));

  if (duration.asMinutes() === 0) {
    return '0 dakika';
  }

  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  const parts = [];
  if (hours > 0) {
    parts.push(`${hours} saat`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} dakika`);
  }

  return parts.join(' ');
};

export const dateFormat = (dateString, format = 'DD.MM.YYYY') => {
  const date = moment(dateString, formatList, true);

  if (!date.isValid()) {
    return '';
  }

  return date.format(format);
};
export const nowDate = (format = 'YYYY-MM-DD HH:mm:ss') => {
  const date = new Date();
  return dateFormat(date.toISOString(), format);
};

export const nowDateExtendedWithDay = (
  day = 0,
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  const date = new Date();
  date.setDate(date.getDate() + day);
  return dateFormat(date.toISOString(), format);
};

export const isBirthdayToday = birthday => {
  if (!birthday) return false;

  const birthDate = moment(birthday, formatList, true);
  if (!birthDate.isValid()) return false;
  const today = moment();

  return (
    birthDate.date() === today.date() && birthDate.month() === today.month()
  );
};

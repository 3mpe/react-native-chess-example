import {I18n} from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import tr from './tr.json';

// // Dil dosyaları
const translations = {
  'en-US': en,
  'en-GB': en,
  'tr-TR': tr,
  tr: tr,
};
const i18n = new I18n(translations);
i18n.defaultLocale = 'tr';

// Cihazın dil ayarını al
const locales = RNLocalize.getLocales();

if (Array.isArray(locales) && locales.length > 0) {
  i18n.locale = locales[0].languageTag;
} else {
  i18n.locale = 'tr';
}

export default i18n;

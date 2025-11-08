import API from './api';
import URLS from './URLS';

const GlobalSettingsService = {
  getGlobalSettings: async () => {
    const url =
      'https://www.etkinlikmobile.yapikredi.com.tr/YKBActivityMobileApi/media/YKBEvent/release/globalSettings.json';
    // Önbelleğe takılmayı önlemek için URL'in sonuna zaman damgası ekliyoruz.
    const cacheBustingUrl = `${url}?_=${new Date().getTime()}`;

    return await API.axios()
      .get(cacheBustingUrl)
      .then(response => response.data);
  },
};

export default GlobalSettingsService;

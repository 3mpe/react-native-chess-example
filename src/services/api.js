// api.js
import axiosService from 'axios';
// import https from 'https';
import {Alert} from 'react-native';
import URLS from './URLS';
import {
  EnvConfig,
  getCurrentRouteName,
  navigateRest,
  NetInfo,
  RoutesNames,
  Storage,
} from '../utils';
import MockService from './_mock.service';

// const BASE_URL = 'https://test.etkinlikmobile.yapikredi.com.tr/api';
// const BASE_URL = 'https://www.etkinlikmobile.yapikredi.com.tr/api';
const BASE_URL = EnvConfig.API_URL;
const API_KEY = EnvConfig.API_KEY;

// https.globalAgent.options.rejectUnauthorized = false;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const refreshToken = async () => {
  const accessToken = await Storage.getStorageValue(Storage.keys.TOKEN);
  const token = await Storage.getStorageValue(Storage.keys.REFRESH_TOKEN);
  const endpoint = URLS.AUTH.REFRESH_TOKEN;
  return await API.post(endpoint, {
    accessToken,
    refreshToken: token,
  });
};

const getIpAddress = async () => {
  // Bu fonksiyon, cihazın IP adresini almak için kullanılır.
  // Ancak, React Native ortamında doğrudan IP adresini almak zor olabilir.
  // Bu nedenle, bu fonksiyonun içeriği uygulamanın ihtiyaçlarına göre uyarlanmalıdır.

  const netInfoState = await NetInfo.fetch();
  if (netInfoState.details.ipAddress) {
    return netInfoState.details.ipAddress;
  }

  return null;
};

const redirectToLogin = async () => {
  const isMock = await MockService.isMock();
  if (isMock) return;
  // Alert.alert('Oturumunuzun süresi dolmuştur. Lütfen tekrar giriş yapınız.');
  await Storage.clearStorage();

  getCurrentRouteName() !== RoutesNames.Login &&
    navigateRest(RoutesNames.Login);
};

// Axios instance oluşturma
const axios = axiosService.create();

// // Tüm isteklere header ekleme
// axios.defaults.headers.common['FN-API-KEY'] = process.env.API_KEY;

// Request interceptor ekleme
axios.interceptors.request.use(
  async config => {
    // if (config.method.toLowerCase() !== 'get') {
    // Her isteğe header ekle

    // config.httpAgent
    //   config.headers['Content-Type'] = 'application/json';
    config.headers['FN-API-KEY'] = API_KEY;
    if (!config.url.includes('login'))
      config.headers.Authorization = `Bearer ${await Storage.getStorageValue(
        Storage.keys.TOKEN,
      )}`;

    const ipAddress = await getIpAddress();
    config.headers.userIpAddress = ipAddress;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor ekleme
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // require cycles are alowed, but can result in uninitialeed values. consider factoring to remove the need for a cycle (import cycle)
        // Yukarıdaki Uyarının çözümü için: import AuthService from './_auth.service'; eklemesi kaldırıldı.
        const tokenReq = await refreshToken();

        axios.defaults.headers.common.Authorization = `Bearer ${tokenReq.data?.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${tokenReq.data?.accessToken}`;

        const request = await axios(originalRequest);

        await Storage.setStorageValue(
          Storage.keys.TOKEN,
          tokenReq.data?.accessToken,
        );
        await Storage.setStorageValue(
          Storage.keys.REFRESH_TOKEN,
          tokenReq.data?.refreshToken,
        );

        if (!tokenReq.isSuccessful) {
          redirectToLogin();
          return Promise.reject(tokenReq);
        }

        return Promise.resolve(request);
      } catch (err) {
        if (!err.isSuccessful) {
          redirectToLogin();
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

const API = {
  get: async (endpoint, params) => {
    // const BASE_URL = await Storage.getStorageValue(Storage.keys.BASE_URL);
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {params});
      console.warn(
        `GET request to: ${BASE_URL}${endpoint}`,
        endpoint,
        params,
        response,
      );
      return response.data;
    } catch (error) {
      console.warn(`GET request to: ${BASE_URL}${endpoint}`, endpoint, params);
      console.error('GET request failed:', error);
      throw error;
    }
  },

  post: async (endpoint, data, options) => {
    // const BASE_URL = await Storage.getStorageValue(Storage.keys.BASE_URL);
    try {
      const response = await axios.post(
        `${BASE_URL}${endpoint}`,
        data,
        options,
      );
      console.warn(
        `POST request to: ${BASE_URL}${endpoint} with data:`,
        endpoint,
        data,
        options,
        response,
      );
      return response.data;
    } catch (error) {
      console.warn(`POST request to: ${BASE_URL}${endpoint}`);
      console.error('POST request failed:', error);
      throw error;
    }
  },

  put: async (endpoint, data) => {
    // const BASE_URL = await Storage.getStorageValue(Storage.keys.BASE_URL);
    try {
      const response = await axios.put(`${BASE_URL}${endpoint}`, data);
      console.warn(
        `PUT request to: ${BASE_URL}${endpoint} with data:`,
        endpoint,
        data,
        response,
      );
      return response.data;
    } catch (error) {
      console.warn(`PUT request to: ${BASE_URL}${endpoint}`);
      console.error('PUT request failed:', error);
      throw error;
    }
  },

  delete: async (endpoint, data) => {
    // const BASE_URL = await Storage.getStorageValue(Storage.keys.BASE_URL);
    try {
      const response = await axios.delete(`${BASE_URL}${endpoint}`);
      console.warn(
        `DELETE request to: ${BASE_URL}${endpoint}`,
        endpoint,
        data,
        response,
      );
      return response.data;
    } catch (error) {
      console.warn(`DELETE request to: ${BASE_URL}${endpoint}`);
      console.error('DELETE request failed:', error);
      throw error;
    }
  },

  axios: () => {
    return axios;
  },
};

export default API;

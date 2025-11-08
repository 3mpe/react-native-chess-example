import {getCurrentRouteName, navigateRest, RoutesNames} from '../utils';
import MockService from './_mock.service';
import API from './api';
import URLS from './URLS';
import storage from '../utils/storage';

const AuthService = {
  login: async (data = {}) => {
    try {
      const isMock = await MockService.isMock(data);
      if (isMock) {
        return MockService.login(data);
      }

      console.warn('AUTH SERVICE LOGIN DATA', data);
      const endpoint = URLS.AUTH.LOGIN;
      return await API.post(endpoint, data);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const endpoint = URLS.AUTH.LOGOUT;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to logout:', error);

      await storage.clearStorage();
      getCurrentRouteName() !== RoutesNames.Login &&
        navigateRest(RoutesNames.Login);
      throw error;
    }
  },
  refreshToken: async (data = {accessToken: '', refreshToken: ''}) => {
    try {
      const endpoint = URLS.AUTH.REFRESH_TOKEN;
      return await API.post(endpoint, data);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  },
};

export default AuthService;

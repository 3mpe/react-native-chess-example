import MockService from './_mock.service';
import API from './api';
import URLS from './URLS';

const ConsentsService = {
  getConsents: async () => {
    try {
      const isMock = await MockService.isMock();
      if (isMock) return MockService.getConsents();

      const endpoint = URLS.CONSENTS.GET_CONSENTS;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  agreementConsents: async (requestConsents = []) => {
    try {
      if (await MockService.isMock())
        return Promise.resolve({isSuccessful: true});
      const endpoint = URLS.CONSENTS.AGREEMENT_CONSENTS;
      return await API.post(endpoint, {requestConsents});
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  },
};

export default ConsentsService;

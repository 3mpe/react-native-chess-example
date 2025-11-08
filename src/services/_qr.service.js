import MockService from './_mock.service';
import API from './api';
import URLS from './URLS';

const QRService = {
  getList: async () => {
    try {
      const isMock = await MockService.isMock();
      if (isMock) return Promise.resolve({data: []});

      const endpoint = URLS.QR.GET_LIST;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  getDetail: async activityGuid => {
    if (!activityGuid) {
      throw new Error('activityGuid is required');
    }
    try {
      const endpoint = URLS.QR.GET_DETAIL + activityGuid;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
};

export default QRService;

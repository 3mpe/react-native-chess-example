import API from './api';
import URLS from './URLS';

const IdentityService = {
  upload: async identity => {
    if (!identity) {
      throw new Error('identity is required');
    }

    try {
      const endpoint = URLS.IDDENTITY.UPLOAD;
      return await API.post(endpoint, {
        identity,
      });
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
};

export default IdentityService;

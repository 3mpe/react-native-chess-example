import MockService from './_mock.service';
import API from './api';
import URLS from './URLS';

const UserService = {
  updateDeviceToken: async (deviceToken = null) => {
    try {
      const isMock = await MockService.isMock();
      if (isMock) return Promise.resolve();

      const endpoint = URLS.USER.UPDATE_DEVICE_TOKEN;
      return await API.post(endpoint, {deviceToken});
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  profile: async () => {
    try {
      const isMock = await MockService.isMock();
      if (isMock) return MockService.getUserProfile();

      const endpoint = URLS.USER.PROFILE;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  updateAvatar: async form => {
    try {
      const isMock = await MockService.isMock();
      if (isMock) return Promise.resolve({isSuccessful: true});

      const endpoint = URLS.USER.UPDATE_AVATAR;
      return await API.post(endpoint, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Failed to update avatar:', error);
      throw error;
    }
  },
  getIdentityImage: async () => {
    try {
      const endpoint = URLS.USER.IDENTITY_IMAGES;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get identity image:', error);
      throw error;
    }
  },

  getEmergencyContacts: () => API.get(URLS.USER.GET_EMERGENCY_CONTACTS),
  updateEmergencyContact: (fullName, phoneNumber) =>
    API.post(URLS.USER.ADD_OR_UPDATE_EMERGENCY_CONTACT, {
      fullName,
      phoneNumber,
    }),
};

export default UserService;

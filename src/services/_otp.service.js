import MockService from './_mock.service';
import API from './api';
import URLS from './URLS';

const OtpService = {
  check: async ({otpPassword, smsRefId}) => {
    try {
      const isMock = await MockService.isMock();
      if (isMock && otpPassword === '0000')
        return Promise.resolve({isSuccessful: true});

      const endpoint = URLS.OTP.CHECK;
      return await API.post(endpoint, {
        otpPassword,
        smsRefId,
      });
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  resend: async ({smsRefId, phoneNumber}) => {
    try {
      if (await MockService.isMock()) return Promise.resolve();

      const endpoint = URLS.OTP.RE_SEND;

      return await API.post(endpoint, {
        smsRefId,
        phoneNumber,
      });
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
};

export default OtpService;

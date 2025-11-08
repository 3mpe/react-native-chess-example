import API from './api';
import URLS from './URLS';

const RoommateService = {
  getRequestList: async activityGuid => {
    try {
      const endpoint = URLS.ROOMMATE.GET_REQUEST_LIST + `${activityGuid}`;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  getEventRoommate: async activityGuid => {
    if (!activityGuid) {
      throw new Error('activityGuid is required');
    }

    try {
      const endpoint = URLS.ROOMMATE.GET_EVENT_ROOMMATE + `${activityGuid}`;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  sendRequest: async (activityGuid, roommateUserGuid) => {
    if (!activityGuid) {
      throw new Error('roomId is required');
    }

    if (!roommateUserGuid) {
      throw new Error('roommateUserGuid is required');
    }

    try {
      const endpoint =
        URLS.ROOMMATE.SEND_REQUEST + `${activityGuid}/${roommateUserGuid}`;
      return await API.post(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  responseRequest: async (activityGuid, roommateUserGuid, isAccepted) => {
    if (!activityGuid) {
      throw new Error('roomId is required');
    }

    if (!roommateUserGuid) {
      throw new Error('roommateUserGuid is required');
    }

    if (isAccepted === undefined) {
      throw new Error('isAccepted is required');
    }

    try {
      const endpoint =
        URLS.ROOMMATE.RESPONSE_REQUEST +
        `${activityGuid}/${roommateUserGuid}?isAccepted=${isAccepted}`;
      return await API.post(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
};

export default RoommateService;

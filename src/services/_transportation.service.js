import API from './api';
import URLS from './URLS';

export const TransportationType = {
  CAR: 'car',
  FLIGHT: 'plane',
  OTHER: 'other',
};

const TransportationService = {
  getCities: async (activityGuid, transportType) => {
    try {
      const endpoint =
        URLS.TRANSPORTATION.GET_CITIES +
        `?activityGuid=${activityGuid}&transportType=${transportType}`;

      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get cities:', error);
      throw error;
    }
  },
  getUserCarDetail: async activityGuid => {
    try {
      const endpoint =
        URLS.TRANSPORTATION.GET_USER_CAR_DETAIL +
        `?activityGuid=${activityGuid}`;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get getUserCarDetail:', error);
      throw error;
    }
  },

  carTransportationPrefer: async data => {
    try {
      const endpoint = URLS.TRANSPORTATION.CAR_TRANSPORTATION_PREFER;
      return await API.post(endpoint, data);
    } catch (error) {
      console.error('Failed to get carTransportationPrefer:', error);
      throw error;
    }
  },

  getPlaneDetail: async activityGuid => {
    try {
      const endpoint = URLS.TRANSPORTATION.GET_USER_PLANE_DETAIL;
      return await API.get(endpoint, {
        activityGuid,
      });
    } catch (error) {
      console.error('Failed to get getPlaneDetail:', error);
      throw error;
    }
  },
  getPlaneSchedule: async (activityGuid, cityId) => {
    try {
      const endpoint = URLS.TRANSPORTATION.GET_USER_PLANE_SCHEDULE;
      return await API.get(endpoint, {activityGuid, cityId});
    } catch (error) {
      console.error('Failed to get getPlaneSchedule:', error);
      throw error;
    }
  },
  plainPrefer: async ({activityGuid, departurePlaneGuid, returnPlaneGuid}) => {
    try {
      const endpoint = URLS.TRANSPORTATION.PLANE_TRANSPORTATION_PREFER;
      return await API.post(endpoint, {
        activityGuid,
        departurePlaneGuid,
        returnPlaneGuid,
      });
    } catch (error) {
      console.error('Failed to get plainPrefer:', error);
      throw error;
    }
  },

  getOtherDetail: async activityGuid => {
    try {
      const endpoint =
        URLS.TRANSPORTATION.GET_OTHER_TRANSPORTATION_DETAIL +
        `?activityGuid=${activityGuid}`;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get getBusDetail:', error);
      throw error;
    }
  },
  getBusDetail: async activityGuid => {
    try {
      const endpoint =
        URLS.TRANSPORTATION.GET_USER_BUS_DETAIL +
        `?activityGuid=${activityGuid}`;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get getBusDetail:', error);
      throw error;
    }
  },
  getBusSchedule: async (activityGuid, cityId) => {
    try {
      const endpoint = URLS.TRANSPORTATION.GET_USER_BUS_SCHEDULE;
      return await API.get(endpoint, {activityGuid, cityId});
    } catch (error) {
      console.error('Failed to get getBusSchedule:', error);
      throw error;
    }
  },
  busPrefer: async ({activityGuid, departureBusGuid, returnBusGuid}) => {
    try {
      const endpoint = URLS.TRANSPORTATION.BUS_TRANSPORTATION_PREFER;
      return await API.post(endpoint, {
        activityGuid,
        departureBusGuid,
        returnBusGuid,
      });
    } catch (error) {
      console.error('Failed to get busPrefer:', error);
      throw error;
    }
  },

  otherPrefer: async ({activityGuid, description}) => {
    try {
      const endpoint = URLS.TRANSPORTATION.OTHER_TRANSPORTATION_PREFER;
      return await API.post(endpoint, {
        activityGuid,
        description,
      });
    } catch (error) {
      console.error('Failed to get busPrefer:', error);
      throw error;
    }
  },

  getTransportationTypes: async activityGuid =>
    API.get(
      URLS.TRANSPORTATION.GET_ACTIVITY_TRANSPORTATION_TYPES +
        `?activityGuid=${activityGuid}`,
    ),

  getTransportationInformation: async activityGuid =>
    API.get(
      URLS.TRANSPORTATION.GET_ACTIVITY_TRANSPORTATION_INFORMATION +
        `?activityGuid=${activityGuid}`,
    ),
};

export default TransportationService;

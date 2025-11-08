import {ImageAssets, nowDateExtendedWithDay} from '../utils';
import MockService from './_mock.service';
import API from './api';
import URLS from './URLS';

export const ActivityTypes = {
  ALL: 'all',
  new: 'new', // activity Detail
  old: 'old', // activity Detail

  special: 'special',
  general: 'general',
};

export const AppliedTypes = {
  ACCEPT: 'accept',
  REJECT: 'reject',
  PENDING: 'pending',
};

export const ActivityStepStatusType = {
  TRANSPORTATION: 'transportation', // - ulaşomda
  ACCOMMODATION_ROOMMATE: 'accommodationRoommate', // - oda arkadaşı seçme =>
  TRANSFERLIST: 'transferList', // - transfer listesi
};

export const RoommateRequestStatus = {
  ACCEPT: 'Accept',
  REJECT: 'Reject',
  PENDING: 'Pending',
};

const ActivitiesService = {
  allActivities: async () => {
    try {
      const isMock = await MockService.isMock();
      if (isMock)
        return Promise.resolve({
          data: {
            items: {
              activities: [
                {
                  guid: 'mock-activity-1',
                  title: 'Kafa Dinleme Etkinliği',
                  startDate: nowDateExtendedWithDay(0, 'DD/MM/YYYY'),
                  endDate: nowDateExtendedWithDay(2, 'DD/MM/YYYY'),
                  location: 'Koç Spor Klübü',
                  isAttend: AppliedTypes.ACCEPT,
                  image:
                    'https://www.etkinlikmobile.yapikredi.com.tr/getmedia/d17aa2d4-4a6a-49cb-9886-65674aab9a74/kamp.PNG?width=357&height=327&mediaprotectionhash=310406c052f51dfde3d97e2d970498665af6788077d9f926d509a01348641ab2&ext=.png',
                },
              ],
            },
          },
          isSuccessful: true,
        });

      const endpoint = URLS.ACTIVITIES.ALL;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  activityDetail: async activityId => {
    const isMock = await MockService.isMock();
    if (isMock)
      return Promise.resolve({
        isSuccessful: true,
        data: {
          activityBeginDate: '20-08-2025',
          activityContentDescription:
            '5-6 Eylül Yalova Erikli Kamp alanında buluşuyoruz.',
          activityContentImageUrl:
            'https://www.etkinlikmobile.yapikredi.com.tr/getmedia/d17aa2d4-4a6a-49cb-9886-65674aab9a74/kamp.PNG?width=357&height=327&mediaprotectionhash=310406c052f51dfde3d97e2d970498665af6788077d9f926d509a01348641ab2&ext=.png',
          activityContentLocation: 'Yalova',
          activityContentTitle: 'Doğada kafa dinlemeye gidiyoruz',
          activityCreatedDate: '2025-08-18T15:35:17',
          activityEnabled: true,
          activityEndDate: '30-08-2025',
          activityGuid: 'a20ed4ac-c8b8-4d37-8c42-e14e969bbb00',
          activityID: 45,
          activityIsExpire: false,
          activityLastModified: '2025-08-21T10:02:56.0517202',
          activityName: 'Erikli Kamp',
          activityOrder: 0,
          activityParticipantsResponseModel: [
            {
              avatarImage: '',
              department: 'Mimari Yönetimi',
              userGUID: '07110ffd-739d-4f87-b732-694008177841',
              userName: 'Yusuf Utar',
            },
            {
              avatarImage: '',
              department: '',
              userGUID: 'f49a5cfe-8c1e-46c5-9eb2-3e7e2fb8125f',
              userName: 'Mustafa Korucu',
            },
          ],
          appliedUserCount: 3,
          complatedListIndexes: [],
          currentUserTransportation: '',
          hasIdentityDocument: true,
          isAccommodationActivity: true,
          isApplied: 'reject',
          isEventPublic: true,
          remainingDay: 9,
          roommateSelectionDescription: '',
          roommateSelectionTitle: '',
          stepStatus: [
            'transportation',
            'accommodationRoommate',
            'transferList',
          ],
          transferListSelectionDescription: '',
          transferListSelectionTitle: '',
          transportationSelectionDescription: '',
          transportationSelectionTitle: '',
          type: 'new',
        },
      });

    if (!activityId) {
      throw new Error('activityId is required');
    }

    try {
      const endpoint = URLS.ACTIVITIES.DETAIL + activityId;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  acceptActivity: async activityGuid => {
    if (!activityGuid) {
      throw new Error('activityGuid is required');
    }

    try {
      const endpoint = URLS.ACTIVITIES.ACCEPT;
      return await API.post(endpoint + activityGuid);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  rejectActivity: async (activityGuid, {description}) => {
    if (!activityGuid) {
      throw new Error('activityGuid is required');
    }

    if (!description) {
      throw new Error('description is required');
    }

    try {
      const endpoint = URLS.ACTIVITIES.REJECT;
      return await API.put(endpoint + activityGuid, {description});
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  getCurrentAppliedActivities: async () => {
    try {
      const isMock = await MockService.isMock();
      if (isMock) return Promise.resolve({data: []});

      const endpoint = URLS.ACTIVITIES.GET_CURRENT_APPLIED_ACTIVITIES;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  getPastAppliedActivities: async year => {
    try {
      const isMock = await MockService.isMock();
      if (isMock) return Promise.resolve({data: []});

      if (!year) {
        throw new Error('year is required');
      }
      const params = new URLSearchParams();
      params.append('year', year);

      const endpoint =
        URLS.ACTIVITIES.GET_PAST_APPLIED_ACTIVITIES + '?' + params.toString();

      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  getContactSelection: async activityGuid => {
    try {
      if (!activityGuid) {
        throw new Error('activityGuid is required');
      }
      const endpoint = URLS.ACTIVITIES.GET_CONTACT_SELECTION + activityGuid;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  // # Detail services
  getDressCodeListing: async activityGuid => {
    try {
      if (!activityGuid) {
        throw new Error('activityGuid is required');
      }
      const endpoint = URLS.ACTIVITIES.GET_DRESS_CODE_LISTING + activityGuid;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  getEventPraticipants: async activityGuid => {
    try {
      const isMock = await MockService.isMock();
      if (isMock) return Promise.resolve({data: []});

      if (!activityGuid) {
        throw new Error('activityGuid is required');
      }
      const endpoint = URLS.ACTIVITIES.GET_EVENT_PRATICIPANTS + activityGuid;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  getFaqSection: async activityGuid => {
    try {
      if (!activityGuid) {
        throw new Error('activityGuid is required');
      }
      const endpoint = URLS.ACTIVITIES.GET_FACT_SECTION + activityGuid;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  getHotelInformation: async activityGuid => {
    try {
      if (!activityGuid) {
        throw new Error('activityGuid is required');
      }
      const endpoint = URLS.ACTIVITIES.GET_HOTEL_INFORMATION + activityGuid;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  getProgramDetail: async activityGuid => {
    try {
      if (!activityGuid) {
        throw new Error('activityGuid is required');
      }
      const endpoint = URLS.ACTIVITIES.GET_PROGRAM_DETAIL + activityGuid;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  getTransferListing: async activityGuid => {
    try {
      if (!activityGuid) {
        throw new Error('activityGuid is required');
      }
      const endpoint = URLS.ACTIVITIES.GET_TRANSFER_LISTING + activityGuid;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  uploadIdentityImages: async (formdata, opts = {}) => {
    try {
      const endpoint = URLS.ACTIVITIES.UPLOAD_IDENTITY_IMAGES;
      const options = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...opts,
      };
      return await API.post(endpoint, formdata, options);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
  getInformationPopup: async () => {
    try {
      const endpoint = URLS.ACTIVITIES.GET_INFORMATION_POPUP;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },
};

export default ActivitiesService;

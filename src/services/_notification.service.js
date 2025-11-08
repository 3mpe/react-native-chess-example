import MockService from './_mock.service';
import API from './api';
import URLS from './URLS';

export const NotificationTypes = {
  SIMPLE: 'newEvent',
  TICKET: 'ticked',
  IS_FFRIENDS_REQUEST: 'roommateRequest',
  POPUP: 'popup',
};

const NotificationService = {
  all: async () => {
    const isMock = await MockService.isMock();
    if (isMock)
      return Promise.resolve({
        data: {
          unReadNotifications: [],
          notifications: [],
          allNotificatins: [
            {
              guid: 'mock-notification-1',
              type: NotificationTypes.SIMPLE,
              title: 'Yeni Etkinlik',
              category: 'newEvent',
              dateTime: new Date().toISOString(),
              description: 'Etkinliğe katılmak için tıklayın.',
            },
          ],
        },
      });

    try {
      const endpoint = URLS.NOTIFICATIONS.ALL;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to get error:', error);
      throw error;
    }
  },
  remove: async notificationIds => {
    try {
      const endpoint = URLS.NOTIFICATIONS.REMOVE + `/${notificationIds}`;
      return await API.delete(endpoint);
    } catch (error) {
      console.error('Failed to remove error:', error);
      throw error;
    }
  },

  markAsRead: async (notificationIds = null) => {
    try {
      const isMock = await MockService.isMock();
      if (isMock) return Promise.resolve();

      const endpoint = URLS.NOTIFICATIONS.MARK_AS_READ + `/${notificationIds}`;
      return await API.get(endpoint);
    } catch (error) {
      console.error('Failed to mark as read error:', error);
      throw error;
    }
  },
};

export default NotificationService;

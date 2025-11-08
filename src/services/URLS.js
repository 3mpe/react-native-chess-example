const URLS = {
  GlobalSettings: '/global/settings',
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  CONSENTS: {
    GET_CONSENTS: '/consent/get-consents',
    AGREEMENT_CONSENTS: '/consent/agreement-consents',
  },

  NOTIFICATIONS: {
    ALL: '/notifications/get-notifications',
    REMOVE: '/notifications/delete-notification',
    MARK_AS_READ: '/notifications/read-notification',
  },

  USER: {
    UPDATE_DEVICE_TOKEN: '/user/update-device-token',
    PROFILE: '/user/profile',
    UPDATE_AVATAR: '/user/update-avatar-image',
    IDENTITY_IMAGES: '/activity/identity-images',
    GET_EMERGENCY_CONTACTS: '/user/profile/getemergencycontacts',
    ADD_OR_UPDATE_EMERGENCY_CONTACT:
      '/user/profile/addorupdateemergencycontacts',
  },

  ACTIVITIES: {
    ALL: '/activity/get-activities?pageSize=100&&pageNumber=1',
    DETAIL: '/activity/',
    ACCEPT: '/activity/apply/',
    REJECT: '/activity/reject/',
    SSS: '/activity/sss',
    GET_CURRENT_APPLIED_ACTIVITIES: '/activity/get-current-applied-activities',
    GET_PAST_APPLIED_ACTIVITIES: '/activity/get-past-applied-activities',
    GET_CONTACT_SELECTION: '/activitydetail/get-contact-section/',
    GET_DRESS_CODE_LISTING: '/activitydetail/get-dress-code-listing/',
    GET_EVENT_PRATICIPANTS: '/activitydetail/get-event-participants/',
    GET_FACT_SECTION: '/activitydetail/get-faq-section/',
    GET_HOTEL_INFORMATION: '/activitydetail/get-hotel-information/',
    GET_PROGRAM_DETAIL: '/activitydetail/get-program-detail/',
    GET_TRANSFER_LISTING: '/activitydetail/get-transfer-listing/',
    UPLOAD_IDENTITY_IMAGES: '/activity/upload-identity-images',
    GET_INFORMATION_POPUP: '/activitydetail/get-information-popup',
  },

  ROOMMATE: {
    SEND_REQUEST: '/activityroommate/save-roommate/',
    GET_REQUEST_LIST: '/activityroommate/get-event-participants-for-roommate/',
    GET_EVENT_ROOMMATE: '/activityroommate/get-event-roommate/',
    RESPONSE_REQUEST: '/activityroommate/response-to-roommate-request/',
  },

  TRANSPORTATION: {
    GET_CITIES: '/activitytransportation/get-cities',

    GET_USER_CAR_DETAIL: '/activitytransportation/get-user-car-detail',
    CAR_TRANSPORTATION_PREFER:
      '/activitytransportation/car-transportation-prefer',

    GET_USER_PLANE_DETAIL: '/activitytransportation/get-plane-detail',
    GET_USER_PLANE_SCHEDULE: '/activitytransportation/get-plane-schedules',
    PLANE_TRANSPORTATION_PREFER:
      '/activitytransportation/plane-transportation-prefer',

    GET_OTHER_TRANSPORTATION_DETAIL:
      '/activitytransportation/get-other-transportation-detail',
    GET_USER_BUS_DETAIL: '/activitytransportation/get-bus-detail',
    GET_USER_BUS_SCHEDULE: '/activitytransportation/get-bus-schedules',
    BUS_TRANSPORTATION_PREFER:
      '/activitytransportation/bus-transportation-prefer',
    OTHER_TRANSPORTATION_PREFER:
      '/activitytransportation/other-transportation-prefer',
    GET_ACTIVITY_TRANSPORTATION_TYPES:
      '/activity/get-activity-transportation-types',
    GET_ACTIVITY_TRANSPORTATION_INFORMATION:
      '/activity/get-activity-transportation-information',
  },

  QR: {
    GET_LIST: '/activitydetail/get-qr-code-information-of-events',
    GET_DETAIL: '/activitydetail/get-qr-code-information-detail/',
  },

  IDDENTITY: {
    UPLOAD: '/identity/upload',
  },

  OTP: {
    CHECK: '/otp/check-otp',
    RE_SEND: '/otp/re-send-otp',
  },

  PROFILE: {
    GET: '/profile/get',
    UPDATE: '/profile/update',
    UPLOAD_AVATAR: '/profile/uploadAvatar',
  },

  TRANSFER: {
    CREATE: '/transfer/create',
    GET_LIST: '/transfer/getList',
    GET_DETAIL: '/transfer/getDetail',
  },

  CHATBOT: {
    MESSAGE_LIST: '/chatbot/messageList',
    POST_MESSAGE: '/chatbot/postMessage',
  },
};

export default URLS;

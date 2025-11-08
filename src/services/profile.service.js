import API from './api';
import URLS from './URLS';

const ProfileService = {
  get: () => API.get(URLS.PROFILE.GET),
  update: data => API.post(URLS.PROFILE.UPDATE, data),
  uploadAvatar: data => API.post(URLS.PROFILE.UPLOAD_AVATAR, data),
};

export default ProfileService;

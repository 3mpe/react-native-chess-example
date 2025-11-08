import API from './api';
import URLS from './URLS';

const TransferService = {
  create: data => API.post(URLS.TRANSFER.CREATE, data),
  getList: () => API.get(URLS.TRANSFER.GET_LIST),
  getDetail: id => API.get(URLS.TRANSFER.GET_DETAIL + `/${id}`),
};

export default TransferService;

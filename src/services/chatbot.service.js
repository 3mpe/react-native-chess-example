import API from './api';
import URLS from './URLS';

const ChatbotService = {
  messageList: () => API.get(URLS.CHATBOT.MESSAGE_LIST),
  postMessage: data => API.post(URLS.CHATBOT.CHAT, data),
};

export default ChatbotService;


import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../constants/constants';

export const handleError = (error) => {
  if (error) {
    const status = error?.response?.status;
    switch (status) {
      case 400:
        const extractedMessage = extractErrorMessage(error.response.data);
        toast.error(extractedMessage);
        break;
      case 401:
        toast.error(ERROR_MESSAGES.UNAUTHORIZED);
        break;
      case 403:
        toast.error(ERROR_MESSAGES.FORBIDDEN);
        break;
      case 404:
        toast.error(ERROR_MESSAGES.NOT_FOUND);
        break;
      case 500:
        toast.error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        break;
      default:
        toast.error(ERROR_MESSAGES.UNEXPECTED_ERROR);
        break;
    }
  }
};

const extractErrorMessage = (responseData) => {
  const { message } = responseData;
  const bracketIndex = message.lastIndexOf(']');
  if (bracketIndex !== -1) {
    return message.substring(bracketIndex + 1).trim();
  }
  return message;
};
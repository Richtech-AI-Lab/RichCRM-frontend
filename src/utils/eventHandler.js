
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../constants/constants';

export const handleError = (error) => {
  if (error) {
    const status = error.statusCode;
    switch (status) {
      case 400:
        toast.error(error.error);
        // showToast(error.error, "error");
        break;
      case 401:
        toast.error(ERROR_MESSAGES.UNAUTHORIZED);
        // showToast(ERROR_MESSAGES.UNAUTHORIZED, "error");
        break;
      case 403:
        toast.error(ERROR_MESSAGES.FORBIDDEN);
        // showToast(ERROR_MESSAGES.FORBIDDEN, "error");
        break;
      case 404:
        toast.error(ERROR_MESSAGES.NOT_FOUND);
        // showToast(ERROR_MESSAGES.NOT_FOUND, "error");
        break;
      case 500:
        toast.error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        // showToast(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, "error");
        break;
      default:
        toast.error(ERROR_MESSAGES.UNEXPECTED_ERROR);
        // showToast(ERROR_MESSAGES.UNEXPECTED_ERROR, "error");
        break;
    }
  }
};

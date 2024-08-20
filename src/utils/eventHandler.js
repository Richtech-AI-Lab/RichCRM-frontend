
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../constants/constants';

export const handleError = (error) => {
  if (error) {
    const status = error.response.status;
    switch (status) {
      case 400:
        toast.error(error.response.data.message);
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

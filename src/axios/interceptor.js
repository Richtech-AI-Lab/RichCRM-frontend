import axios from "axios";

const axiosInstance = axios.create({
  baseURL:process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to indicate refreshing is in progress
let isRefreshing = false;
// Queue for callbacks
let refreshQue = [];

// Use to notify all queued once new authtoken is obtained
const refreshingProcc = (newAccessToken) => {
  refreshQue.forEach((callback) => callback(newAccessToken));
  refreshQue = [];
};

// Add request to the queue, and called once token is refreshed
const addNewReq = (callback) => { refreshQue.push(callback); };

axiosInstance.interceptors.request.use(
  (request) => {
    const authToken = localStorage.getItem("authToken");

    if(authToken) {
      request.headers["Authorization"] = `Bearer ${authToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const { access: accessToken, refresh: refreshToken } = response?.data?.data?.[0]?.token ?? {};

    if (accessToken) {
      localStorage.setItem("authToken", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) { // handle 401 erros: token may be expired 
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }

      // If token is refreshing, this request is push into queue
      if(isRefreshing) { 
        return new Promise((resolve) => {
          addNewReq((newAccessToken) => { originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          resolve(axiosInstance(originalRequest)); });
        });
      }

      // Refresh process begin if refreshing is not in progress
      isRefreshing = true;

      try {
        const refreshRespone = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, { refreshToken }, { withCredentials: true});
        const { access: newAccessToken } = refreshRespone.data?.[0]?.token?.access || {};

        if(newAccessToken) {
          localStorage.setItem("authToken", newAccessToken);
          isRefreshing = false;
          refreshingProcc(newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; // Retry the previous request with this new auth token

          return axiosInstance(originalRequest);
        } else {
          // clear the local and re-ithenticate use if failed to retrieve a new token
          isRefreshing = false;
          localStorage.clear();
          window.location.href = "/";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // If we failed to retrive a new access token, user must re-login
        console.error("Failed to obatin a new authToken:", refreshError);
        isRefreshing = false;
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }

    } else if (error.response && error.response.status === 404) {
      console.error("Resource not found");
    } else if (error.response && error.response.status === 500) {
      console.error("Server error - please try again later");
    }
    return Promise.reject(error);
  }
);

// Methods for handling HTTP requests
export const getRequest = (url) => {
  return axiosInstance.get(url);
};

export const postRequest = (url, data) => {
  return axiosInstance.post(url, data);
};

export const putRequest = (url, data) => {
  return axiosInstance.put(url, data);
};

export const deleteRequest = (url) => {
  return axiosInstance.delete(url);
};

export default axiosInstance;

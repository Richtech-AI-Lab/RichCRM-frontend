import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "https://some-domain.com/api/",
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
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
    if (response.status === 208) {
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 404) {
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

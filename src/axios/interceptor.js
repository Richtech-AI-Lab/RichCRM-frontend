import axios from "axios";
import { jwtDecode } from 'jwt-decode'

const axiosInstance = axios.create({
  baseURL:process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const isTokenExpired = (token) => { 
  try { return jwtDecode(token).exp * 1000 < Date.now(); } catch { return true; } 
};

axiosInstance.interceptors.request.use(
  async (request) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) return request;
    
    if (!isTokenExpired(authToken)) {
      request.headers["Authorization"] = `Bearer ${authToken}`;
    }
    else {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshResponse = await axios.post("/auth/refresh", { refreshToken }, { withCredentials: true });
        const { access: newAccessToken} = refreshResponse.data[0].token.access;

        if (newAccessToken) {
          localStorage.setItem("authToken", newAccessToken);
          request.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }
        else {
          localStorage.clear();
          window.location.href = "/";
        }
      } catch (error) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }
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
    if (response.status === 208) {
      localStorage.clear();
      window.location.href = "/";
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 404) {
      console.error("Resource not found");
    } else if (error.response && error.response.status === 401) {
      console.error("Unauthorized - token might be expired")
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

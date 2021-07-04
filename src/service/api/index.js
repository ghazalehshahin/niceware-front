import axios from "axios";


export const baseUrl = 'http://127.0.0.1:8000';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});


function hydrator(axiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const newConfig = config;
      const token = localStorage.getItem("access_token");
      if (token) {
        newConfig.headers.Authorization = `Token ${token}`;
      }
      // console.log(newConfig);
      return newConfig;
    },
    (error) => {
      Promise.reject(error);
    },
  );
  // axiosInstance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     console.log('axios error', { ...error });
  //     if (error?.response?.status === 401 && error?.config?.url !== 'login/') {
  //       customHistory.push('/login', { forceLogout: true });
  //     } else {
  //       throw error;
  //     }
  //   },
  // );
}
hydrator(axiosInstance);
export default axiosInstance;
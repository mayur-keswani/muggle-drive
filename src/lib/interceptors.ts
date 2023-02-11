import axios from "axios";
import { clearLocalStorage } from "./localStorage";
import { Navigate } from "react-router-dom";
const instance = axios.create();

const handleTokenExpiry=()=>{
    clearLocalStorage();
    Navigate({to:'/login'})
};

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.status === 401){
        handleTokenExpiry()
    }
    return Promise.reject(error);
  }
);

export default instance
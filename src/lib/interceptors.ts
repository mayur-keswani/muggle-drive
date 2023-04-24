import axios from "axios";
import { clearLocalStorage, getAuth } from "./localStorage";
import { Navigate } from "react-router-dom";
const instance = axios.create();

const handleTokenExpiry=()=>{
    clearLocalStorage();
    window.location.reload()
};

instance.interceptors.request.use(
  function (config:any) {
    // Do something before request is sento
    if (
      config?.url?.indexOf("/login") === -1 &&
      config?.url?.indexOf("s3.amazonaws.com") === -1
    ) {
      if (!config.headers.Authorization) {
        if (!config.headers) {
          config.headers = {};
        }
    
        config.headers["Authorization"] = getAuth().idToken;
      }
    }
    
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
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error.toJSON());
    if(error && (error.response && error.response.config.url.indexOf('/login') === -1 && error.response.status === 401)){
      handleTokenExpiry()
    }
    return Promise.reject(error);
  }
);

export default instance
import axios from "axios";
axios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    console.log(error, "-----request errror");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log(response, "------------ response");
    return response;
  },
  function (error) {
    console.log(error.data, "------------------- response error");
    return Promise.reject(error);
  }
);

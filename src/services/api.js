import axios from "axios";
import { auth } from "configs/url.configs";

export const sendReqPost = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const sendReqPut = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const sendReqGet = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const sendReqDelete = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

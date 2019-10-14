import axios from "axios";
import { HOST_URL } from "../constants";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

const API_URL = `${HOST_URL}/api/v2`;

const constructUrlEndPoint = api => `${API_URL}/${api}`;

export const init = (API_KEY) => {
  axios.defaults.headers.common["Api-Key"] = API_KEY;
};

export const get = (api, params = {}) => {
  return axios.get(constructUrlEndPoint(api), { params });
};

export const post = (api, params, config) => {
  return axios.post(constructUrlEndPoint(api), params, config);
};

export const put = (api, params, config) => {
  return axios.put(constructUrlEndPoint(api), params, config);
};

export const setUserToken = token => {
  axios.defaults.headers.common["User-Token"] = token;
};

import * as request from "./utils/request";
import { saveUser, clearData, getToken } from "./utils/localStorage";
let USER_ID = getToken ()|| null;
export const init = config => {
  request.init(config);
};

export const registerUser = data => {
  return request.post("users", data).then(result => {
    const { data } = result;
    saveUser(data.user);
    USER_ID = data.user.id;
    request.setUserToken(data.user.user_token);
    return result;
  });
};

export const updateUser = data => {
  return request.put(`users/${USER_ID}`, data);
};

export const connectSocialAccount = data => {
  return request.post("users/connect_social_account", data);
};

export const userInfo = () => {
  return request.get(`users/${USER_ID}`);
};

export const DisconnectSocialAccount = data => {
  return request.post("users/disconnect_social_account", data);
};

export const rewards = () => {
  return request.get("rewards");
};

export const activity = () => {
  return request.get("feeds");
};

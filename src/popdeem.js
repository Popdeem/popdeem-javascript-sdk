import * as request from "./utils/request";
import { saveUser, clearData, getToken } from "./utils/localStorage";
let USER_ID = getToken() || null;
export const init = config => {
  request.init(config);
};

export const registerUser = (
  type = "",
  accessToken = "",
  userID = "",
  unique_identifier = ""
) => {
  const user = {
    unique_identifier
  };
  user[type] = {
    access_token: accessToken,
    id: userID
  };
  const data =
    typeof type === "object"
      ? type
      : {
          user
        };
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

export const DisconnectSocialAccount = (
  type = "",
  accessToken = "",
  userID = ""
) => {
  const user = {};
  user[type] = {
    access_token: accessToken,
    id: userID
  };
  const data =
    typeof type === "object"
      ? type
      : {
          user
        };
  return request.post("users/disconnect_social_account", data);
};

export const rewards = () => {
  return request.get("rewards");
};

export const activity = () => {
  return request.get("feeds");
};

export const updateUserThirdPartyToken = third_party_user_token => {
  return request.put(`users/${USER_ID}`, { third_party_user_token });
};

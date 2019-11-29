import Fingerprint from "fingerprintjs";
import * as request from "./utils/request";
import { saveUser, getToken, getUserId, clearData } from "./utils/localStorage";
let USER_TOKEN = getToken() || null;
let USER_ID = getUserId() || null;

if (USER_TOKEN) {
  request.setUserToken(USER_TOKEN);
}

const unique_identifier = new Fingerprint().get();

export const init = API_KEY => {
  request.init(API_KEY);
};

export const registerUser = (
  socialMediaType = "",
  accessToken = "",
  userID = "",
  thirdPartyUserToken
) => {
  const user = {
    unique_identifier
  };
  if (thirdPartyUserToken) {
    user.third_party_user_token = thirdPartyUserToken;
  }
  user[socialMediaType] = {
    access_token: accessToken,
    id: userID
  };
  const data =
    typeof socialMediaType === "object" && socialMediaType !== null
      ? socialMediaType
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

export const updateUser = (
  thirdPartyUserToken = "",
  socialMediaType,
  accessToken
) => {
  let data = {};
  if (typeof thirdPartyUserToken === "object" && thirdPartyUserToken !== null) {
    data = thirdPartyUserToken;
  } else {
    if (thirdPartyUserToken) {
      data.third_party_user_token = thirdPartyUserToken;
    }
    if (socialMediaType && accessToken) {
      const user = {};
      user[socialMediaType] = {
        access_token: accessToken
      };
      data.user = user;
    } else if (socialMediaType || accessToken) {
      throw new Error("Please submit both socialMediaType and accessToken");
    }
  }

  return request.put(`users/${USER_ID}`, data);
};

export const connectSocialAccount = (
  socialMediaType = "",
  accessToken = "",
  userID = ""
) => {
  const user = {};
  user[socialMediaType] = {
    access_token: accessToken,
    id: userID
  };
  const data =
    typeof socialMediaType === "object" && type !== null
      ? socialMediaType
      : {
          user
        };
  return request.post("users/connect_social_account", data);
};

export const userInfo = () => {
  return request.get(`users/${USER_ID}`);
};

export const DisconnectSocialAccount = (
  socialMediaType = "",
  accessToken = "",
  userID = ""
) => {
  const user = {};
  user[socialMediaType] = {
    access_token: accessToken,
    id: userID
  };
  const data =
    typeof socialMediaType === "object" && socialMediaType !== null
      ? socialMediaType
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

export const discover = (rewardId) => {
  if(!rewardId) {
    throw new Error("rewardId is required");
  }
  return request.get(`rewards/${rewardId}/autodiscovery`);
};

export const wallet = () => {
  return request.get("wallet");
};

export const logout = () => {
  clearData();
  return request.setUserToken("");
};

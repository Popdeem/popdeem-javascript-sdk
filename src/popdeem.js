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
  console.log("This is api key"+ API_KEY);
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
  if(socialMediaType==="instagram"){
    user[socialMediaType] = {
      short_term_token: accessToken,
      id: userID,
      full_name: "",
      profile_picture: "",
      useBasicDisplayAPI: true
    };
  }else{
    user[socialMediaType] = {
      access_token: accessToken,
      id: userID,
    };
  }

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
    short_term_token: accessToken,
    id: userID,
    useBasicDisplayAPI: true


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

export const discover = (rewardId, network) => {
  if(!rewardId) {
    throw new Error("rewardId is required");
  }
  if(!network) {
    throw new Error("network is required");
  }
  return request.post(`rewards/${rewardId}/autodiscovery`, {network});
};

export const wallet = () => {
  return request.get("rewards/wallet");
};

export const logout = () => {
  clearData();
  return request.setUserToken("");
};

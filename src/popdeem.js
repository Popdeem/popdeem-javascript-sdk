import * as request from "./utils/request";
import { saveUser, clearData, getToken, getUserId } from "./utils/localStorage";
let USER_TOKEN = getToken() || null;
let USER_ID = getUserId() || null;
if (USER_TOKEN) {
  request.setUserToken(USER_TOKEN);
}
export const init = config => {
  request.init(config);
};

export const registerUser = (
  type = "",
  accessToken = "",
  userID = "",
  unique_identifier = "",
  third_party_user_token
) => {
  const user = {
    unique_identifier
  };
  if (third_party_user_token) {
    user.third_party_user_token = third_party_user_token;
  }
  user[type] = {
    access_token: accessToken,
    id: userID
  };
  const data =
    typeof type === "object" && type !== null
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

export const updateUser = (
  thirdPartyUserToken = "",
  socialMedia,
  accessToken
) => {
  let data = {};
  if (typeof thirdPartyUserToken === "object" && thirdPartyUserToken !== null) {
    data = thirdPartyUserToken;
  } else {
    if (thirdPartyUserToken) {
      data.third_party_user_token = thirdPartyUserToken;
    }
    if (socialMedia && accessToken) {
      const user = {};
      user[socialMedia] = {
        access_token: accessToken
      };
      data.user = user;
    } else if (socialMedia || accessToken) {
      throw new Error("Please submit both socialMedia and accessToken");
    }
  }

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
    typeof type === "object" && type !== null
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

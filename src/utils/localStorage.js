import ls from "local-storage";

export const saveUser = user => {
  const { user_token } = user;
  ls.set("user", user);
  ls.set("userId", user.id);
  ls.set("user_token", user_token);
};

export const clearData = user => {
  ls.clear();
};

export const getToken = () => {
  return ls.get("user_token");
};

export const getUserId = () => {
  return ls.get("userId");
};
export default ls;

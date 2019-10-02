import ls from "local-storage";

export const saveUser = user => {
  const { user_token } = user;
  ls.set("user", user);
  ls.set("user_token", user_token);
};

export const clearData = user => {
  ls.clear();
};

export const getToken = () => {
  return ls.get("user_token");
};
export default ls;

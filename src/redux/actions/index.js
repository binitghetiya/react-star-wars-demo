import { USER_LOGIN, USER_LOGOUT } from "./../types";

export const loginUser = (isLoggedIn, user) => ({
  type: USER_LOGIN,
  isLoggedIn,
  user
});

export const logoutUser = () => ({
  type: USER_LOGOUT
});

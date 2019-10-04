import { USER_LOGIN, USER_LOGOUT } from "./../types";

const initialState = {
  isLoggedIn: false,
  user: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...{
          isLoggedIn: action.isLoggedIn,
          user: action.user
        }
      };
    case USER_LOGOUT:
      return {
        ...state,
        ...{
          isLoggedIn: false,
          user: null
        }
      };
    default:
      return state;
  }
};

export default user;

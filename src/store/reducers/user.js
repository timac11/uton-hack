import {USER_LOGIN, USER_LOGOUT, USERS_WERE_FETCHED} from "../actions/user";

const initialState = {isLogin: true, users: []};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {...state, isLogin: true};
    case USER_LOGOUT:
      return {...state, isLogin: false};
    case USERS_WERE_FETCHED:
      return {...state, users: action.payload}
    default:
      return state;
  }
}

import {ApiProvider} from "../../providers/api-provider";

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USERS_WERE_FETCHED = 'USERS_WERE_FETCHED';

export function userLogin() {
  return { type: USER_LOGIN };
}

export function userLogout() {
  return { type: USER_LOGOUT };
}

export function usersFetched(users) {
  return { type: USERS_WERE_FETCHED, payload: users }
}

export function fetchUsers() {
  return (dispatch) => {
    return ApiProvider.getRequest(`other-users`)
      .then((result) => {
        dispatch(usersFetched(result));
      })
      .catch(({response}) => {
        if (response.status === 401) {
          dispatch(userLogout());
        }
      })
  }
}

import {ApiProvider} from "../../providers/api-provider";
import {userLogout} from "./user";

export const FETCH_SHARES = 'FETCH_SHARES';
export const MY_SHARES_FETCHED = 'MY_SHARES_FETCHED';

export function fetchShares() {
  return (dispatch) => {
    return ApiProvider.getRequest(`shares`)
      .then((result) => {
        dispatch(mySharesWereFetched(result));
      })
      .catch(({response}) => {
        if (response.status === 401) {
          dispatch(userLogout());
        }
      })
  }
}

export function mySharesWereFetched(shares) {
  return { type: MY_SHARES_FETCHED, payload: shares };
}

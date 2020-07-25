import {ApiProvider} from "../../providers/api-provider";
import {userLogout} from "./user";

export const FETCH_MY_FORMS = 'FETCH_MY_FORMS';
export const MY_FORMS_FETCHED = 'MY_FORMS_FETCHED';

export function fetchMyForms() {
  return (dispatch) => {
    return ApiProvider.getRequest(`my-forms`)
      .then((result) => {
        dispatch(myFormsWereFetched(result));
      })
      .catch(({response}) => {
        if (response.status === 401) {
          dispatch(userLogout());
        }
      })
  }
}

export function myFormsWereFetched(forms) {
  return { type: MY_FORMS_FETCHED, payload: forms };
}

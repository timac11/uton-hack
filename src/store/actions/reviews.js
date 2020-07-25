import {ApiProvider} from "../../providers/api-provider";
import {userLogout} from "./user";

export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const MY_REVIEWS_FETCHED = 'MY_REVIEWS_FETCHED';

export function fetchReviews() {
  return (dispatch) => {
    return ApiProvider.getRequest(`my-reviews`)
      .then((result) => {
        dispatch(myReviewsWereFetched(result));
      })
      .catch(({response}) => {
        if (response.status === 401) {
          dispatch(userLogout());
        }
      })
  }
}

export function myReviewsWereFetched(forms) {
  return { type: MY_REVIEWS_FETCHED, payload: forms };
}

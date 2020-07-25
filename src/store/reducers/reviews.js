import {MY_REVIEWS_FETCHED} from "../actions/reviews";

const initialState = {myReviews: []};

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_REVIEWS_FETCHED:
      return {...state, myReviews: action.payload};
    default:
      return state;
  }
}

import {MY_SHARES_FETCHED} from "../actions/shares";

const initialState = {shares: []};

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_SHARES_FETCHED:
      return {...state, shares: action.payload};
    default:
      return state;
  }
}

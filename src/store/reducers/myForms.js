import {MY_FORMS_FETCHED} from "../actions/myForms";

const initialState = {myForms: []};

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_FORMS_FETCHED:
      return {...state, myForms: action.payload};
    default:
      return state;
  }
}

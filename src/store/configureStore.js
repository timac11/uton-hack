import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import user from "./reducers/user";
import myForms from "./reducers/myForms";
import reviews from "./reducers/reviews";
import shares from "./reducers/shares";

export default function (initialState = {}) {
  const rootReducer = combineReducers({
    user,
    myForms,
    reviews,
    shares
  });

  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

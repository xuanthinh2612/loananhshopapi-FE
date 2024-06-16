import { combineReducers } from "redux";

import studentReducer from "./studentReducer";
import classReducer from "./classReducer";
import productReducer from "./productReducer";

export default combineReducers({
  studentReducer,
  classReducer,
  productReducer,
});

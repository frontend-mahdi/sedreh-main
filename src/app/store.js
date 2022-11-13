import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import counterReducer from "../features/counter/counterSlice";
import map from "../features/counter/map";
import menu from "../features/counter/menu";

const reducer = combineReducers({
  map,
  menu,
});
export const store = configureStore({
  reducer,
});

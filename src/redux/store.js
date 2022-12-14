import { configureStore, combineReducers } from "@reduxjs/toolkit";
import map from "./map";
import menu from "./menu";

const reducer = combineReducers({
  map,
  menu,
});
export const store = configureStore({
  reducer,
});

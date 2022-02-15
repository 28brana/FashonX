import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

export default rootReducer;

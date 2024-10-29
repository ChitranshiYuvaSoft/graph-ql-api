import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import locationReducer from "./location/locationSlice";
import dataReducer from "./data/dataSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
  data: dataReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

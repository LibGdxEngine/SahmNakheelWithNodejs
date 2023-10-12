import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlice";
import { createWrapper } from "next-redux-wrapper";


const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export const wrapper = createWrapper(() => store, { debug: true });

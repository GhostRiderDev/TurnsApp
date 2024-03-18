import turnsReducer from "@/reducer/turnsReducer";
import userReducer from "@/reducer/userReducer";
import { configureStore } from "@reduxjs/toolkit";
import { UseSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    turns: turnsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppSelector = UseSelector;

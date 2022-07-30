import { configureStore } from "@reduxjs/toolkit";
import randomUser, { randomUserAction } from "./randomUser/slice";

export const store = configureStore({
  reducer: {
    randomUser,
  },
  devTools: true,
});

export const ActionCreators = { randomUser: randomUserAction };

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

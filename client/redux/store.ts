import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth.slice";
import { appReducer } from "./slice/app.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

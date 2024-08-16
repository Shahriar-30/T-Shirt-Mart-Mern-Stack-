import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./Slice/UserSlice/UserSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

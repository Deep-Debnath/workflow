import { configureStore } from "@reduxjs/toolkit";
import taskreducer from "../redux/slices";
import authSlice from "../redux/authSlice";

const store = configureStore({
  reducer: {
    tasks: taskreducer,
    auth: authSlice,
  },
});
export default store;

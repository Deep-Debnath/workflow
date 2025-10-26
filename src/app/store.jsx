import { configureStore } from "@reduxjs/toolkit";
import taskreducer from "../redux/slices";

const store = configureStore({
  reducer: {
    tasks: taskreducer,
  },
});
export default store;

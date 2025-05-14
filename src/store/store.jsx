import { configureStore } from "@reduxjs/toolkit";
import statesReducer from "@/features/States/statesSlice";
const store = configureStore({
  reducer: {
    states: statesReducer,
  },
});

export { store };

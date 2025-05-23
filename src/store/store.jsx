import { configureStore } from "@reduxjs/toolkit";
import statesReducer from "@/features/States/statesSlice";
import employeesReducer from "@/features/Employees/employeesSlice";

const store = configureStore({
  reducer: {
    states: statesReducer,
    employees: employeesReducer,
  },
});

export { store };

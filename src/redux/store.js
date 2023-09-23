import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeslice";
export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

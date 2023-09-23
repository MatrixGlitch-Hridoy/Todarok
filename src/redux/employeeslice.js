import { createSlice } from "@reduxjs/toolkit";

let initialState = [
  {
    id: "1",
    name: "Rizvi",
    designation: "Manager",
    phonenumber: "01811771352",
  },
];
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const { id, updatedItem } = action.payload;
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        state[index] = updatedItem;
      }
    },
    deleteEmployee: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((item) => item.id !== idToDelete);
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;

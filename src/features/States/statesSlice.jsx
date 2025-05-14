import { createSlice } from "@reduxjs/toolkit";
import statesData from "@/assets/states.json";

const initialState = {
  states: statesData,
  selectedState: null,
};

const statesSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    setSelectedState: (state, action) => {
      state.selectedState = action.payload;
    },
    clearSelectedState: (state) => {
      state.selectedState = null;
    },
  },
});

export const { setSelectedState } = statesSlice.actions;
export default statesSlice.reducer;

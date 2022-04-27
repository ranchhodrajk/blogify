import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNav: true,
};

export const showNavSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    showNav: (state, action) => {
      state.isNav = action.payload;
      console.log('isNav Reducer',state.isNav);
    },
  },
});

export const { showNav } = showNavSlice.actions;
export default showNavSlice.reducer

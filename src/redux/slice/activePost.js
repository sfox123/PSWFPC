import { createSlice } from "@reduxjs/toolkit";

const activePostSlice = createSlice({
  name: "activePost",
  initialState: null,
  reducers: {
    setActivePost: (state, action) => {
      return action.payload;
    },
  },
});

export const { setActivePost } = activePostSlice.actions;
export const activePostReducer = activePostSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const isAdmin = createSlice({
  name: "isAdmin",
  initialState: false,
  reducers: {
    setIsAdmin: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsAdmin } = isAdmin.actions;
export const isAdminReducer = isAdmin.reducer;

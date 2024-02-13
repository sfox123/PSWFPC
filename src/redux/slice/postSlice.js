import { createSlice } from "@reduxjs/toolkit";
import { blogArray } from "../../api/constant";

const postSlice = createSlice({
  name: "post",
  initialState: blogArray,
  reducers: {
    addPost: (state, action) => {
      state.blogArray.push(action.payload);
    },
    removePost: (state, action) => {
      state.blogArray = state.blogArray.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

export const { addPost, removePost } = postSlice.actions;
export const postReducer = postSlice.reducer;

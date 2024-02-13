import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi } from "./api";
import { postReducer, addPost, removePost } from "./slice/postSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

setupListeners(store.dispatch);

export {
  useGetPostsQuery,
  useAddPostMutation,
  useRemovePostMutation,
} from "./api/index";
export { addPost, removePost };

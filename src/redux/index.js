import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi } from "./api";
import { postReducer, addPost, removePost } from "./slice/postSlice";
import { setIsAdmin, isAdminReducer } from "./slice/activePost";

export const store = configureStore({
  reducer: {
    post: postReducer,
    isAdmin: isAdminReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

setupListeners(store.dispatch);

export {
  useGetPostsQuery,
  useAddPostMutation,
  useRemovePostMutation,
  useEditPostMutation,
} from "./api";
export { addPost, removePost, setIsAdmin };

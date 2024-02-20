import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi } from "./api";
import { postReducer, addPost, removePost } from "./slice/postSlice";
import { activePostReducer, setActivePost } from "./slice/activePost";

export const store = configureStore({
  reducer: {
    post: postReducer,
    activePost: activePostReducer,
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
} from "./api";
export { addPost, removePost, setActivePost };

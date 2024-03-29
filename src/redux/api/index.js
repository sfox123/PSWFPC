import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://us-central1-pswfpc-a086d.cloudfunctions.net",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/blog-update",
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "/blog-update",
        method: "POST",
        body: newPost,
      }),
    }),
    editPost: builder.mutation({
      query: (id, newPost) => ({
        url: `/edit-blog?id=${id}`,
        method: "PUT",
        body: newPost,
      }),
    }),
    removePost: builder.mutation({
      query: (id) => ({
        url: `/blog-delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetPostsQuery,
  useAddPostMutation,
  useRemovePostMutation,
  useEditPostMutation,
} = postApi;
export default postApi;

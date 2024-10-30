import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { create } from "domain";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBlogs: build.query({
      query: () => {
        return {
          url: "/blog",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    getSingleBlog: build.query({
      query: (id) => {
        return {
          url: `/blog/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useDeleteBlogMutation,
} = blogApi;

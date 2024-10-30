import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const houseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllHouses: build.query({
      query: () => {
        return {
          url: "/house/get-houses",
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
  useGetAllHousesQuery,
  useGetSingleBlogQuery,
  useDeleteBlogMutation,
} = houseApi;

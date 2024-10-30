import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const rentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRents: build.query({
      query: () => {
        return {
          url: "/rent/get-rents",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    getSingleRent: build.query({
      query: (id) => {
        return {
          url: `/rent/get-rents/${id}`,
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

export const { useGetAllRentsQuery, useGetSingleRentQuery } = rentApi;

import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const electricityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllElectricity: build.query({
      query: (params) => {
        const query = new URLSearchParams(params).toString();
        return {
          url: `/electricity/get-electricity?${query}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
      // optional
      // refetchOnMountOrArgChange: true,
    }),
    createElectricity: build.mutation({
      query: (data) => ({
        url: "/electricity/electricity",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getSingleElectricity: build.query({
      query: (id) => ({
        url: `/electricity/get-electricity/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateElectricity: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/electricity/update-electricity/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tagTypes.user], // optional: for cache refetch
    }),
  }),
});

export const {
  useGetAllElectricityQuery,
  useCreateElectricityMutation,
  useGetSingleElectricityQuery,
  useUpdateElectricityMutation,
} = electricityApi;

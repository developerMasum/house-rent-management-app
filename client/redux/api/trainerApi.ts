import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { create } from "domain";

export const trainerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTrainers: build.query({
      query: () => {
        return {
          url: "/trainers",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    getSingleTrainer: build.query({
      query: (id) => {
        return {
          url: `/trainer/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    deleteTrainer: build.mutation({
      query: (id) => ({
        url: `/trainer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAllTrainersQuery,
  useGetSingleTrainerQuery,
  useDeleteTrainerMutation,
} = trainerApi;

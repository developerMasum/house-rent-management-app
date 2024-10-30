import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { create } from "domain";

export const memberShipPlan = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMemberShipPlan: build.query({
      query: () => {
        return {
          url: "/membership",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    getSingleMemberShipPlan: build.query({
      query: (id) => {
        return {
          url: `/membership/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetMemberShipPlanQuery, useGetSingleMemberShipPlanQuery } =
  memberShipPlan;

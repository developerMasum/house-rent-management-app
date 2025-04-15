import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRooms: build.query({
      query: () => {
        return {
          url: "/room/get-rooms",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    getSingleRoom: build.query({
      query: (id) => {
        return {
          url: `/room/get-room/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetAllRoomsQuery, useGetSingleRoomQuery } = roomApi;

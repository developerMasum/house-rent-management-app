import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    initialPayment: build.mutation({
      query: (id: string) => ({
        url: `/payment/init/${id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    offlinePayment: build.mutation({
      query: (data) => ({
        url: "/payment/offline-payment",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getOfflinePayments: build.query({
      query: () => ({
        url: "/payment/offline-payments",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getMyOfflinePaymentsHistory: build.query({
      query: (id: string) => ({
        url: `/payment/offline-payments/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updatePaymentStatus: build.mutation({
      query: (data) => ({
        url: `/payment/offline-payments/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useInitialPaymentMutation,
  useOfflinePaymentMutation,
  useGetOfflinePaymentsQuery,
  useUpdatePaymentStatusMutation,
  useGetMyOfflinePaymentsHistoryQuery,
} = paymentApi;

export default paymentApi;

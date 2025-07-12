import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const tenantApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTenants: build.query({
      query: () => {
        return {
          url: "/tenants/get-tenants",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    getSingleTenant: build.query({
      query: (id) => {
        return {
          url: `/tenant/get-tenant/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetAllTenantsQuery, useGetSingleTenantQuery } = tenantApi;

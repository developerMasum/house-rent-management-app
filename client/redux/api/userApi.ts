// import { baseApi } from "@/redux/api/baseApi";
// import { tagTypes } from "@/redux/tag-types";
// import { IMeta } from "@/types";
// // import { TAdmin } from "@/types/admin";

// export const userApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     deleteUser: build.mutation({
//       query: (id) => ({
//         url: `/users/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: [tagTypes.user],
//     }),
//     createUser: build.mutation({
//       query: (data) => ({
//         url: "/create-user",
//         method: "POST",
//         data,
//       }),
//       invalidatesTags: [tagTypes.user],
//     }),
//     getAllUser: build.query({
//       query: () => ({
//         url: "/users",
//         method: "GET",
//       }),
//       providesTags: [tagTypes.user],
//     }),

//     getSingleAdmin: build.query({
//       query: (id: string | string[] | undefined) => ({
//         url: `/admin/${id}`,
//         method: "GET",
//       }),
//       providesTags: [tagTypes.admin],
//     }),
//     // update a Admin
//     updateUser: build.mutation({
//       query: (data) => ({
//         url: `/users/${data.id}`,
//         method: "PATCH",
//         data: data.body,
//       }),
//       invalidatesTags: [tagTypes.admin, tagTypes.user],
//     }),
//     getMyself: build.query({
//       query: () => ({
//         url: "/get-me",
//         method: "GET",
//       }),
//       providesTags: [tagTypes.user],
//     }),
//     updateMyself: build.query({
//       query: (data) => ({
//         url: "/get-me",
//         method: "PATCH",
//         data: data.body,
//       }),
//       providesTags: [tagTypes.user],
//     }),
//   }),
// });

// export const {
//   //   useGetAllAdminsQuery,
//   useDeleteUserMutation,
//   useGetSingleAdminQuery,
//   useUpdateUserMutation,
//   useCreateUserMutation,
//   useGetAllUserQuery,
//   useGetMyselfQuery,
//   useUpdateMyselfQuery,
// } = userApi;

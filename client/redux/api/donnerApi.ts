// import { baseApi } from "./baseApi";
// import { tagTypes } from "../tag-types";
// import { IMeta } from "@/types/common";

// export const donnerApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     createDonnerRequest: build.mutation({
//       query: (data) => {
//         console.log(data);
//         return {
//           url: "/donation-request",
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//           },
//           data,
//         };
//       },
//       // invalidatesTags: [{ type: "Donner", id: "LIST" }],
//     }),

//     getAllDonner: build.query({
//       query: (arg: Record<string, any>) => ({
//         url: "/donor-list",
//         method: "GET",
//         params: arg,
//       }),
//       transformResponse: (response, meta: IMeta) => {
//         return {
//           donner: response,
//           meta,
//         };
//       },
//       providesTags: [tagTypes.donner],
//     }),

//     gotRequests: build.query({
//       query: (arg: Record<string, any>) => ({
//         url: "/donation-request/got-requests",
//         method: "GET",
//         params: arg,
//       }),
//       transformResponse: (response) => {
//         return {
//           donner: response,
//         };
//       },
//       providesTags: [tagTypes.donner],
//     }),
//     myRequests: build.query({
//       query: (arg: Record<string, any>) => ({
//         url: "/donation-request/my-requests",
//         method: "GET",
//         params: arg,
//       }),
//       transformResponse: (response) => {
//         return {
//           donner: response,
//         };
//       },
//       providesTags: [tagTypes.donner],
//     }),

//     deletedonner: build.mutation({
//       query: (id) => ({
//         url: `/donner/delete/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: [tagTypes.donner],
//     }),
//     //get single doctor
//     getSingleDonner: build.query({
//       query: (id: string | string[] | undefined) => ({
//         url: `/donor/${id}`,
//         method: "GET",
//       }),
//       providesTags: [tagTypes.donner],
//     }),

//     updateStatus: build.mutation({
//       query: (data) => {
//         console.log(data);
//         return {
//           url: `/update-status/${data.id}`,
//           method: "POST",
//           data: data.body,
//         };
//       },
//       invalidatesTags: [tagTypes.donner, tagTypes.user],
//     }),

//     getAllRequests: build.query({
//       query: (arg: Record<string, any>) => ({
//         url: "/all-requests",
//         method: "GET",
//         params: arg,
//       }),
//       transformResponse: (response, meta: IMeta) => {
//         return {
//           requests: response,
//           meta,
//         };
//       },
//       providesTags: [tagTypes.donner],
//     }),
//     getAllBlogs: build.query({
//       query: (arg: Record<string, any>) => ({
//         url: "/blogs",
//         method: "GET",
//         params: arg,
//       }),
//       transformResponse: (response) => {
//         return {
//           blogs: response,
//         };
//       },
//       providesTags: [tagTypes.donner],
//     }),
//     getSingleBlog: build.query({
//       query: (id: string | string[] | undefined) => ({
//         url: `/blogs/${id}`,
//         method: "GET",
//       }),
//       providesTags: [tagTypes.donner],
//     }),

//     createBlogs: build.mutation({
//       query: (data) => {
//         console.log(data);
//         return {
//           url: "/blogs/create",
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//           },
//           data,
//         };
//       },

//     }),
//   }),
// });

// export const {
//   useGetAllDonnerQuery,
//   useGetSingleDonnerQuery,
//   useCreateDonnerRequestMutation,
//   useGotRequestsQuery,
//   useUpdateStatusMutation,
//   useMyRequestsQuery,
//   useGetAllRequestsQuery,
// useGetAllBlogsQuery,
// useGetSingleBlogQuery
// } = donnerApi;

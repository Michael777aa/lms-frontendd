import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: "/order/get-orders",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery } = ordersApi;

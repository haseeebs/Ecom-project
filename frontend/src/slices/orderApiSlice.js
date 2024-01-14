import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orders) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: { ...orders },
            })
        }),
        getOrderDetails: builder.query({
            query: (id) => `${ORDERS_URL}/${id}`
        })
    })
});

export const { useCreateOrderMutation , useGetOrderDetailsQuery } = orderApiSlice;
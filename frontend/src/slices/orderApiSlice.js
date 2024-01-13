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
        })
    })
});

export const { useCreateOrderMutation } = orderApiSlice;
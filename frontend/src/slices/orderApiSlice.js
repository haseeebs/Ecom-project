import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

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
            query: (id) => `${ORDERS_URL}/${id}`,
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details }
            })
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL
            }),
            keepUnusedDataFor: 5
        }),
        getMyOrders: builder.query({
            query: () => `${ORDERS_URL}/mine`,
            keepUnusedDataFor: 5
        }),
        getAllOrders: builder.query({
            query: () => ORDERS_URL,
            keepUnusedDataFor: 5
        })
    })
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useGetMyOrdersQuery, useGetAllOrdersQuery } = orderApiSlice;
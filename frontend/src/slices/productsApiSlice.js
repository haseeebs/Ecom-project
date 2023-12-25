import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => PRODUCTS_URL,
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (id) => `${PRODUCTS_URL}/${id}`
        })
    })
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApiSlice;
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
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product']
        })
    })
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation } = productApiSlice;
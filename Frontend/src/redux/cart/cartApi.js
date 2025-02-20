import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../utils/baseURL"

const cartApi = createApi({
    reducerPath:'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/orders`,
        // credentials:false
    }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        createCart: (builder.mutation) ({
            query: (newOrder) => ({
               url:'/',
               method:"POST",
               body: newCart,
            //    credentials:false
            })
        }),
        getCartByEmail: (builder.query) ({
            query: (email) => ({
                url:`/email/${email}`
            }),
            providesTags:['Cart']
        })
    })
})

export const { useCreateOrderMutation, useGetOrderByEmailQuery } = cartApi;

export default cartApi;
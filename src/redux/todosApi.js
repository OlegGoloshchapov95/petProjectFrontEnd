import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:1337', prepareHeaders: (headers) => {
            const token = localStorage.getItem("bearerTokenForTodos");

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', token);
            }

            return headers;
        },
    }),
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (body) => ({
                url: 'api/auth/local/register',
                method: 'POST',
                body,
            })
        }),
        /*/api/auth/local/register*/
        /*getGoods: build.query({
            query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Products', id })),
                    { type: 'Products', id: 'LIST' },
                ]
                : [{ type: 'Products', id: 'LIST' }],
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: 'goods',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `goods/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        })*/
    })
});

export const {useRegisterUserMutation/*useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation*/} = todosApi;
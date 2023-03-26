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
        authUser: build.mutation({
            query: (body) => ({
                url: 'api/auth/local',
                method: 'POST',
                body,
            })
        }),
        createTodo: build.mutation({
            query: (body) => ({
                url: 'api/todos',
                method: 'POST',
                body,
            })
        }),
        getTodos: build.mutation({
            query: () => ({
                url: 'api/todos',
                method: 'GET',
            })
        }),
    })
});

export const {useRegisterUserMutation, useAuthUserMutation, useCreateTodoMutation, useGetTodosMutation} = todosApi;
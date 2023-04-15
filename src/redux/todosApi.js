import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const forumApi = createApi({
    reducerPath: 'forumApi',
    tagTypes: ['Topics'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:1337', prepareHeaders: (headers) => {
            const token = localStorage.getItem("bearerTokenForTodos")

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', token)
            }

            return headers
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
        createTopic: build.mutation({
            query: (body) => ({
                url: 'api/topics',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Topics"]
        }),
        getTopics: build.query({
            query: () => ({
                url: 'api/topics',
                method: 'GET',
            }),
            providesTags: ["Topics"]
        }),
        deleteTopic: build.mutation({
            query: (todo_id) => ({
                url: `api/topics/${todo_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Topics"]
        }),
        meUser: build.query({
            query: () => ({
                url: 'api/users/me',
                method: 'GET',
            })
        }),
    })
})

export const {useRegisterUserMutation, useAuthUserMutation, useCreateTopicMutation, useLazyGetTopicsQuery, useLazyMeUserQuery, useDeleteTopicMutation} = forumApi
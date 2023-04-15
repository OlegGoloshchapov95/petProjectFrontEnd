import { configureStore } from '@reduxjs/toolkit';
import { forumApi } from './todosApi';

export const store = configureStore({
    reducer: {
        [forumApi.reducerPath]: forumApi.reducer,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(forumApi.middleware)
});
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedOut } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const token = getState()?.auth.accessToken;
    if (token) {
      headers.set('authorization', `${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 500) {
      api.dispatch(userLoggedOut());
    }
    return result;
  },
  tagTypes: ['books', 'reviews'],
  endpoints: () => ({}),
});

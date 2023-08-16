import Cookies from 'js-cookie';
import { apiSlice } from '../../api/apiSlice';
import { userLoggedIn } from './authSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // localStorage.setItem(
          //   'auth',
          //   JSON.stringify({
          //     email: result.data.data.email,
          //   }),
          // );

          Cookies.set(
            'auth',
            JSON.stringify({
              email: result.data.data.email,
              accessToken: result.data.data.accessToken,
            }),
          );

          dispatch(
            userLoggedIn({
              email: result.data.data.email,
              accessToken: result.data.data.accessToken,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            'auth',
            JSON.stringify({
              email: result.data.data.email,
            }),
          );

          dispatch(
            userLoggedIn({
              email: result.data.data.email,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

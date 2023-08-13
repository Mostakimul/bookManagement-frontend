import { apiSlice } from '../../api/apiSlice';

const bookApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: () => ({
        url: '/books',
      }),
    }),
    getRecentBooks: build.query({
      query: () => ({
        url: '/books?sortBy=createdAt&limit=10',
      }),
    }),
  }),
});

export const { useGetAllBooksQuery, useGetRecentBooksQuery } = bookApi;

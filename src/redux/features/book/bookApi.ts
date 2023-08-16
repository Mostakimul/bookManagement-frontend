import { apiSlice } from '../../api/apiSlice';

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({ page = 1, limit = 10, sortBy = 'createdAt' }) => ({
        url: `/books?page=${page}&limit=${limit}&sortBy=${sortBy}`,
      }),
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
      }),
    }),
  }),
});

export const { useGetAllBooksQuery, useGetSingleBookQuery } = bookApi;

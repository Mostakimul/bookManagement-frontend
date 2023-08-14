import { apiSlice } from '../../api/apiSlice';

const bookApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: ({ page = 1, limit = 10, sortBy = 'createdAt' }) => ({
        url: `/books?page=${page}&limit=${limit}&sortBy=${sortBy}`,
      }),
    }),
  }),
});

export const { useGetAllBooksQuery } = bookApi;

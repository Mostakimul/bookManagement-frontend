import { BookType } from '../../../types/bookType';
import { AccesTokenType } from '../../../types/reviewType';
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
    addBook: builder.mutation({
      query: ({
        accessToken,
        title,
        author,
        genre,
        publicationDate,
        userId,
      }: BookType & AccesTokenType) => ({
        url: '/books',
        method: 'POST',
        body: { title, author, userId, genre, publicationDate },
        headers: {
          authorization: accessToken,
        },
      }),
      invalidatesTags: ['books'],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useAddBookMutation,
} = bookApi;

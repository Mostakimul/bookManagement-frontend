import { BookType } from '../../../types/bookType';
import { AccesTokenType } from '../../../types/reviewType';
import { apiSlice } from '../../api/apiSlice';

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({ page = 1, limit = 10, sortBy = 'createdAt' }) => ({
        url: `/books?page=${page}&limit=${limit}&sortBy=${sortBy}`,
      }),
      providesTags: ['books'],
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'book', id: arg }],
    }),
    addBook: builder.mutation({
      query: ({
        accessToken,
        title,
        author,
        genre,
        publicationDate,
        userId,
      }: BookType & { accessToken: string }) => ({
        url: '/books',
        method: 'POST',
        body: { title, author, userId, genre, publicationDate },
        headers: {
          authorization: accessToken,
        },
      }),
      invalidatesTags: ['books'],
    }),
    deleteBook: builder.mutation({
      query: ({ id, accessToken }: { id: string; accessToken: string }) => ({
        url: `/books/${id}`,
        method: 'DELETE',
        headers: {
          authorization: accessToken,
        },
      }),
      invalidatesTags: ['books'],
    }),
    editBook: builder.mutation({
      query: ({
        id,
        accessToken,
        title,
        author,
        genre,
        publicationDate,
        userId,
      }: {
        id: string;
      } & BookType &
        AccesTokenType) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: { title, author, userId, genre, publicationDate },
        headers: {
          authorization: accessToken,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        'books',
        { type: 'book', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
} = bookApi;

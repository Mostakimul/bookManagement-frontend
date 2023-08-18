import { AccesTokenType, ReviewType } from '../../../types/reviewType';
import { apiSlice } from '../../api/apiSlice';

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookReviews: builder.query({
      query: (bookId: string | undefined) => ({
        url: `/reviews/${bookId}`,
      }),
      providesTags: ['reviews'],
    }),
    addBookReview: builder.mutation({
      query: ({
        accessToken,
        comment,
        star,
        userId,
        bookId,
      }: ReviewType & AccesTokenType) => ({
        url: '/reviews',
        method: 'POST',
        body: { comment, star, userId, bookId },
        headers: {
          authorization: accessToken,
        },
      }),
      invalidatesTags: ['reviews'],
    }),
  }),
});

export const { useGetBookReviewsQuery, useAddBookReviewMutation } = reviewApi;

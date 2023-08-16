import { ReviewType } from '../../../types/reviewType';
import { apiSlice } from '../../api/apiSlice';

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookReviews: builder.query({
      query: (bookId: string | undefined) => ({
        url: `/reviews/${bookId}`,
      }),
    }),
    addBookReview: builder.mutation({
      query: (data: ReviewType) => ({
        url: '/reviews',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetBookReviewsQuery, useAddBookReviewMutation } = reviewApi;

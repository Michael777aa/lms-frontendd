import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLayoutByType: builder.query({
      query: (type) => ({
        url: `/layout/get-layout/${type}`,
        credentials: "include" as const,
      }),
    }),
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: `/layout/edit-layout`,
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetLayoutByTypeQuery, useEditLayoutMutation } = layoutApi;

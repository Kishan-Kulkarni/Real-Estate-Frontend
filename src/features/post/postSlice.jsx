import { apiSlice } from "../../app/api/apiSlice";

export const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPopular: builder.query({
      query: () => `/popular`,
      transformResponse: (resData) => {
        let transformedData = {};
        let popular = [];
        let sell = [];
        let rent = [];
        let popularData = resData.popularPosts.data;
        let rentData = resData.rentPosts.data;
        let sellData = resData.sellPosts.data;
        const popularArray = popularData.map((data) => {
          const blob = new Blob([new Uint8Array(data)], {
            type: "image/png",
          });
          const imageUrl = URL.createObjectURL(blob);
          return imageUrl;
        });
        const rentArray = rentData.map((data) => {
          const blob = new Blob([new Uint8Array(data)], {
            type: "image/png",
          });
          const imageUrl = URL.createObjectURL(blob);
          return imageUrl;
        });
        const sellArray = sellData.map((data) => {
          const blob = new Blob([new Uint8Array(data)], {
            type: "image/png",
          });
          const imageUrl = URL.createObjectURL(blob);
          return imageUrl;
        });
        popular = resData.popularPosts.posts;
        for (let i = 0; i < popularArray.length; i++) {
          popular[i].image = popularArray[i];
        }
        rent = resData.rentPosts.posts;
        for (let i = 0; i < rentArray.length; i++) {
          rent[i].image = rentArray[i];
        }
        sell = resData.sellPosts.posts;
        for (let i = 0; i < sellArray.length; i++) {
          sell[i].image = sellArray[i];
        }
        transformedData.popularPosts = popular;
        transformedData.rentPosts = rent;
        transformedData.sellPosts = sell;
        return transformedData;
      },
      providesTags: ["popular"],
    }),
    addSearchPosts: builder.query({
      query: ({ start, type, furnished, offer, parking }) =>
        `/post/${start}/${type}/${offer}/${furnished}/${parking}`,
      transformResponse: (resData) => {
        const dataArray = resData.data;
        const imageArray = dataArray.map((data) => {
          const blob = new Blob([new Uint8Array(data)], {
            type: "image/png",
          });
          const imageUrl = URL.createObjectURL(blob);
          return imageUrl;
        });
        let transformedData = {};
        let foundPosts = resData.foundPost;
        for (let i = 0; i < imageArray.length; i++) {
          foundPosts[i].image = imageArray[i];
        }
        transformedData.foundPosts = foundPosts;
        console.log(transformedData);
        return transformedData;
      },
    }),
    getPosById: builder.query({
      query: (postId) => `/post/${postId}`,
      transformResponse: (resData) => {
        const dataArray = resData.data;
        const imageArray = dataArray.map((data) => {
          const blob = new Blob([new Uint8Array(data)], {
            type: "image/png",
          });
          const imageUrl = URL.createObjectURL(blob);
          return imageUrl;
        });
        let transformedData = {};
        transformedData.foundPosts = resData.foundPost;
        transformedData.data = imageArray;
        console.log(transformedData);
        return transformedData;
      },
      providesTags: ["post"],
    }),
    getPostComments: builder.query({
      query: (postId) => `/post/${postId}/comment`,
      transformResponse: (resData) => {
        console.log(resData);
        return resData;
      },
      providesTags: ["postComment"],
    }),
    addPostComment: builder.mutation({
      query({ userId, postId, content }) {
        return {
          url: "/comment",
          method: "POST",
          body: { userId, postId, content },
        };
      },
      async onQueryStarted(
        { userId, postId, content },
        { dispatch, queryFulfilled }
      ) {
        const currentDate = new Date();
        const isoString = currentDate.toISOString();
        const comment = {
          userId,
          postId,
          content,
          _id: Math.random().toString(36).substring(7),
          createdAt: isoString,
        };
        const postResult = dispatch(
          apiSlice.util.updateQueryData("getPostComments", postId, (draft) => {
            draft.foundComments.unshift(comment);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          postResult.undo();
        }
      },
    }),
    addPost: builder.mutation({
      query(formData) {
        return {
          url: "/create-listing",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "userPost", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPopularQuery,
  useAddSearchPostsQuery,
  useGetPosByIdQuery,
  useGetPostCommentsQuery,
  useAddPostCommentMutation,
  useAddPostMutation,
} = postSlice;

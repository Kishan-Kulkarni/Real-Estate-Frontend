import { apiSlice } from "../../app/api/apiSlice";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => `/user/${userId}`,
      transformResponse: (resData) => {
        const blob = new Blob([new Uint8Array(resData.image.data)], {
          type: "image/png",
        });
        const imageUrl = URL.createObjectURL(blob);
        const transformedData = { ...resData, image: imageUrl };
        return transformedData;
      },
      providesTags: ["user"],
    }),
    getUserPosts: builder.query({
      query: (id) => `/user/post/${id}`,
      transformResponse: (resData) => {
        const dataArray = resData.posts.data;
        const imageArray = dataArray.map((data) => {
          const blob = new Blob([new Uint8Array(data.data)], {
            type: "image/png",
          });
          const imageUrl = URL.createObjectURL(blob);
          return imageUrl;
        });
        let transformedData = {};
        transformedData.foundPosts = resData.posts.foundPosts;
        for (let i = 0; i < imageArray.length; i++) {
          transformedData.foundPosts[i].image = imageArray[i];
        }
        return transformedData;
      },
      providesTags: (result, error, arg) => [{ type: "userPost", id: "LIST" }],
    }),
    getUserComments: builder.query({
      query: (id) => `/user/comments/${id}`,
      providesTags: (result, error, arg) => [
        { type: "userComments", id: "LIST" },
      ],
    }),
    registerUser: builder.mutation({
      query(formData) {
        return {
          url: "/register",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserPostsQuery,
  useGetUserCommentsQuery,
  useRegisterUserMutation,
} = userApiSlice;

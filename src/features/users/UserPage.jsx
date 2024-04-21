import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetUserQuery,
  useGetUserPostsQuery,
  useGetUserCommentsQuery,
} from "./userSlice";
import { useEffect, useState } from "react";
import Cards from "../../components/component/Cards";
import Comments from "../../components/component/Comments";
import { logOut } from "../auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showUserPost, setShowUserPost] = useState(false);
  const [showUserComments, setShowUserComments] = useState(false);
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(id);
  const {
    data: userPost,
    isLoading: userPostLoading,
    isSuccess: userPostSuccess,
    isError: userPostIsError,
    error: userPostError,
  } = useGetUserPostsQuery(isSuccess ? id : skipToken);
  const {
    data: userComments,
    isLoading: userCommentsLoading,
    isSuccess: userCommentsSuccess,
    isError: userCommentsIsError,
    error: userCommentsError,
  } = useGetUserCommentsQuery(userPostSuccess ? id : skipToken);
  const handlePostClick = () => {
    setShowUserPost((prev) => !prev);
  };
  const handleCommentsClick = () => {
    setShowUserComments((prev) => !prev);
  };
  const handleLogout = () => {
    try {
      dispatch(logOut());
    } catch (error) {
      window.alert(error.message);
    } finally {
      navigate("/");
    }
  };
  return (
    <div id="user-container">
      <div id="user-content">
        {isSuccess ? (
          <>
            <img
              src={user.image}
              alt="alt"
              style={{ height: "200px", width: "200px", borderRadius: "50%" }}
            />
            <p>{user.name}</p>
          </>
        ) : (
          <p>Loading....</p>
        )}
      </div>
      <div id="user-post">
        <button onClick={() => handlePostClick()}>Get User Posts</button>
        {showUserPost ? (
          userPostSuccess ? (
            <div id="user-post-container">
              <Cards imageArray={userPost.foundPosts} />
            </div>
          ) : (
            <>Loading....</>
          )
        ) : (
          <></>
        )}
      </div>
      <div id="user-comment">
        <button onClick={() => handleCommentsClick()}>Get User Comments</button>
        {showUserComments ? (
          userCommentsSuccess ? (
            <Comments commentsArray={userComments.foundComments} />
          ) : (
            <>Loading....</>
          )
        ) : (
          <></>
        )}
      </div>
      <div id="user-logout" style={{ marginBottom: "20px" }}>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      <div id="new-post">
        <button
          onClick={() => {
            navigate("/new-post");
          }}
        >
          New Post
        </button>
      </div>
    </div>
  );
};
export default UserPage;

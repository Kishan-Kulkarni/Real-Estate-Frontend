import { useParams } from "react-router-dom";
import Carousel from "../component/Carousel";
import { useEffect, useState } from "react";
import {
  useAddPostCommentMutation,
  useGetPosByIdQuery,
  useGetPostCommentsQuery,
} from "../../features/post/postSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faShower,
  faSquareParking,
  faChair,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import {
  selectCurrentId,
  selectCurrentToken,
} from "../../features/auth/authSlice";
import Comments from "../component/Comments";
const Listing = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPosByIdQuery(id);
  const {
    data: comments,
    isLoading: isCommentLoading,
    isSuccess: isCommentSuccess,
    isError: isCommentError,
    error: commentError,
  } = useGetPostCommentsQuery(isSuccess ? id : skipToken);
  const [addPostComment, { isLoading: isPostCommentLoading }] =
    useAddPostCommentMutation();
  const token = useSelector(selectCurrentToken);
  const userId = useSelector(selectCurrentId);
  const handleClick = async () => {
    const postId = id;
    try {
      const result = await addPostComment({ userId, postId, content }).unwrap();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {isLoading && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ClipLoader
            color="#334155"
            size={50}
            animation="border"
            loading={isLoading || isCommentLoading}
          />
        </div>
      )}
      {isSuccess && isCommentSuccess && (
        <>
          <Carousel imageArray={post.data} />
          <div
            style={{
              margin: "20px 7px 10px 10px",
              marginLeft: "20vw",
              marginRight: "20vw",
            }}
          >
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "3.2rem",
                paddingBottom: "15px",
              }}
            >
              {post.foundPosts.name}
            </p>
            <p
              style={{
                color: "rgb(51, 65, 85)",
                fontWeight: "bold",
                fontSize: "1rem",
                paddingBottom: "10px",
              }}
            >
              <FontAwesomeIcon icon={faLocationDot} /> {post.foundPosts.address}
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                color: "black",
                opacity: "0.9",
                fontSize: "1.5rem",
                paddingBottom: "10px",
              }}
            >
              {post.foundPosts.description}
            </p>
            <p
              style={{
                color: "black",
                paddingBottom: "15px",
                fontWeight: "bold",
              }}
            >
              ${post.foundPosts.price}
            </p>
            <div
              className="card-amenities"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                gap: "30px",
                paddingBottom: "15px",
              }}
            >
              <div
                className="sale"
                style={{
                  width: "10vw",
                  height: "3.2vh",
                  color: "white",
                  backgroundColor: "#14532d",
                  textAlign: "center",
                  borderRadius: "5px",
                  fontSize: "1.1rem",
                }}
              >
                For {post.foundPosts.sell ? "Sale" : "Rent"}
              </div>
              <div
                className="offer"
                style={{
                  width: "10vw",
                  height: "3.2vh",
                  color: "white",
                  backgroundColor: "#7f1d1d",
                  textAlign: "center",
                  borderRadius: "5px",
                  fontSize: "1.1rem",
                }}
              >
                {post.foundPosts.offer ? "Offer" : "No Offer"}
              </div>
            </div>
            <div
              className="card-amenities"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                gap: "30px",
                paddingBottom: "50px",
              }}
            >
              <p
                style={{
                  color: "rgb(51, 65, 85)",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                <FontAwesomeIcon icon={faBed} /> {post.foundPosts.beds} Beds
              </p>
              <p
                style={{
                  color: "rgb(51, 65, 85)",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                <FontAwesomeIcon icon={faShower} /> {post.foundPosts.bath} Baths
              </p>
              <p
                style={{
                  color: "rgb(51, 65, 85)",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                <FontAwesomeIcon icon={faSquareParking} />{" "}
                {post.foundPosts.parking ? "Parking" : "No Parking"}
              </p>
              <p
                style={{
                  color: "rgb(51, 65, 85)",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                <FontAwesomeIcon icon={faChair} />{" "}
                {post.foundPosts.furnished ? "Furnished" : "Not Furnished"}
              </p>
            </div>
            <>
              {token && (
                <>
                  <textarea
                    name="comment"
                    id="comment"
                    cols="120"
                    rows="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      resize: "none",
                      paddingLeft: "5px",
                      paddingTop: "5px",
                      marginBottom: "15px",
                    }}
                  ></textarea>
                  <button
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      width: "10vw",
                      height: "3.2vh",
                      color: "white",
                      backgroundColor: "#14532d",
                      textAlign: "center",
                      borderRadius: "5px",
                      fontSize: "1.1rem",
                      marginBottom: "35px",
                    }}
                    onClick={handleClick}
                  >
                    Submit
                  </button>
                  {isCommentSuccess && (
                    <Comments commentsArray={comments.foundComments} />
                  )}
                </>
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
};
export default Listing;

import { useState } from "react";
import Cards from "./Cards";
import { useGetPopularQuery } from "../../features/post/postSlice";
import { ClipLoader } from "react-spinners";
const Listings = () => {
  const {
    data: popularPosts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPopularQuery();
  return (
    <>
      {isLoading && (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20vh",
          }}
        >
          <ClipLoader
            color="#334155"
            size={50}
            animation="border"
            loading={isLoading}
          />
        </div>
      )}
      {isSuccess && (
        <div id="listings">
          <h3>Recent Offers</h3>
          <a href="#">Show more recent offers</a>
          <div id="recent">
            <Cards imageArray={popularPosts.popularPosts} />
          </div>
          <h3>Recent Places for Rent</h3>
          <a href="#">Show more recent rent offers</a>
          <div id="recent-rent">
            <Cards imageArray={popularPosts.rentPosts} />
          </div>
          <h3>Recent Places for Sale</h3>
          <a href="#">Show more recent sale offers</a>
          <div id="recent-sale">
            <Cards imageArray={popularPosts.sellPosts} />
          </div>
        </div>
      )}
    </>
  );
};
export default Listings;

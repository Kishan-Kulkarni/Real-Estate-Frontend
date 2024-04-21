import { useEffect, useState } from "react";
import { useGetPopularQuery, useAddSearchPostsQuery } from "./postSlice";
import { ClipLoader } from "react-spinners";
import Cards from "../../components/component/Cards";
const SearchPage = () => {
  const [allPosts, setAllPosts] = useState({ foundPosts: [] });
  const [start, setStart] = useState(0);
  const [queries, setQueries] = useState({
    type: "all",
    offer: "all",
    parking: "all",
    furnished: "all",
  });
  const {
    data: searchPosts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAddSearchPostsQuery({ ...queries, start });

  useEffect(() => {
    if (searchPosts) {
      setAllPosts(searchPosts);
    }
  }, [searchPosts]);

  return (
    <div
      id="search-page"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        marginTop: "2vh",
      }}
    >
      <div
        id="selections"
        style={{
          width: "28vw",
          minHeight: "92vh",
          padding: "40px 0px 0px 20px",
          borderRight: "2px solid black",
        }}
      >
        <div id="type" style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px" }}>Type:</h3>
          <input
            type="radio"
            name="type"
            id="all-type"
            onClick={() => setQueries((prev) => ({ ...prev, type: "all" }))}
          />
          <label htmlFor="all-type">All</label>
          <input
            type="radio"
            name="type"
            id="sell-type"
            onClick={() => setQueries((prev) => ({ ...prev, type: "sell" }))}
          />
          <label htmlFor="sell-type">Sell</label>
          <input
            type="radio"
            name="type"
            id="rent-type"
            onClick={() => setQueries((prev) => ({ ...prev, type: "rent" }))}
          />
          <label htmlFor="rent-type">Rent</label>
        </div>
        <div id="offer" style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px" }}>Discount:</h3>
          <input
            type="radio"
            name="offer"
            id="all-offer"
            onClick={() => setQueries((prev) => ({ ...prev, offer: "all" }))}
          />
          <label htmlFor="all-offer">All</label>
          <input
            type="radio"
            name="offer"
            id="with-offer"
            onClick={() => setQueries((prev) => ({ ...prev, offer: "true" }))}
          />
          <label htmlFor="with-offer">Offer</label>
          <input
            type="radio"
            name="offer"
            id="no-offer"
            onClick={() => setQueries((prev) => ({ ...prev, offer: "false" }))}
          />
          <label htmlFor="no-offer">No Offer</label>
        </div>
        <div id="furnished" style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px" }}>Furnished:</h3>
          <input
            type="radio"
            name="furnished"
            id="all-fur"
            onClick={() =>
              setQueries((prev) => ({ ...prev, furnished: "all" }))
            }
          />
          <label htmlFor="all-fur">All</label>
          <input
            type="radio"
            name="furnished"
            id="furnished"
            onClick={() =>
              setQueries((prev) => ({ ...prev, furnished: "true" }))
            }
          />
          <label htmlFor="furnished">Furnished</label>
          <input
            type="radio"
            name="furnished"
            id="no-fur"
            onClick={() =>
              setQueries((prev) => ({ ...prev, furnished: "false" }))
            }
          />
          <label htmlFor="no-fur">Not Furnished</label>
        </div>
        <div id="parking">
          <h3 style={{ marginBottom: "10px" }}>Parking:</h3>
          <input
            type="radio"
            name="parking"
            id="all-park"
            onClick={() => setQueries((prev) => ({ ...prev, parking: "all" }))}
          />
          <label htmlFor="all-park">All</label>
          <input
            type="radio"
            name="parking"
            id="parking"
            onClick={() => setQueries((prev) => ({ ...prev, parking: "true" }))}
          />
          <label htmlFor="parking">Parking</label>
          <input
            type="radio"
            name="parking"
            id="no-park"
            onClick={() =>
              setQueries((prev) => ({ ...prev, parking: "false" }))
            }
          />
          <label htmlFor="no-park">No Parking</label>
        </div>
      </div>
      {!isLoading ? (
        <div
          id="selection-result"
          style={{
            width: "72vw",
            minHeight: "87.1vh",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: "20px",
            gap: "20px",
          }}
        >
          {isSuccess && (
            <Cards
              imageArray={
                allPosts.foundPosts.length === 0
                  ? searchPosts.foundPosts
                  : allPosts.foundPosts
              }
            />
          )}
        </div>
      ) : (
        <div
          style={{
            width: "72vw",
            minHeight: "87.1vh",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClipLoader
            color="#334155"
            size={100}
            animation="border"
            loading={isLoading}
          />
        </div>
      )}
    </div>
  );
};
export default SearchPage;

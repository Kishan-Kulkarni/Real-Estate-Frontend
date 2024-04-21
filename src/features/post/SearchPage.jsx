import { useEffect, useState } from "react";
import { useGetPopularQuery, useAddSearchPostsMutation } from "./postSlice";
const SearchPage = () => {
  const [allPosts, setAllPosts] = useState({ data: [], foundPost: [] });
  const [start, setStart] = useState(0);
  const [type, setType] = useState("");
  const [offer, setOffer] = useState("");
  const [parking, setParking] = useState("");
  const [furnished, setFurnished] = useState("");
  const [queries, setQueries] = useState({
    start: 0,
    type: "",
    offer: "",
    parking: "",
    furnished: "",
  });
  const [addSearchPosts, { isLoading }] = useAddSearchPostsMutation();
  useEffect(() => {
    const tempFunc = async () => {
      try {
        const result = await addSearchPosts(queries).unwrap();
        console.log(result);
        setAllPosts((prev) => ({
          data: [...prev.data, ...result.data],
          foundPost: [...prev.foundPost, ...result.foundPost],
        }));
      } catch (error) {
        console.log(error);
      }
    };
    tempFunc();
  }, []);

  return <div>SearchPage</div>;
};
export default SearchPage;

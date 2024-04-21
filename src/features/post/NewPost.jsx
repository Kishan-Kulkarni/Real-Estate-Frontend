import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentId, selectCurrentUser } from "../auth/authSlice";
import { useAddPostMutation } from "./postSlice";
import { useNavigate } from "react-router-dom";
const NewPost = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [sell, setSell] = useState(false);
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [offer, setOffer] = useState(false);
  const [beds, setBeds] = useState(0);
  const [bath, setBaths] = useState(0);
  const [price, setPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [addPost, { isLoading }] = useAddPostMutation();
  const navigate = useNavigate();
  const username = useSelector(selectCurrentUser);
  const userId = useSelector(selectCurrentId);
  const handleClick = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("sell", sell);
    formData.append("offer", offer);
    formData.append("parking", parking);
    formData.append("furnished", furnished);
    formData.append("beds", beds);
    formData.append("bath", bath);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    if (image.length === 0) {
      window.alert("Add Pictures Please");
      return;
    }
    for (let i = 0; i < image.length; i++) {
      formData.append("file", image[i]);
    }
    try {
      await addPost(formData);
    } catch (err) {
      console.log("here", err.message);
    } finally {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <div id="new-post-div" style={{ minHeight: "100vh", overflowY: "scroll" }}>
      <p>New Post</p>
      <form autoComplete="off">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="beds" style={{ fontWeight: "bold" }}>
          Beds:
        </label>
        <input
          type="number"
          name="beds"
          id="beds"
          placeholder="Beds"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />
        <label htmlFor="baths" style={{ fontWeight: "bold" }}>
          Baths:
        </label>
        <input
          type="number"
          name="baths"
          id="baths"
          placeholder="Baths"
          value={bath}
          onChange={(e) => setBaths(e.target.value)}
        />
        <label htmlFor="price" style={{ fontWeight: "bold" }}>
          Price:
        </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {offer && (
          <label htmlFor="offer-price" style={{ fontWeight: "bold" }}>
            Offer Price:
          </label>
        )}
        {offer && (
          <input
            type="number"
            name="offer-price"
            id="offer-price"
            placeholder="Offer Price"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
          />
        )}
        <div id="extra" style={{ marginBottom: "20px" }}>
          <input
            type="checkbox"
            name="extra"
            id="sell"
            style={{ width: "17px", height: "17px", marginRight: "10px" }}
            value={sell}
            onClick={() => setSell((p) => !p)}
          />
          <label htmlFor="sell">Sell</label>
          <input
            type="checkbox"
            name="extraa"
            id="offer"
            style={{ width: "17px", height: "17px", marginRight: "10px" }}
            value={offer}
            onClick={() => setOffer((p) => !p)}
          />
          <label htmlFor="offer">Offer</label>
          <input
            type="checkbox"
            name="extraaa"
            id="furnished"
            style={{ width: "17px", height: "17px", marginRight: "10px" }}
            value={furnished}
            onClick={() => setFurnished((p) => !p)}
          />
          <label htmlFor="furnished">Furnished</label>
          <input
            type="checkbox"
            name="extraaaa"
            id="parking"
            style={{ width: "17px", height: "17px", marginRight: "10px" }}
            value={parking}
            onClick={() => setParking((p) => !p)}
          />
          <label htmlFor="parking">Parking</label>
        </div>
        <div className="file-input-container">
          <input
            type="file"
            id="file"
            name="file"
            multiple
            onChange={(e) => setImage(e.target.files)}
            required
          />
          <button type="button" className="file-input-button">
            Choose Images
          </button>
        </div>
      </form>
      <button
        style={{ backgroundColor: "rgb(60, 74, 93)" }}
        onClick={() => handleClick()}
      >
        Post!!
      </button>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
export default NewPost;

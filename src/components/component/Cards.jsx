import { Link } from "react-router-dom";

const Cards = ({ imageArray }) => {
  return (
    <>
      {imageArray.map((image) => {
        return (
          <Link
            id="card-link"
            key={image.image}
            style={{ textDecoration: "none" }}
            to={`/listing/${image._id}`}
          >
            <div className="card">
              <img src={image.image} alt="Image" className="card-image" />
              <div
                className="card-text"
                style={{ margin: "20px 7px 10px 10px" }}
              >
                <p
                  style={{
                    color: "rgb(51, 65, 85)",
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    paddingBottom: "10px",
                  }}
                >
                  {image.name.length > 22
                    ? `${image.name.substring(0, 19)}...`
                    : image.name}
                </p>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "rgb(75, 85, 99)",
                    paddingBottom: "10px",
                  }}
                >
                  {image.description.length > 85
                    ? `${image.description.substring(0, 82)}...`
                    : image.description}
                </p>
                <p
                  style={{ color: "rgb(100, 116, 139)", paddingBottom: "10px" }}
                >
                  ${image.price}
                </p>
                <div
                  className="card-amenities"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    gap: "5px",
                  }}
                >
                  <p
                    style={{
                      color: "rgb(51, 65, 85)",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  >
                    {image.beds} Beds
                  </p>
                  <p
                    style={{
                      color: "rgb(51, 65, 85)",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  >
                    {image.baths} Baths
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};
export default Cards;

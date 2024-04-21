import { Link } from "react-router-dom";
const Comments = ({ commentsArray }) => {
  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const readableTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return readableTime;
  };
  return (
    <div id="comments-container">
      {commentsArray.map((comment) => {
        return (
          <Link
            className="comment-link"
            key={comment._id}
            style={{
              textDecoration: "none",
              borderRadius: "5px",
            }}
            to={`/listing/${comment.postId}`}
          >
            <div
              className="comment"
              style={{
                backgroundColor: "white",
                width: "40vw",
                minHeight: "7vh",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                paddingLeft: "5px",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  paddingBottom: "10px",
                }}
              >
                {comment.content}
              </p>
              <p style={{ backgroundColor: "white", borderRadius: "5px" }}>
                {convertDate(comment.createdAt)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default Comments;

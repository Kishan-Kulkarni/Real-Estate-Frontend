import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  selectCurrentId,
  selectCurrentToken,
} from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const Navbar = () => {
  const token = useSelector(selectCurrentToken);
  const id = useSelector(selectCurrentId);
  const navigate = useNavigate();
  return (
    <div id="navbar">
      <Link to="/">
        <h2>
          <span style={{ color: "rgb(100, 116, 139)" }}>Kishan</span>
          <span style={{ color: "rgb(51, 65, 85)" }}>Estate</span>
        </h2>
      </Link>
      <form autoComplete="off">
        <input type="search" name="search" id="search" placeholder="Search" />
        <button>
          <FontAwesomeIcon icon={faSearch} id="search-icon" />
        </button>
      </form>
      <div id="link-div">
        <Link className="nav-links" to="/">
          Home
        </Link>
        <Link className="nav-links" to="/about">
          About
        </Link>
        {!token ? (
          <Link className="nav-links" to="/login">
            Sign in
          </Link>
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            style={{ background: "rgb(226, 232, 240)", cursor: "pointer" }}
            onClick={() => {
              navigate(`/user/${id}`);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Navbar;

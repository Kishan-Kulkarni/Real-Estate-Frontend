import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";
import ClipLoader from "react-spinners/ClipLoader";

const Login = ({ persistor }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "idle") {
      try {
        setStatus("pending");
        dispatch(login({ userName: userId, password }));
      } catch (error) {
        setStatus("error");
        window.alert(error.message);
      } finally {
        setStatus("idle");
        navigate("/");
      }
    }
  };

  return (
    <div id="login">
      <p>Sign In</p>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="userId"
          id="userId"
          placeholder="User Name"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          style={{ backgroundColor: "rgb(188, 39, 39)" }}
          disabled={!status === "idle"}
        >
          <ClipLoader
            color="#fff"
            size={10}
            animation="border"
            loading={status === "pending"}
          />
          Sign In
        </button>
      </form>
      <button
        style={{ backgroundColor: "rgb(60, 74, 93)" }}
        onClick={() => {
          navigate("/sign-up");
        }}
      >
        Sign Up
      </button>
    </div>
  );
};
export default Login;

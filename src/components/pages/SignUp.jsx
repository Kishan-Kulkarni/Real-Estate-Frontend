import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../features/users/userSlice";

const SignUp = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const handleClick = async () => {
    const formData = new FormData();
    formData.append("user", image);
    formData.append("userName", userId);
    formData.append("password", password);
    try {
      await registerUser(formData).unwrap();
    } catch (error) {
      console.log(error.message);
    } finally {
      navigate("/login");
    }
  };
  return (
    <div id="sign-up">
      <p>Sign Up</p>
      <form>
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
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="file-input-container">
          <input
            type="file"
            id="user"
            name="user"
            onChange={(e) => setImage(e.target.files[0])}
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
        Sign Up
      </button>
      <button
        style={{ backgroundColor: "rgb(188, 39, 39)" }}
        onClick={() => {
          navigate("/login");
        }}
      >
        Sign In
      </button>
    </div>
  );
};
export default SignUp;

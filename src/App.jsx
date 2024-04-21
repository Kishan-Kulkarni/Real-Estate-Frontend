import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Login from "./features/auth/Login";
import UserPage from "./features/users/UserPage";
import RequireAuth from "./features/auth/RequireAuth";
import Navbar from "./components/component/Navbar";
import SignUp from "./components/pages/SignUp";
import Listing from "./components/pages/Listing";
import Layout from "./components/pages/Layout";
import SearchPage from "./features/post/SearchPage";
import NewPost from "./features/post/NewPost";

function App({ persistor }) {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/search" element={<SearchPage />}></Route>
            <Route
              path="/login"
              element={<Login persistor={persistor} />}
            ></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/listing/:id" element={<Listing />}></Route>
            <Route element={<RequireAuth />}>
              <Route path="user/:id" element={<UserPage />}></Route>
              <Route path="new-post" element={<NewPost />}></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

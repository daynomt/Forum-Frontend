import { useContext, useEffect, useState } from "react";
import "./App.css";
import { UserContext } from "../src/context/UserContext";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home/Home/Home";
import Login from "../src/pages/Login/Login";
import SignUp from "../src/pages/SignUp/SignUp";
import Footer from "./pages/Footer/Footer";
import Header from "./pages/Header/Header";
import "../src/Resources/bootstrap.css";
import Askin from "./pages/Home/askinpage/Askin";
import AnswerPage from "./pages/Home/question/AnswerPage";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      const userRes = await axios.get("http://localhost:4000/api/users", {
        headers: { "x-auth-token": token },
      });

      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  // useEffect(() => {
  //   checkLoggedIn();
  // }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={
            <>
              <Header />
              <SignUp />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/asking"
          element={
            <>
              <Header />
              <Askin />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/answer/:postID"
          element={
            <>
              <Header />
              <AnswerPage />
              <Footer />
            </>
          }
        ></Route>

        <Route
          path="/"
          element={
            <>
              <Header />
              <Home logout={logout} />
              <Footer />
            </>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

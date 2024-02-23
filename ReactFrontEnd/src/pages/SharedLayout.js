import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../pagesCSS/SharedLayout.css";
import axios from "axios";
import Login from "./Login";
import SharedLayoutHeader from "../components/SharedLayoutHeader";
import { useState, useEffect } from "react";
export default function SharedLayout() {
  const [logged, isLogged] = useState(false);
  const verifyUser = async () => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      isLogged(false);
    }
    if (jwt.length === 0) {
      isLogged(false);
    }

    const response = await axios.get(
      "http://localhost:8888/api/auth/verifyuser",
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    const { success } = response.data;

    if (success) {
      isLogged(true);
    }
    return;
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      {logged ? <SharedLayoutHeader /> : null}
      {logged ? <Outlet /> : <Login />}
    </>
  );
}

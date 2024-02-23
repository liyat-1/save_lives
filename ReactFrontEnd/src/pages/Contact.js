import React from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const verifyUser = async () => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt || jwt.length === 0) {
      navigate("/login");
    }
    const response = await axios.get(
      "http://localhost:8888/api/auth/verifyuser",
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    const { success } = response.data;
    console.log(success);
    if (!success) {
      navigate("/login");
      return;
    }
  };
  verifyUser();
  return <div>Contact page</div>;
}

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import SinglePost from "../components/SinglePost";
export default function Admin() {
  const navigate = useNavigate();
  const [logged, isLogged] = useState(false);
  const verifyUser = async () => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      navigate("/login");
      return;
    }
    if (jwt.length === 0) {
      navigate("/login");
      return;
    }

    const response = await axios.get(
      "http://localhost:8888/api/auth/verifyuser",
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    const { success, isAdmin } = response.data;

    if (success) {
      if (!isAdmin) {
        navigate("/");
        return;
      }
    } else {
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  // const fetchPosts = async () => {
  //   const posts = await axios.get("http://localhost:5000/api/user/posts");
  //   setPosts(posts.data.posts);
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  return <></>;
}

import { useEffect, useState } from "react";
import axios from "axios";
import t1 from "./images/t1.jpg";
import t2 from "./images/t2.jpg";
import t3 from "./images/t3.jpg";
import t4 from "./images/t4.jpg";
// import "../pagesCSS/blog.css";
import singleBlog from "../components/singleBlog";
import "../components/blogpage.css";
import SingleBlog from "../components/singleBlog";
import "../components/blogpage.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState();
  const getBlogs = async () => {
    const jwt = localStorage.getItem("jwt");

    const response = await axios.get("http://localhost:8888/api/blogs", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    const { success, blogs } = response.data;

    if (!success) {
      return;
    }

    setPosts(blogs);
  };
  useEffect(() => {
    getBlogs();
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setComment((prevCommnet) => {
      return value;
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    if (!comment) {
      return;
    }
    const response = await axios.post(
      "http://localhost:8888/api/blogs",
      {
        comment: comment,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    const { success } = response.data;
    if (!success) {
      return;
    }
    getBlogs();
  };

  return (
    <>
      <div className="conatain">
        <div className="content">
          <h1 style={{ textAlign: "left" }}>Blogs</h1>
          <div className="container-fluid">
            <div>
              <div className="row">
                {posts.length === 0 ? (
                  <h4 style={{ color: "red" }}>Be the first one to post!</h4>
                ) : (
                  posts.map((post) => {
                    return (
                      <SingleBlog
                        key={post.username}
                        className="col-lg-3 w-25"
                        prop={post}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <form>
          <div className="form-group">
            <label htmlFor="title">{localStorage.getItem("username")}</label>
            <textarea
              className="form-control w-75 h-100"
              name="comment"
              id="Textarea1"
              row="10"
              cols="10"
              onChange={handleChange}
            ></textarea>
            <button
              type="button"
              className="btn btn-primary m-4"
              name="submit"
              autoComplete="off"
              onClick={handleClick}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

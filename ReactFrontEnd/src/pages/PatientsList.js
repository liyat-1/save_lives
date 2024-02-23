import { useEffect, useState, React } from "react";
import patient3 from "./images/patient3.jpg";
import axios from "axios";
import { Link, NavigationType, useNavigate } from "react-router-dom";
import SinglePatient from "../components/SinglePatient";

export default function PatientsList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const fetchVerifedPosts = async () => {
    const jwt = localStorage.getItem("jwt");

    const response = await axios.get(
      "http://localhost:8888/api/user/approvedposts",
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    const { success, approvedPosts } = response.data;

    if (!success) {
      return;
    }
    setPosts(approvedPosts);
    return;
  };
  useEffect(() => {
    fetchVerifedPosts();
  });
  return (
    <>
      <section style={{ marginTop: "100px" }}>
        <section className=" py-4 py-xl-5">
          <div className="container">
            <div className="row">
              {posts.length !== 0 ? (
                posts.map((post) => {
                  return <SinglePatient key={post.username} post={post} />;
                })
              ) : (
                <h1>No post Available currently</h1>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

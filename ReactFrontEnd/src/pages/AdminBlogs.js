import React from "react";
import "./AdminBlogs.css";
import { useState, useEffect } from "react";

import { Navigate, useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import SingleAdminBlog from "./SingleAdminBlog";
export default function AdminBlogs() {
  const [posts, setPosts] = useState([]);
  const fetchVerifedPosts = async () => {
    const jwt = localStorage.getItem("jwt");
    const response = await axios.get("http://localhost:8888/api/blogs", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    const { success, blogs } = response.data;

    if (!success) {
      return;
    }
    setPosts(blogs);
    return;
  };
  useEffect(() => {
    fetchVerifedPosts();
  }, []);
  return (
    <>
      <div>
        <div className="content-wrapper" style={{ width: "20000px" }}>
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">Blogs</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Approved Patients
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card" style={{ width: "1570px" }}>
                    <div className="card-header">
                      <h3 className="card-title">Explore Comments</h3>
                    </div>

                    <div className="card-body" style={{ width: "1570px" }}>
                      <div class="container mt-5">
                        <div class="row  d-flex justify-content-center">
                          <div class="col-md-8">
                            <div class="headings d-flex justify-content-between align-items-center mb-3">
                              <div class="buttons">
                                <span class="badge bg-white d-flex flex-row align-items-center">
                                  {posts.length === 0 ? null : (
                                    <span class="text-primary">Comments</span>
                                  )}
                                </span>
                              </div>
                            </div>

                            {posts.length === 0 ? (
                              <h1
                                style={{
                                  color: "red",
                                  textAlign: "center",
                                }}
                              >
                                No available blog
                              </h1>
                            ) : (
                              posts.map((post) => {
                                return (
                                  <SingleAdminBlog key={post._id} prop={post} />
                                );
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

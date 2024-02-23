import UnApprovedPatientsAdmin from "./UnApprovedPatientsAdmin";
import { useState, useEffect } from "react";
import ApprovedRow from "./ApprovedRow";
import { Navigate, useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
export default function PatientListAdmin() {
  const [posts, setPosts] = useState([]);
  const [bannedUserNames, setBannedUserNames] = useState([]);
  const fetchPosts = async () => {
    const jwt = localStorage.getItem("jwt");
    const response = await axios.get("http://localhost:8888/api/user/posts", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const result = await axios.get(
      "http://localhost:8888/api/admin/bannedusers",
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    if (!result.data.success) {
      return;
    }
    if (result.data.success) {
      setBannedUserNames(result.data.bannedUserNames);
    }
    const { success, posts } = response.data;

    if (!success) {
      return;
    }

    setPosts(posts);
    return;
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="content-wrapper" style={{ width: "20000px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Patients List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Approved Patients</li>
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
                    <h3 className="card-title">Patients List</h3>
                  </div>

                  <div className="card-body" style={{ width: "1570px" }}>
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Age</th>
                          <th>Gender</th>
                          <th>Condition</th>
                          <th>Money Required</th>
                          <th>Accumulated Amount</th>
                          <th>Hospital Name</th>
                          <th>Hospital Account</th>
                          <th>Due Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.length === 0 ? (
                          <h1 style={{ color: "red", fontSize: "15px" }}>
                            No currently available post
                          </h1>
                        ) : (
                          posts.map((post) => {
                            if (!bannedUserNames.includes(post.username)) {
                              return (
                                <UnApprovedPatientsAdmin
                                  key={post._id}
                                  prop={post}
                                />
                              );
                            }
                          })
                        )}
                      </tbody>
                      <tfoot></tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

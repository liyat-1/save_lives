import { useState, useEffect } from "react";
import ApprovedRow from "./ApprovedRow";
import { Navigate, useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
export default function ApprovedPatientsList() {
  const [bannedUserNames, setBannedUserNames] = useState([]);

  const [posts, setPosts] = useState([]);
  const fetchVerifedPosts = async () => {
    const jwt = localStorage.getItem("jwt");
    const response = await axios.get(
      "http://localhost:8888/api/user/approvedposts",
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const result = await axios.get(
      "http://localhost:8888/api/admin/bannedusers",
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const { success, approvedPosts } = response.data;
    if (!result.data.success) {
      return;
    }
    if (!success) {
      return;
    }
    if (result.data.success) {
      setBannedUserNames(result.data.bannedUserNames);
    }

    setPosts(approvedPosts);
    return;
  };
  useEffect(() => {
    fetchVerifedPosts();
  }, []);
  return (
    <>
      <div className="content-wrapper" style={{ width: "20000px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Approved Patients</h1>
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
                    <h3 className="card-title">Approved Patients List</h3>
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
                        {posts.length !== 0 ? (
                          posts.map((post) => {
                            if (!bannedUserNames.includes(post.username)) {
                              return <ApprovedRow key={post._id} prop={post} />;
                            }
                          })
                        ) : (
                          <h1 style={{ color: "red", fontSize: "15px" }}>
                            No available approved post
                          </h1>
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
    </>
  );
}

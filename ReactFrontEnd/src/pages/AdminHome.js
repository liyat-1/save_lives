import { useState, useEffect } from "react";
import AdminHospital from "./AdminHospital";
import axios from "axios";

export default function AdminHome() {
  const [bannedUserNames, setBannedUserNames] = useState([]);

  const [hospitals, setHospitals] = useState({
    hospitals: [],
    numbers: [],
  });
  const [users, setUsers] = useState({
    approved: [],
    unApproved: [],
    noPost: [],
  });
  const fetchPosts = async () => {
    const jwt = localStorage.getItem("jwt");
    const response = await axios.get(
      "http://localhost:8888/api/admin/hospitals",
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    const { success, hospitals, numbers } = response.data;

    if (!success) {
      return;
    }

    setHospitals({ hospitals: hospitals, numbers: numbers });
    return;
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <div className="content-wrapper" style={{ width: "20000px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Home</h1>
              </div>
            </div>
            <section className="d-flex gap-4 justify-content-center">
              <div>
                <i className="nav-icon fa fa-user"></i>
                Total current Admins: {hospitals.numbers[5]}
              </div>
              <div>
                <i
                  className="fa fa-user"
                  style={{ color: "green" }}
                  aria-hidden="true"
                ></i>
                Total current Users: {hospitals.numbers[0]}
              </div>
              <div>
                <i className="fa fa-ban" aria-hidden="true"></i>
                Total current Banned Users: {hospitals.numbers[6]}
              </div>
              <div>
                <i className="fa fa-file" aria-hidden="true"></i>
                Total current Posts: {hospitals.numbers[1]}
              </div>
              <div>
                <i
                  className="fa fa-file"
                  style={{ color: "red" }}
                  aria-hidden="true"
                ></i>
                Total current Approved Posts: {hospitals.numbers[2]}
              </div>
              <div>
                <i className="fa fa-hospital-o" aria-hidden="true"></i>
                Total current Hopitals: {hospitals.numbers[3]}
              </div>
              <div>
                <i className="fa fa-comments" aria-hidden="true"></i>
                Total current Blogs: {hospitals.numbers[4]}
              </div>
            </section>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card" style={{ width: "1570px" }}>
                  <div className="card-header">
                    <h3 className="card-title">Hospitals</h3>
                  </div>

                  <div className="card-body" style={{ width: "1570px" }}>
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Hospital Name</th>
                          <th>Hospital Account</th>
                          <th>Paid Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hospitals.hospitals.length === 0 ? (
                          <h1 style={{ color: "red", fontSize: "15px" }}>
                            No currently available post
                          </h1>
                        ) : (
                          hospitals.hospitals.map((hospital) => {
                            return (
                              <AdminHospital
                                key={hospital._id}
                                prop={hospital}
                              />
                            );
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
    </>
  );
}

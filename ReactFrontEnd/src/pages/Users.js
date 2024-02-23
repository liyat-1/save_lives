import { useEffect, useState } from "react";
import axios from "axios";
// import { post } from "../../../backend/routes/admin";
import SingleUser from "./SingleUser";
import BanedUser from "./BanedUser";
// import { post } from "../../../backend/routes/admin";
export default function User() {
  const [problem, setProblem] = useState({ problem: false, msg: "" });
  const [users, setUsers] = useState({
    users: [],
    posts: [],
    approvedPosts: [],
    banUsers: [],
    bannedUserName: [],
  });

  const filter = (users, approvedPosts, posts, banUsers) => {
    let pureUserNames = users.filter((users) => {
      if (!users.isAdmin) {
        return users.username;
      }
    });

    const approvedPostsUserName = approvedPosts.map((post) => {
      return post.username;
    });

    const postsUserName = posts.map((post) => {
      return post.username;
    });
    const pureUsers = pureUserNames.map((user) => {
      return user.username;
    });

    pureUserNames = pureUsers.filter((user) => {
      if (
        !approvedPostsUserName.includes(user) &&
        !postsUserName.includes(user)
      ) {
        return user;
      }
    });

    const banUserName = banUsers.map((user) => {
      return user.username;
    });
    setUsers({
      users: pureUserNames,
      posts: postsUserName,
      approvedPosts: approvedPostsUserName,
      banUsers: banUsers,
      bannedUserName: banUserName,
    });
  };
  const fetchUsers = async () => {
    const jwt = localStorage.getItem("jwt");
    const response = await axios.get("http://localhost:8888/api/admin/users", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    const { success, msg, approvedPosts, posts, users, banUsers } =
      response.data;

    if (!success || users.length === 0) {
      setProblem({ problem: true, msg: msg });
      return;
    }
    filter(users, approvedPosts, posts, banUsers);
    return;
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className="content-wrapper" style={{ width: "20000px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Users</h1>
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
                    <h3 className="card-title">Users</h3>
                  </div>

                  <div className="card-body" style={{ width: "1570px" }}>
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Post Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      {problem.problem ? (
                        <h1 style={{ color: "red", fontSize: "15px" }}>
                          No available user
                        </h1>
                      ) : (
                        <tbody>
                          {users.users.map((user) => {
                            return (
                              <SingleUser
                                key={user}
                                prop={user}
                                status={"No Post"}
                              />
                            );
                          })}
                          {users.posts.map((post) => {
                            if (!users.bannedUserName.includes(post)) {
                              return (
                                <SingleUser
                                  key={post}
                                  prop={post}
                                  status={"Approval Pending"}
                                />
                              );
                            }
                          })}
                          {users.approvedPosts.map((post) => {
                            if (!users.bannedUserName.includes(post)) {
                              return (
                                <SingleUser
                                  key={post}
                                  prop={post}
                                  status={"Approval Accepted!"}
                                />
                              );
                            }
                          })}
                          {users.banUsers.map((post) => {
                            if (users.approvedPosts.includes(post.username)) {
                              return (
                                <BanedUser
                                  key={post.username}
                                  prop={post}
                                  status={"Banned"}
                                  secondStatus={"Approval Accepted!"}
                                />
                              );
                            }
                            if (users.posts.includes(post.username)) {
                              return (
                                <BanedUser
                                  key={post.username}
                                  prop={post}
                                  status={"Banned"}
                                  secondStatus={"Approval Pending"}
                                />
                              );
                            }
                            return (
                              <BanedUser
                                key={post.username}
                                prop={post}
                                status={"Banned"}
                                secondStatus={"No post"}
                              />
                            );
                          })}
                        </tbody>
                      )}
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

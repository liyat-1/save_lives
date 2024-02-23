import { useState } from "react";
import axios from "axios";
export default function UnApprovedPatientsAdmin({ prop }) {
  const {
    username,
    age,
    hospitalName,
    gender,
    hospitalAccount,
    moneyAsked,
    paidAmount,
    dueDate,
    disease,
  } = prop;

  const [deleted, isDeleted] = useState(false);
  const [error, setError] = useState({ truth: false, msg: "" });
  const handleApprove = async () => {
    const truth = window.confirm(
      `Are you sure you want to Approve ${username}'s post ?`
    );

    if (!truth) {
      return;
    }
    const jwt = localStorage.getItem("jwt");

    const response = await axios.post(
      `http://localhost:8888/api/admin/verifiedposts`,
      {
        username: username,
        age: age,
        dueDate: dueDate,
        gender: gender,
        moneyAsked: Number(moneyAsked),
        paidAmount: Number(paidAmount),
        disease: disease,
        hospitalAccount: hospitalAccount,
        hospitalName: hospitalName,
      },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const { success, msg } = response.data;
    if (!success) {
      setError({ truth: true, msg: msg });
      return;
    }
    isDeleted(true);
  };

  const handleReject = async () => {
    const truth = window.confirm(
      `Are you sure you want to reject ${username}'s post?`
    );

    if (!truth) {
      return;
    }
    const jwt = localStorage.getItem("jwt");

    const response = await axios.delete(
      `http://localhost:8888/api/admin//verifedposts/${username}`,

      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const { success, msg } = response.data;
    if (!success) {
      setError({ truth: true, msg: msg });
      return;
    }
    isDeleted(true);
  };

  return (
    <>
      {deleted ? null : (
        <tr>
          <td>{username}</td>
          <td>{age}</td>
          <td>{gender}</td>

          <td>{disease}</td>
          <td>{moneyAsked}</td>
          <td>{paidAmount}</td>
          <td>{hospitalName}</td>
          <td>{hospitalAccount}</td>
          <td>{dueDate}</td>
          <td>
            <button
              type="button"
              className="btn btn-success"
              style={{ marginRight: "10px" }}
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleReject}
            >
              Reject
            </button>
            <div style={{ color: "red" }}>{error.truth ? error.msg : null}</div>
          </td>
        </tr>
      )}
    </>
  );
}

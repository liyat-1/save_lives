import React from "react";
import "./singlepost.css";
export default function SinglePost(props) {
  const {
    username,
    postID,
    age,
    userID,
    dueDate,
    moneyAsked,
    unPaidAmount,
    disease,
    gender,
  } = props.post;

  return (
    <div className="post__container">
      <section>
        <section>Name: {username}</section>
        <section>Age: {age}</section>
      </section>
      <section>
        <section>Condition: {disease}</section>
        <section>Gender: {gender}</section>
      </section>
      <section>
        <section>Money Asked: {moneyAsked}</section>
        <section>Money Paid: {unPaidAmount}</section>
        <section>Due Date: {dueDate}</section>
      </section>
    </div>
  );
}

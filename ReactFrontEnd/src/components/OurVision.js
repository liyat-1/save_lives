import React from "react";
import "./ourvision.css";
import person1 from "../images/Logo.png";
import { useNavigate } from "react-router-dom";
export default function OurVision() {
  const navigate = useNavigate();
  const handleSupport = () => {
    navigate("/supportus");
  };
  return (
    <div className="ourvision__container">
      <h5 className="ourvision__header">Our Vision</h5>
      <span className="ourvision__span"></span>
      <section className="ourvision__section">
        <section className="content">
          <p className="ourvision__para">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            eos impedit exercitationem assumenda iste. Ullam tenetur corrupti
            provident nihil molestiae cumque accusamus aliquid, id possimus
            repellat velit fuga esse quasi! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Repellat eos impedit exercitationem
            assumenda iste. Ullam tenetur corrupti provident nihil molestiae
            cumque accusamus aliquid, id possimus repellat velit fuga esse
            quasi!
          </p>
          <button className="ourvision__btn" onClick={handleSupport}>
            Support Us
          </button>
        </section>
        <section className="img__container">
          <img className="img" src={person1} alt="" />
        </section>
      </section>
    </div>
  );
}

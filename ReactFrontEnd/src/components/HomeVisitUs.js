import React from "react";
import "./homevisitus.css";
import { useNavigate } from "react-router-dom";
export default function HomeVisitUs() {
  const navigate = useNavigate();
  const switchVisitus = () => {
    navigate("/patientlist");
  };
  return (
    <div className="visitus__container">
      <h1 className="visitus__header">Save Lives</h1>
      <h3 className="visitus__secondheader">SOME LONGER TEXT HERE</h3>
      <p className="visitus__para">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum distinctio
        necessitatibus ipsa dicta nemo, fugiat minus temporibus pariatur
        recusandae, animi quam. Quibusdam illum earum, eos ad tenetur vel
        doloremque placeat. Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Earum, ad cupiditate repudiandae animi, delectus sed dolorem est
        eum, neque quaerat in error atque consectetur nesciunt reiciendis nulla?
        Libero voluptatum distinctio commodi velit ad autem corrupti vitae, rem
        ullam quo id? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Eum distinctio necessitatibus ipsa dicta nemo, fugiat minus temporibus
        pariatur recusandae, animi quam. Quibusdam illum earum, eos ad tenetur
        vel doloremque placeat.
      </p>
      <button onClick={switchVisitus} className="visitus__button">
        Visit Us
      </button>
    </div>
  );
}

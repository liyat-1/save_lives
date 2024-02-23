import React from "react";
import axios from "axios";
import { Link, useNavigate, NavLink } from "react-router-dom";
export default function AboutUs() {
  const navigate = useNavigate();
  const verifyUser = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || jwt.length === 0) {
      navigate("/login");
    }
    const response = await axios.get(
      "http://localhost:8888/api/auth/verifyuser",
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    const { success } = response.data;
    console.log(success);
    if (!success) {
      navigate("/login");
      return;
    }
  };
  verifyUser();
  return (
    <>
      <div id="hero"></div>
      <section id="about">
        <div>
          <h1>All You Need To Know About What We Do!</h1>
          <p>
            Introduction The rapid spread of SARS-CoV-2, the varying vaccine
            coverage, and the appearance of new variants posed a significant
            threat during the pandemic, especially in LMIC countries. Hospitals
            in Vietnam at both central and local levels have had cross-infection
            of patients and healthcare workers. Therefore, providing a safe and
            secure environment for staff and patients was a major focus for all
            healthcare institutions. Methods We conducted a cross-sectional
            study, using both quantitative and qualitative methods, to answer
            the question of how hospital safety during the COVID-19 pandemic in
            Vietnamese hospitals was implemented and what the challenges were.
            Secondary data from a recent national survey of safety in 1,398
            hospitals conducted by the Vietnam Ministry of Health (MOH) were
            extracted and analyzed. In-depth interviews of key health managers
            and health staff in four selected hospitals were performed to
            further explore challenges in implementing Decision 3088/QD-BYT.
            Results The proportion of hospitals classified as “safe hospital”,
            “safe hospital with moderate level”, and “unsafe hospital” was
            91.7%, 7.3%, and 1.0%, respectively. The rate of “safe hospital” was
            highest in the central level hospitals (96.1%), followed by private
            hospitals (94.4%), provincial hospitals (94.2%), specialized
            hospitals (93.1%), regional hospitals (93.0%), and district
            hospitals (89.9%), while “safe hospital” rates were lowest in the
            ministerial level hospital group (82.2%). Challenges in ensuring
            hospital safety in public and private hospitals related to COVID-19
            transmission, such as lack of preparedness before COVID-19 and other
            pandemics, limited hospital facility, limited space and equipment,
            shortage of human resources, inadequate training and knowledge
            transfer, poor patient compliance in declaring health conditions,
            and lack of patient understanding of infection prevention methods,
            were explored. saepe! Accusamus incidunt adipisci iure doloremque
            eligendi itaque iusto beatae officia. Officia quam nesciunt vero
            itaque, saepe dolores, veritatis quod corrupti perferendis aliquam
            dolorum a libero magni quas vitae amet provident voluptate
            consectetur, doloribus impedit numquam minus! Consequuntur inventore
            fugiat vitae commodi laborum, veniam doloremque doloribus placeat
            dolor quos alias sed, dignissimos provident ab amet rem consequatur
            ad aliquid praesentium possimus esse ratione sunt, sit obcaecati!
            Qui obcaecati eos cupiditate repudiandae quam! Corporis id dicta,
            necessitatibus ad vel explicabo hic in vero atque eligendi molestiae
            veniam porro suscipit.
          </p>
        </div>
      </section>
      <footer className="footer">
        <div className="container__footer container__flex">
          <div id="footer-links">
            <ul id="footer__linkList">
              <li className="footer__links">
                <NavLink to="/aboutus">About</NavLink>
              </li>

              <li className="footer__links">
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li className="footer__links">
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li className="footer__links">
                <NavLink to="/ourserivce">service</NavLink>
              </li>
            </ul>
          </div>
          <div id="footer-contact">
            <ul id="footer__contact">
              <li className="contact__list">contact</li>
              <li className="contact__list">+2519878378</li>
              <li className="contact__list">+2519878378</li>
              <li className="contact__list">+2519878378</li>
            </ul>
          </div>
          <div id="footer-logo">
            <div>
              <div id="footer-image-name">
                <h1 id="footer__logo__header1">
                  <i className="fa fa-stethoscope"></i>
                  <span style={{ color: "greenyellow" }}>Save</span>
                  <span style={{ color: "white" }}>lives</span>
                </h1>
              </div>
              <div id="footer-socials">
                <h2 id="footer__socials__header2">Follow Us On</h2>
                <div>
                  <ul id="footer__socials__list">
                    <li className="footer__social__links">
                      <a href="#" className="instagram">
                        <i
                          className="fa-brands fa-instagram"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        instagram
                      </a>
                    </li>
                    <li className="footer__social__links">
                      <a href="#" className="facebook">
                        <i
                          className="fa-brands fa-facebook"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        facebook
                      </a>
                    </li>
                    <li className="footer__social__links">
                      <a href="#" className="twitter">
                        <i
                          className="fa-brands fa-twitter"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        twitter
                      </a>
                    </li>
                    <li className="footer__social__links">
                      <a href="#" className="linkedin">
                        <i
                          className="fa-brands fa-linkedin"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        linkedin
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="footer__text">
          <i className="bi bi-c-circle me-2"></i>All Rights reserved save lives
        </p>
      </footer>
    </>
  );
}

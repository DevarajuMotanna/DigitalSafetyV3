// eslint-disable-next-line
import React from "react";
import "./style.css";
import MARUTI_LOGO from "./../../assets/maruti-logo.png";
import RIGHT_ARROW from "../../assets/right_arrow_circle.png";
import { useNavigate } from "react-router-dom";

const MarutiHomePage = () => {
  const navigate = useNavigate();
 const LABELS = {
  HEADING:"Safety Digitalization Platform",
   SUB_HEADING:'Stay Safe Today,Secure a Better Tomorrow',
   SUB_TEXT:'Dive Into Safety Platform'
 }
  const handleNavigate = () => {
    navigate("/cards");
  };
  return (
    <div className="main-screen">
      <div className="logo-icon">
        <img src={MARUTI_LOGO} className="logo_maruti"></img>
      </div>
      <div className="main-heading">
        <h1 className="heading">{LABELS?.HEADING}</h1>
        <h6 className="subHeading">{LABELS?.SUB_HEADING}</h6>
        <div className="subText">
          <p>{LABELS?.SUB_TEXT}</p>
          <div>
            <img
              className="arrow"
              onClick={handleNavigate}
              src={RIGHT_ARROW}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarutiHomePage;

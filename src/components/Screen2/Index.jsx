// eslint-disable-next-line
import React from "react";
import "./Index.css";
import ArrowIcon from "../../assets/white_arrow.png";
import RISK_ICON from "../../assets/risk.png";
import LADY_ICON from "../../assets/lady.png";
import GREEN_IMAGE from "../../assets/Green.png";
import ORANGE_IMAGE from "../../assets/orange.png";
import BLUE_IMAGE from "../../assets/blue.png";
import GROUP_ICON from "../../assets/Group 47609.png";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import vector from "../../assets/Vector 1.png";

const cardData = [
  {
    title: "KY Hazard Application",
    description: "Hazard Recommendation Engine",
    linkText: "Explore The Appllication",
    background: BLUE_IMAGE,
    icon: RISK_ICON,
    color: "#10164C",
    link: "KYHazard",
  },
  {
    title: "Work Permit Digitalisation",
    description: "Permit digitization",
    linkText: "Explore The Appllication",
    background: GREEN_IMAGE,
    icon: LADY_ICON,
    color: "#335c67",
    link: "dashboard",
  },
  {
    title: "",
    description: "",
    linkText: "",
    background: ORANGE_IMAGE,
    icon: GROUP_ICON,
    color: "#F17A3C",
    link: "#",
  },
];

function CardComponent() {
  return (
    <>
      <Navbar />
      <div className="container-body">
        <h4>Applications</h4>
        <div className="card-container-home">
          {cardData.map((card, index) => (
            <div
              className="cardNew"
              style={{
                backgroundImage: `url(${card?.background})`,
                backgroundColor: card.color,
              }}
              key={index}
            >
              <div className="text-content">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <div className="icon-text-container">
                  <Link to={card.link} className="link">
                    {card?.linkText}
                  </Link>
                  {index !== 2 && (
                    <>
                      <img
                        className="arrow-icon"
                        height={"50px"}
                        width={"30px"}
                        src={ArrowIcon}
                        alt="arrow-icon"
                      ></img>
                      <div className="icon-undeline">
                        <img
                          className="arrow-icon"
                          height={"2px"}
                          width={"180px"}
                          src={vector}
                          alt="arrow-icon"
                        ></img>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="image">
                {index === 0 ? (
                  <img
                    height="130px"
                    width="100px"
                    style={{ marginTop: "-20px" }}
                    src={card?.icon}
                    alt="risk"
                  ></img>
                ) : (
                  <img
                    height="100px"
                    width="100px"
                    src={card?.icon}
                    alt="risk"
                  ></img>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CardComponent;

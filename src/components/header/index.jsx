// import React from 'react'
import logoWhite from "./../../assets/logo_white.svg";
import userIcon from "./../../assets/user-icon.svg";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className=" text-light py-2">
      <div className="">
        <div className=" row align-items-center background-blue">
          <Link
            to="/dashboard"
            className="col-6"
            style={{ backgroundColor: "blue", py: 1, px: 2 }}
          >
            <img src={logoWhite} alt="Logo" className="img-fluid " />
          </Link>
          <div
            className="col-6 d-flex align-items-center justify-content-end profile-name"
            role="button"
          >
            <span className="me-4">John doe</span>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle color-white"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={userIcon}
                  alt="Profile Photo"
                  className="rounded-circle me-2 profile-icon"
                />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

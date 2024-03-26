// import React from 'react';
import "./sidebar.css";
import dashboard_icon from "./../../assets/dashboard_icon.svg";
import work_permit_icon from "./../../assets/doc_icon.svg";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <NavLink to="/cards/dashboard" className="menu-item">
        <img src={dashboard_icon} alt="dashboard_icon" className="icon" />
        <span className="menu-text">Dashboard</span>
      </NavLink>
      <NavLink to="/cards/work-permit" className="menu-item">
        <img src={work_permit_icon} alt="dashboard_icon" className="icon" />
        <span className="menu-text">Work permits</span>
      </NavLink>
    </div>
  );
};
export default Sidebar;

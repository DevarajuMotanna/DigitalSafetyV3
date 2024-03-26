import { useEffect, useState } from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import "../../App.scss";
import { Outlet } from "react-router-dom";

function Clock() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  const date = dateTime.toDateString();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="clock ">
      <h5 className="time">
        {date} {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </h5>
    </div>
  );
}

// eslint-disable-next-line
const MainLayout = ({ children }) => {
  return (
    <div className="">
      <div className="header-container">
        <Header />
        <Clock />
      </div>
      <div className="row d-flex">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default MainLayout;

// eslint-disable-next-line
export const MainLayoutWithOutClock = ({ children }) => {
  return (
    <div className="">
      <div className="header-container">
        <Header />
      </div>
      <div className="row d-flex">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

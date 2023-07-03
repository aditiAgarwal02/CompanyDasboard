import React, { useState } from "react";
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import "./Alerts.scss";

const Alerts = () => {
  const [startDate, setStartDate] = useState("2020-02-20");
  const [endDate, setEndDate] = useState("2021-11-24");
  const [csaName, setCSAName] = useState(""); // Add state for CSA Name
  return (
    <div className="alerts">
       <Sidebar />
       <div className="Apage">
        <Navbar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          csaName={csaName}
          setCSAName={setCSAName}
          className="extended-navbar"
        />
        <div className="container">
          To be continued.....
          </div>
          </div>
    </div>
  )
}

export default Alerts

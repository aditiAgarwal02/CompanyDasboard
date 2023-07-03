import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import PHBW2 from "../../Components/Charts/PHBW2";
import "./CSAn.scss";
import ThresholdBW2 from "../../Components/Charts/ThresholdBW2";
import Pi2 from "../../Components/Charts/Pi2";
import TotalD2 from "../../Components/Charts/TotalD2";
import TotalU2 from "../../Components/Charts/TotalU2";

const CSAn = () => {
  const [startDate, setStartDate] = useState("2021-08-18");
  const [endDate, setEndDate] = useState("2022-01-10");
  const [csaName, setCSAName] = useState("Prospect CSA"); 

  return (
    <div className="CSA">
      <Sidebar />
      <div className="CSApage">
        <Navbar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          csaName={csaName}
          setCSAName={setCSAName}
        />
        <div className="container">
          <div className="top">
            <div className="widget d2">
              <TotalD2
                startDate={startDate}
                endDate={endDate}
                csaName={csaName}
                style={{ height: "50px", width: "200px" }}
              />
            </div>
            <div className="widget pi">
              <Pi2
                csaName={csaName}
                startDate={startDate}
                endDate={endDate}
                style={{ height: "50px", width: "200px" }}
              />
            </div>
            <div className="widget">
              <TotalU2
                startDate={startDate}
                endDate={endDate}
                csaName={csaName} 
                style={{ height: "50px", width: "200px" }}
              />
            </div>
          </div>
          <div className="bottom">
            <div className="widget">
              <PHBW2
                csaName={csaName}
                startDate={startDate}
                endDate={endDate}
                style={{ height: "50px", width: "200px" }}
              />
            </div>
            <div className="widget ">
              <ThresholdBW2
                csaName={csaName}
                startDate={startDate}
                endDate={endDate}
                style={{ height: "50px", width: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSAn;

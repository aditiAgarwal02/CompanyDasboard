import React, { useState } from "react";
import "./Summary.scss";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import SubBW from "../../Components/Charts/SubBW";
import SubPH from "../../Components/Charts/SubPH";
import SubTrend from "../../Components/Charts/SubTrend";
import AvgPH1 from "../../Components/Charts/AvgPH1";
import Insights from "../../Components/Charts/Insights";


const Summary = () => {
  const [startDate, setStartDate] = useState("2021-08-18");
  const [endDate, setEndDate] = useState("2021-12-30");

  return (
    <div className="summary">
      <Sidebar />
      <div className="page">
        <Navbar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <div className="container">
          <div className="left">
            <div className="top">
            <Insights endDate={endDate} style={{padding: "1px 2px"}}/> 
            </div>
            <div className="bottom">
              <div className="widget">
              <SubBW startDate={startDate} endDate={endDate} style={{ padding:"10px",height: "50px", width: "200px" }}/>
              </div>
              <div className="widget">
              <SubPH startDate={startDate} endDate={endDate} style={{ padding:"10px",height: "50px", width: "200px" }} /> 
              </div>
            </div>
            
          
            
          </div>
          <div className="right"> 
          <div className="top">
          <SubTrend startDate={startDate} endDate={endDate} style={{ padding:"10px",height: "40px", width: "200px" }}/>
          </div>
          <div className="bottom">
          <AvgPH1 startDate={startDate} endDate={endDate} style={{ padding:"10px",height: "40px", width: "200px"}}/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;

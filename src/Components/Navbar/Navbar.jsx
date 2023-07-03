import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.scss";
import subscriberData from "../../dataset/18-08-2021.json";

const Navbar = ({ startDate, endDate, setStartDate, setEndDate, setCSAName }) => {
  const location = useLocation();

        const renderTitle = () => {
          if (location.pathname === "/summary" || location.pathname === "/") {
            return <h1 style={{color:"rgb(204 58 45)"}}>Summary Dashboard</h1>;
          } else if (location.pathname.includes("/analysis")) {
            const csaAnalysisTitle = csaName ? `${csaName} CSA Analysis` : "CSA Analysis";
            return <h1 style={{color:"rgb(204 58 45)"}}>{csaAnalysisTitle}</h1>;
          } else if (location.pathname.includes("/alerts")) {
            return <h1 style={{color:"rgb(204 58 45)"}}>Alerts</h1>;
          } else {
            return null;
          }
        };
      
        const getUniqueCSANames = () => {
          const csaNames = subscriberData
            .map((item) => item["CSA Name"])
            .filter((name, index, self) => self.indexOf(name) === index && name);
          return csaNames;
        };
      
        const [csaName, setCSANameLocal] = useState(getUniqueCSANames()[0]);
      
        const renderDropdownMenu = () => {
          const uniqueCSANames = getUniqueCSANames();
          const options = uniqueCSANames.map((csaName) => (
            <option key={csaName} value={csaName}>
              {csaName}
            </option>
          ));
      
          return (
            <select
              className="csa-dropdown"
              value={csaName}
              onChange={(e) => {
                setCSANameLocal(e.target.value);
                setCSAName(e.target.value);
              }}
            >
              <option value="">Select CSA Name</option>
              {options}
            </select>
          );
        };
      
        const handleEndDateChange = (e) => {
          const selectedDate = e.target.value;
          const maxDate = "2023-12-31"; // Set your desired maximum date here
      
          // Check if the selected date is greater than the maximum date
          if (selectedDate > maxDate) {
            setEndDate(maxDate); // Set the endDate to the maximum date
          } else {
            setEndDate(selectedDate); // Set the endDate to the selected date
          }
        };
      
        return (
          <div className="navbar">
            <div className="wrapper">
              <div className="left">{renderTitle()}</div>
              <div className="right">
                {location.pathname.includes("/analysis") ? renderDropdownMenu() : null}
                <input
                  type="date"
                  className="strt"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  readOnly
                />
                <input
                  type="date"
                  className="end"
                  value={endDate}
                  max="2023-12-31" // Set the maximum date value
                  onChange={handleEndDateChange} // Use the custom handler for endDate change
                />
              </div>
            </div>
          </div>
        );
      };
      
      export default Navbar;
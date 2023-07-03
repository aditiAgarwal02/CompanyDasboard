import React, { useState, useEffect } from "react";
import moment from "moment";
import subscriberData from "../../dataset/18-08-2021.json";

const TotalU2 = ({ csaName, startDate, endDate }) => {
  const [totalUploads, setTotalUploads] = useState(0);
  const [averageUploadPerUser, setAverageUploadPerUser] = useState(0);
  const [peakHourUsage, setPeakHourUsage] = useState(0);

  useEffect(() => {
    // Filtered data based on CSA Name, start date, and end date
    const filteredData = subscriberData.filter((item) => {
      const itemDate = moment(item.Date, "DD-MM-YYYY HH:mm");
      const itemDateFormatted = itemDate.format("YYYY-MM-DD");

      return (
        item["CSA Name"] === csaName &&
        moment(itemDateFormatted).isSameOrAfter(startDate) &&
        moment(itemDateFormatted).isSameOrBefore(endDate)
      );
    });

    // Calculate total uploads
    const total = filteredData.reduce((sum, item) => sum + parseFloat(item["Total Upload (GB)"]), 0);
    setTotalUploads(total);

    // Calculate average upload per user
    const totalUsers = filteredData.reduce((sum, item) => sum + parseInt(item["Total Users"]), 0);
    const average = total / totalUsers;
    setAverageUploadPerUser(average);

    // Find the peak hour usage
    const maxPeakHourUsage = Math.max(...filteredData.map((item) => parseFloat(item["Peak Hour - Usage (GB)"])));
    setPeakHourUsage(maxPeakHourUsage);
  }, [subscriberData, startDate, endDate, csaName]);

  return (
    <div>
    <h3 style={{ marginTop:"-35px",marginBottom:"35px",textAlign: "center" }}>Upload Statistics for {csaName}</h3>
    <p style={{ marginBottom: "-10px"}}>Total Uploads:</p>
    <p style={{ fontSize: "20px", color: "red", marginBottom: "10px" }}>
      {totalUploads.toFixed(2)} GB
    </p>
    <p style={{ marginBottom: "-10px"}}>Average Upload per User:</p>
    <p style={{ fontSize: "20px", color: "red", marginBottom: "10px" }}>
      {averageUploadPerUser.toFixed(2)} GB
    </p>
    <p style={{ marginBottom: "-10px"}}>Peak Hour Usage:</p>
    <p style={{ fontSize: "20px", color: "red", marginBottom: "-0" }}>
      {peakHourUsage.toFixed(2)} GB
    </p>
  </div>
  );
};

export default TotalU2;
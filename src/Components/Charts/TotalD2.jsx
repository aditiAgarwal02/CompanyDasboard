import React, { useState, useEffect } from "react";
import moment from "moment";
import subscriberData from "../../dataset/18-08-2021.json";

const TotalD2 = ({ csaName, startDate, endDate }) => {
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [averageDownloadPerUser, setAverageDownloadPerUser] = useState(0);
  const [peakHour, setPeakHour] = useState("");

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

    // Calculate total downloads
    const total = filteredData.reduce((sum, item) => sum + parseFloat(item["Total Download (GB)"]), 0);
    setTotalDownloads(total);

    // Calculate average download per user
    const totalUsers = filteredData.reduce((sum, item) => sum + parseInt(item["Total Users"]), 0);
    const average = total / totalUsers;
    setAverageDownloadPerUser(average);

    // Find the peak hour
    const maxPeakHourUsage = Math.max(...filteredData.map((item) => parseFloat(item["Peak Hour - Usage (GB)"])));
    const peakHourData = filteredData.find((item) => parseFloat(item["Peak Hour - Usage (GB)"]) === maxPeakHourUsage);
    setPeakHour(peakHourData["Peak Hour"]);
  }, [subscriberData, startDate, endDate, csaName]);

  return (
    <div>
    <h3 style={{ marginTop:"-35px",marginBottom:"33px",textAlign: "center" }}>Download Statistics for {csaName}</h3>
    <p style={{ marginBottom: "-10px" }}>Total Downloads:</p>
    <p style={{ fontSize: "20px", color: "red", marginBottom: "10px" }}>
      {totalDownloads.toFixed(2)} GB
    </p>
    <p style={{ marginBottom: "-10px" }}>Average Download per User: </p>
    <p style={{ fontSize: "20px", color: "red", marginBottom: "10px" }}>
      {averageDownloadPerUser.toFixed(2)} GB
    </p>
    <p style={{ marginBottom: "-10px" }}>Peak Hour: </p>
    <p style={{ fontSize: "20px", color: "red", marginBottom: "0" }}>{peakHour}</p>
  </div>
  );
};

export default TotalD2;
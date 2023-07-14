import React, { useState, useEffect } from "react";
import jsonFile from "../../dataset/18-08-2021.json";
import moment from "moment";
import "./Insights.scss";

const Insights = ({ endDate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsage, setTotalUsage] = useState(null);
  const [totalSubscribers, setTotalSubscribers] = useState(null);
  const [totalPeakHourUsage, setTotalPeakHourUsage] = useState(null);
  const [totalCities, setTotalCities] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const filteredData = jsonFile.filter((item) => {
        const itemDate = moment(item.Date, "DD-MM-YYYY HH:mm");
        const itemDateFormatted = itemDate.format("YYYY-MM-DD");
        return moment(itemDateFormatted).isSame(endDate, "month");
      });

      if (filteredData.length > 0) {
        const usageSum = filteredData.reduce(
          (accumulator, item) => accumulator + parseFloat(item["Total Usage (GB)"]),
          0
        );
        setTotalUsage(usageSum.toFixed(2));

        const subscribersSum = filteredData.reduce(
          (accumulator, item) => {
            const totalUsers = parseInt(item["Total Users"], 10);
            return isNaN(totalUsers) ? accumulator : accumulator + totalUsers;
          },
          0
        );
        setTotalSubscribers(subscribersSum);

        const peakHourSum = filteredData.reduce(
          (accumulator, item) => accumulator + parseFloat(item["Peak Hour - Usage (GB)"]),
          0
        );
        setTotalPeakHourUsage(peakHourSum.toFixed(2));

        setTotalCities(filteredData.length);
      } else {
        setTotalUsage(0);
        setTotalSubscribers(0);
        setTotalPeakHourUsage(0);
        setTotalCities(0);
      }

      setIsLoading(false);
    }, 1500);
  }, [endDate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="insights-table">
      <h2 className="table-title">Overall Insights for {moment(endDate).format("MMMM YYYY")}</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Usage (GB)</td>
            <td>{totalUsage !== null ? totalUsage : "-"}</td>
          </tr>
          <tr>
            <td>Total Subscribers</td>
            <td>{totalSubscribers !== null ? totalSubscribers : "-"}</td>
          </tr>
          <tr>
            <td>Total Peak Hour Usage (GB)</td>
            <td>{totalPeakHourUsage !== null ? totalPeakHourUsage : "-"}</td>
          </tr>
          <tr>
            <td>Total Cities</td>
            <td>{totalCities !== null ? totalCities : "-"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Insights;
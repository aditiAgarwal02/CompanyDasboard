import React, { useState, useEffect } from "react";
import jsonFile from "../../dataset/18-08-2021.json";
import "./Insights.scss";

const Insights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsage, setTotalUsage] = useState(0);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [totalPeakHourUsage, setTotalPeakHourUsage] = useState(0);
  const [totalCities, setTotalCities] = useState(0);

  useEffect(() => {
    // Simulating data loading delay
    setTimeout(() => {
      const data = jsonFile;

      // Calculate total usage
      const usageSum = data.reduce(
        (accumulator, item) =>
          accumulator + parseFloat(item["Total Usage (GB)"]),
        0
      );
      setTotalUsage(usageSum.toFixed(2));

      // Calculate total subscribers
      const subscribersSum = data.reduce(
        (accumulator, item) => {
          const totalUsers = parseInt(item["Total Users"], 10);
          return isNaN(totalUsers) ? accumulator : accumulator + totalUsers;
        },
        0
      );
      setTotalSubscribers(subscribersSum);

      // Calculate total peak hour usage
      const peakHourSum = data.reduce(
        (accumulator, item) =>
          accumulator + parseFloat(item["Peak Hour - Usage (GB)"]),
        0
      );
      setTotalPeakHourUsage(peakHourSum.toFixed(2));

      // Calculate total cities
      const citiesCount = data.length;
      setTotalCities(citiesCount);

      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="insights-table">
      <h2 className="table-title">Overall Insights on 18 August 2021</h2>
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
            <td>{totalUsage}</td>
          </tr>
          <tr>
            <td>Total Subscribers</td>
            <td>{String(totalSubscribers)}</td>
          </tr>
          <tr>
            <td>Total Peak Hour Usage (GB)</td>
            <td>{totalPeakHourUsage}</td>
          </tr>
          <tr>
            <td>Total Cities</td>
            <td>{totalCities}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Insights;
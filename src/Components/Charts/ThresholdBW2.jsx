import React, { useState, useEffect } from "react";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import moment from "moment";
import subscriberData from "../../dataset/18-08-2021.json";

const ThresholdBW2 = ({ csaName, startDate, endDate }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Filtered data based on startDate, endDate, and CSAName
    const filteredData = subscriberData.filter((item) => {
      const itemDate = moment(item.Date, "DD-MM-YYYY HH:mm");
      const itemDateFormatted = itemDate.format("YYYY-MM-DD");

      return (
        item["CSA Name"] === csaName &&
        moment(itemDateFormatted).isSameOrAfter(startDate) &&
        moment(itemDateFormatted).isSameOrBefore(endDate)
      );
    });

    // Calculate the threshold bandwidth and bandwidth values
    const dataMap = new Map();

    filteredData.forEach((item) => {
      const date = item.Date;
      const bandwidth = parseFloat(item["Bandwidth (Mbps)"]);
      const existingBandwidth = dataMap.get(date) || 0;

      if (bandwidth > existingBandwidth) {
        dataMap.set(date, bandwidth);
      }
    });

    const chartValues = Array.from(dataMap.entries()).map(([date, bandwidth]) => {
      const thresholdBandwidth = (0.6 * bandwidth).toFixed(2);

      return {
        date,
        thresholdBandwidth: Number(thresholdBandwidth),
        bandwidth,
      };
    });

    setChartData(chartValues);
  }, [subscriberData, startDate, endDate, csaName]);

  return (
    <div>
      <h2>Bandwidth and Threshold Bandwidth (Mbps)</h2>
      <BarChart width={600} height={300} data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="bandwidth" fill="rgba(52, 152, 219, 0.6)" />
        <Bar dataKey="thresholdBandwidth" fill="rgba(255, 99, 132, 0.6)" />
      </BarChart>
    </div>
  );
};

export default ThresholdBW2;
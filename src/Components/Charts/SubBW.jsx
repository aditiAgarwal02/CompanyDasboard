import React, { useState, useEffect } from "react";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import moment from "moment";
import subscriberData from "../../dataset/18-08-2021.json";

const SubBW = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const filteredData = subscriberData.filter((item) => {
      const itemDate = moment(item.Date, "DD-MM-YYYY HH:mm");
      const itemDateFormatted = itemDate.format("YYYY-MM-DD");

      return itemDateFormatted >= startDate && itemDateFormatted <= endDate;
    });

    const groupedData = {};
    filteredData.forEach((item) => {
      const bandwidth = parseFloat(item["Bandwidth (Mbps)"]);
      const totalUsers = parseInt(item["Total Users"]);

      if (!groupedData[bandwidth]) {
        groupedData[bandwidth] = 0;
      }

      groupedData[bandwidth] += totalUsers;
    });

    const processedData = Object.keys(groupedData).map((bandwidth) => ({
      Bandwidth: parseFloat(bandwidth),
      Subscribers: groupedData[bandwidth],
    }));

    setChartData(processedData);
  }, [startDate, endDate]);

  return (
    <div>
      <h3 style={{ fontSize: "16px", marginBottom: "15px" }}>Subscribers By Bandwidth(Mbps)</h3>
      <BarChart width={250} height={300} data={chartData} margin={{ left: -35, bottom: 20 }}>
        <XAxis
          dataKey="Bandwidth"
          label={{ value: "Bandwidth (Mbps)", position: "insideBottom", offset: 10 }}
          ticks={[chartData[0]?.Bandwidth, chartData[chartData.length - 1]?.Bandwidth]}
        />
        <YAxis label={{ value: "Subscribers", angle: -90, position: "insideLeft", offset: 40, dy: 40 }} tick={false} />
        <Tooltip />
        <Bar dataKey="Subscribers" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default SubBW;
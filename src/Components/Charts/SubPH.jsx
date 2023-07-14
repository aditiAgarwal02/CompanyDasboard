import React, { useState, useEffect } from "react";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import subscriberData from "../../dataset/18-08-2021.json";
import moment from "moment";

const SubPH = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const filteredData = subscriberData.filter((item) => {
      const itemDate = moment(item.Date, "DD-MM-YYYY HH:mm");
      const itemDateFormatted = itemDate.format("YYYY-MM-DD");

      return itemDateFormatted >= startDate && itemDateFormatted <= endDate;
    });

    const groupedData = {};
    filteredData.forEach((item) => {
      const date = moment(item.Date, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD");
      const totalUsers = parseFloat(item["Total Users"]);

      if (!groupedData[date]) {
        groupedData[date] = 0;
      }

      groupedData[date] += totalUsers;
    });

    const processedData = Object.keys(groupedData).map((date) => ({
      Date: date,
      Subscribers: groupedData[date],
    }));

    const sortedData = processedData.sort((a, b) => moment(a.Date).diff(moment(b.Date)));
    setChartData(sortedData);
  }, [startDate, endDate]);

  return (
    <div>
      <h3 style={{ fontSize: "16px", marginBottom: "15px" }}>Subscribers By Date</h3>
      <BarChart width={400} height={300} data={chartData} margin={{ left: -35, bottom: 20 }}>
      <XAxis
  dataKey="Date"
  label={{
    value: "Date",
    position: "insideBottom",
    offset: 20,
    dy: 10,
  }}
  tick={false}
/>
        <YAxis dataKey="Subscribers" label={{ value: "Subscribers", angle: -90, position: "insideLeft", offset: 40, dy: 40 }} tick={false} />
        <Tooltip />
        <Bar dataKey="Subscribers" fill="#8884d8" barSize={30} />
      </BarChart>
    </div>
  );
};

export default SubPH;
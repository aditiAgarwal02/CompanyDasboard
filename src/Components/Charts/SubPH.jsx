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
      const peakHour = item["Peak Hour"];
      const totalUsers = parseFloat(item["Total Users"]);

      if (!groupedData[peakHour]) {
        groupedData[peakHour] = 0;
      }

      groupedData[peakHour] += totalUsers;
    });

    const processedData = Object.keys(groupedData).map((peakHour) => ({
      "Peak Hour": peakHour,
      "Subscribers": groupedData[peakHour],
    }));

    const sortedData = processedData.sort((a, b) => parseInt(a["Peak Hour"]) - parseInt(b["Peak Hour"]));
    setChartData(sortedData);
  }, [startDate, endDate]);

  return (
    <div>
      <h3 style={{ fontSize: "16px", marginBottom: "15px" }}>Subscribers By Peak Hour</h3>
      <BarChart width={250} height={300} data={chartData} margin={{ left: -35, bottom: 20 }}>
        <XAxis
          dataKey="Peak Hour"
          label={{ value: "Peak Hour", position: "insideBottom", offset: 10 }}
          ticks={[chartData[0]?.["Peak Hour"], chartData[chartData.length - 1]?.["Peak Hour"]]}
        />
        <YAxis dataKey="Subscribers" label={{ value: "Subscribers", angle: -90, position: "insideLeft", offset: 40, dy: 40 }} tick={false} />
        <Tooltip />
        <Bar dataKey="Subscribers" fill="#8884d8" barSize={30} />
      </BarChart>
    </div>
  );
};

export default SubPH;

import React, { useState, useEffect } from "react";
import { LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import subscriberData from "../../dataset/18-08-2021.json";
import moment from "moment";

const SubscriberTrend = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const filteredData = subscriberData.filter((item) => {
      const itemDate = moment(item.Date, "DD-MM-YYYY HH:mm");
      const itemDateFormatted = itemDate.format("YYYY-MM-DD");

      return itemDateFormatted >= startDate && itemDateFormatted <= endDate;
    });

    const processedData = processData(filteredData);
    setChartData(processedData);
  }, [startDate, endDate]);

  const processData = (data) => {
    const csaData = {};
    data.forEach((item) => {
      const csaName = item["CSA Name"];
      const subscribers = parseInt(item["Total Users"]);

      if (!isNaN(subscribers)) {
        if (csaData[csaName]) {
          csaData[csaName] += subscribers;
        } else {
          csaData[csaName] = subscribers;
        }
      }
    });

    const processedChartData = Object.entries(csaData).map(([csaName, subscribers]) => ({
      CSA: csaName,
      Subscribers: subscribers,
    }));

    return processedChartData;
  };

  return (
    <div>
      <h3 style={{ fontSize: "18px", marginBottom: "15px", marginLeft: "14px" }}>Subscriber Trend</h3>
      <LineChart width={500} height={300} data={chartData} margin={{ bottom: 50, right: 15 }}>
        <XAxis
          dataKey="CSA"
          label={{ value: 'CSA Names', position: 'insideBottom', offset: 10 }}
          tick={false}
        />
        <YAxis label={{ value: 'Subscribers', angle: -90, position: 'insideLeft', offset: 40, dy: 40  }} tick={false} />
        <Tooltip />
        <Line type="monotone" dataKey="Subscribers" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export default SubscriberTrend;
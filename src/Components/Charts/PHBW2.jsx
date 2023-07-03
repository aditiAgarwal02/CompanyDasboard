import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";
import subscriberData from "../../dataset/18-08-2021.json";

const PHBW2 = ({ csaName, startDate, endDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const filteredData = subscriberData.filter((item) => {
      const itemDate = moment(item.Date, "DD-MM-YYYY HH:mm");
      const itemDateFormatted = itemDate.format("YYYY-MM-DD");

      return (
        item["CSA Name"] === csaName &&
        moment(itemDateFormatted).isSameOrAfter(startDate) &&
        moment(itemDateFormatted).isSameOrBefore(endDate)
      );
    });

    const aggregatedData = {};
    filteredData.forEach((item) => {
      const date = moment(item.Date, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD");
      if (!aggregatedData[date]) {
        aggregatedData[date] = {
          Date: date,
          "Total Download (GB)": 0,
          "Total Upload (GB)": 0,
        };
      }
      aggregatedData[date]["Total Download (GB)"] += parseFloat(
        item["Total Download (GB)"]
      );
      aggregatedData[date]["Total Upload (GB)"] += parseFloat(
        item["Total Upload (GB)"]
      );
    });

    setData(Object.values(aggregatedData));
  }, [csaName, startDate, endDate]);

  return (
    <div>
      <h3 style={{marginTop: "10px",marginBottom: "12px",textAlign: "center" }}>Total Download, Total Upload, and Total Usage (GB)</h3>
      <BarChart width={600} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis
          yAxisId="left"
          label={{
            value: "Total Download/Upload (GB)",
            angle: -90,
            position: "insideLeft",
            dy: 100,
          }}
        />
        <Legend />
        <Tooltip />
        <Bar yAxisId="left" dataKey="Total Download (GB)" fill="green" />
        <Bar yAxisId="left" dataKey="Total Upload (GB)" fill="blue" />
      </BarChart>
    </div>
  );
};

export default PHBW2;

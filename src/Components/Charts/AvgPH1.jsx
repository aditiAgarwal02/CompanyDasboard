import React, { useState, useEffect } from "react";
import { LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import moment from "moment";
import subscriberData from "../../dataset/18-08-2021.json";

const AvgPH1 = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const filteredData = subscriberData.filter((item) => {
      const itemDate = moment(item.Date, "DD-MM-YYYY HH:mm");
      const itemDateFormatted = itemDate.format("YYYY-MM-DD");

      return itemDateFormatted >= startDate && itemDateFormatted <= endDate;
    });

    const processedData = filteredData.map((item) => ({
      CSA: item["CSA Name"],
      PeakHourUsage: parseFloat(item["Peak Hour % of Daily Usage"]) || 0,
    }));

    setChartData(processedData);
  }, [startDate, endDate]);

  return (
    <div>
      <h3 style={{ fontSize: "16px", marginBottom: "15px", marginLeft: "14px" }}>
        Peak Hour Usage Trend
      </h3>
      <LineChart width={500} height={300} data={chartData} margin={{ bottom: 50, right: 20 }}>
        <XAxis
          dataKey="CSA"
          label={{ value: "CSA Names", position: "insideBottom", offset: 10 }}
          tick={false} // Remove ticks
        />
        <YAxis
          label={{
            value: "Peak Hour Usage",
            angle: -90,
            offset: 40,
            dy: 40,
            position: "insideLeft",
          }}
          tick={false}
        />
        <Tooltip />
        <Line type="monotone" dataKey="PeakHourUsage" stroke="#8884d8" strokeWidth={2} dot={false} />
      </LineChart>
    </div>
  );
};

export default AvgPH1;
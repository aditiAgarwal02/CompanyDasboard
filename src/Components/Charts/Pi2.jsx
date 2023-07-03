import React, { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import moment from "moment";
import subscriberData from "../../dataset/18-08-2021.json";

const Pi2 = ({ csaName, startDate, endDate }) => {
  const [currentBandwidthData, setCurrentBandwidthData] = useState([]);

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

    const peakHourData = filteredData.find(
      (item) => item["CSA Name"] === csaName
    );

    const remainingPercentage = 100 - parseFloat(peakHourData["Peak hour % of CVC Bandwidth "]);

    const currentBandwidthPercentage = [
      { name: `${csaName} (Colored)`, value: parseFloat(peakHourData["Peak hour % of CVC Bandwidth "]) },
      { name: `${csaName} (Blank)`, value: remainingPercentage }
    ];

    setCurrentBandwidthData(currentBandwidthPercentage);
  }, [csaName, startDate, endDate]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
      <h3 style={{marginTop: "35px",marginBottom: "-10px",textAlign: "center" }}>Peak hour % of CVC Bandwidth</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PieChart width={300} height={300} margin={{ top: 10, right: 20, bottom: 80, left: 20 }}>
            <Pie
              dataKey="value"
              data={currentBandwidthData}
              cx="50%"
              cy="50%"
              outerRadius={50}
              label
              startAngle={90}
              endAngle={450}
              margin={0}
            >
              
              <Cell fill="black" name={`${csaName} (Colored)`} />
              <Cell fill="transparent" strokeWidth={1} stroke="black" name={`${csaName} (Blank)`} />
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={40} marginBottom={10}  />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Pi2;
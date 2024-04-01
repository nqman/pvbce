import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function LineChartActualCostAndRevenue({
  startDate,
  endDate,
  detailModelRevenue,
}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (detailModelRevenue?.length > 0) {
      handleConvertData();
    }
  }, [detailModelRevenue]);

  const handleConvertData = () => {
    const headerRow = [
      "Ngày",
      "Doanh thu kế hoạch",
      "Doanh thu thực tế",
      "Chi phí thực tế",
    ];

    const dataRows = detailModelRevenue?.map((item) => [
      item.date,
      item.actualCost,
      item.actualRevenue,
      item.expectedRevenue,
    ]);

    const tableData = [headerRow, ...dataRows];
    setData(tableData);
  };

  const options = {
    legend: { position: "bottom" },
    hAxis: {
      title: "Tên chi phí",
    },
    vAxis: {
      title: "Chi phí",
    },
    seriesType: "bars",
    // bar: { groupWidth: "30%" },
  };

  return (
    <div>
      {data.length > 0 ? (
        <Box sx={{ p: 2, border: "2px solid grey", mt: 2 }}>
          <Chart
            chartType="ComboChart"
            width="100%"
            height="450px"
            data={data}
            options={options}
          />
          <h3
            style={{
              textAlign: "center",
              marginBottom: "-5px",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            {"Biểu đồ doanh thu & chi phí"}
          </h3>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
}

export default LineChartActualCostAndRevenue;

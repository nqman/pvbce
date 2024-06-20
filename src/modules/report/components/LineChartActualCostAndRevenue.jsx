import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function LineChartActualCostAndRevenue({
  startPicker,
  endPicker,
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
      item.expectedRevenue,
      item.actualRevenue,
      item.actualCost,
    ]);

    const tableData = [headerRow, ...dataRows];
    setData(tableData);
  };

  const options = {
    legend: { position: "bottom" },
    // hAxis: {
    //   title: "Tên chi phí",
    // },
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
            height="400px"
            data={data}
            options={options}
          />
          <h3
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "10px",
              marginBottom: "-5px",
            }}
          >
            {`Biểu đồ doanh thu & chi phí (${startPicker} đến ${endPicker})`}
          </h3>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
}

export default LineChartActualCostAndRevenue;

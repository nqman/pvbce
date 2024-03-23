import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function LineChartActualCostAndRevenue({ detailModelRevenue }) {
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
    // title: `Đơn vị ${unit}`,
    chart: {
      title: "Box Office Earnings in First Two Weeks of Opening",
      subtitle: "in millions of dollars (USD)",
    },
  };

  return (
    <div>
      {data.length > 0 ? (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      ) : (
        ""
      )}
      <h3 style={{ textAlign: "center" }}>Biểu đồ chi phí</h3>
    </div>
  );
}

export default LineChartActualCostAndRevenue;

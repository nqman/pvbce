import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function LineChartActualCostAndRevenue({ detailModelRevenue, typeTime }) {
  const [data, setData] = useState([]);
  const [typeTimeVN, setTypeTimeVN] = useState(typeTime);
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
    switch (typeTime) {
      case "week":
        return setTypeTimeVN("tuần");
      case "month":
        return setTypeTimeVN("tháng");
      case "year":
        return setTypeTimeVN("năm");
      default:
        return typeTime;
    }
  };

  const options = {
    legend: { position: "bottom" },
    hAxis: {
      title: "Thời gian",
    },
    vAxis: {
      title: "Chi phí",
    },
  };

  return (
    <div>
      {data.length > 0 ? (
        <Chart
          chartType="LineChart"
          width="100%"
          height="450px"
          data={data}
          options={options}
        />
      ) : (
        ""
      )}
      <h3
        style={{
          textAlign: "center",
          marginBottom: "-5px",
          marginTop: "10px",
          fontWeight: "bold",
        }}
      >
        {`Biểu đồ doanh thu & chi phí theo ${typeTimeVN}`}
      </h3>
    </div>
  );
}

export default LineChartActualCostAndRevenue;
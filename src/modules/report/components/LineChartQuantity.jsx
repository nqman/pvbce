import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function LineChartQuantity({ unit, detailModel, typeTime }) {
  const [data, setData] = useState([]);
  const [typeTimeVN, setTypeTimeVN] = useState(typeTime);

  useEffect(() => {
    if (detailModel?.length > 0) {
      handleConvertData();
    }
  }, [detailModel]);

  const handleConvertData = () => {
    const headerRow = ["Ngày", "Sản lượng kế hoạch", "Sản lượng thực tế"];

    const dataRows = detailModel?.map((item) => [
      item.date,
      item.expectedQuantity,
      item.actualQuantity,
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
      <h3
        style={{ textAlign: "center" }}
      >{`Biểu đồ sản lượng theo ${typeTimeVN} (đơn vị: ${unit} )`}</h3>
    </div>
  );
}

export default LineChartQuantity;

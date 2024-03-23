import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function LineChart({ unit, detailModel }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (detailModel?.length > 0) {
      handleConvertData();
    }
  }, [detailModel]);

  const handleConvertData = () => {
    const keys = Object.keys(detailModel[0]);
    const convertedData = [
      keys,
      ...detailModel.map((item) => keys.map((key) => item[key])),
    ];
    // const testData = [
    //   ["Ngày", "Sản lượng kế hoạch", "Sản lượng thực tế"],
    //   ["01-03-2024", 5, 2],
    //   ["04-03-2024", 6, 5],
    //   ["04-03-2024_1", 72.4, 1],
    //   ["04-03-2024_2", 90, 4],
    //   ["04-03-2024_3", 1, 6],
    //   ["04-03-2024_4", 3, 7],
    //   ["04-03-2024_5", 0, 0],
    //   ["04-03-2024_6", 8, 8],
    //   ["04-03-2024_7", 3, 3],
    //   ["04-03-2024_8", 1, 5],
    //   ["04-03-2024_9", 2, 2],
    //   ["04-03-2024_10", 4, 4],
    //   ["04-03-2024_11", 7, 9],
    //   ["04-03-2024_12", 8, 1],
    //   ["04-03-2024_13", 9, 2],
    //   ["04-03-2024_14", 3, 6],
    //   ["04-03-2024_15", 6, 8],
    // ];
    // setData(testData);
    const headerRow = ["Ngày", "Sản lượng kế hoạch", "Sản lượng thực tế"];

    const dataRows = detailModel?.map((item) => [
      item.date,
      item.expectedQuantity,
      item.actualQuantity,
    ]);

    const tableData = [headerRow, ...dataRows];
    console.log(tableData);
    setData(tableData);
  };

  const options = {
    title: `Đơn vị ${unit}`,
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
    </div>
  );
}

export default LineChart;

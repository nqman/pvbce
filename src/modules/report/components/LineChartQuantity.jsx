import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function LineChartQuantity({ startDate, endDate, detailModel }) {
  const [data, setData] = useState([]);
  console.log(detailModel);

  useEffect(() => {
    if (detailModel?.length > 0) {
      handleConvertData();
    }
  }, [detailModel]);

  const handleConvertData = () => {
    const headerRow = ["Hạng mục", "Sản lượng kế hoạch", "Sản lượng thực tế"];

    const dataRows = detailModel?.map((item) => [
      item.category,
      item.quantity,
      item.actualQuantity,
    ]);
    // const dataRows = [
    //   ["2004/05", 165, 938],
    //   ["2005/06", 135, 1120],
    //   ["2006/07", 157, 1167],
    //   ["2007/08", 139, 1110],
    //   ["2008/09", 136, 691],
    // ];

    const tableData = [headerRow, ...dataRows];
    console.log(tableData);
    setData(tableData);
  };

  const options = {
    legend: { position: "bottom" },
    hAxis: {
      title: "Thời gian",
    },
    vAxis: {
      title: "Sản lượng",
    },
    seriesType: "bars",
    // bar: { groupWidth: "100%" },
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
              marginTop: "10px",
              fontWeight: "bold",
              marginBottom: "-5px",
            }}
          >{`Biểu đồ sản lượng`}</h3>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
}

export default LineChartQuantity;

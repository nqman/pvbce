import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getViewReportQuantityRevenueAndCostAPI } from "../../../apis/reportAPI";
import LineChart from "./LineChart.jsx";

export default function RpActualCostAndQuantityRevenue() {
  // debugger;
  const navigate = useNavigate();
  const params = useParams();
  const idProject = params.code;
  const [viewReports, setViewReports] = useState([]);
  useState("");
  // TYPE OF TIME
  const [typeTime, setTypeTime] = useState("");
  const handleChangeTypeTime = (e) => {
    setTypeTime(e.target.value);
  };
  // TYPE OF REPORT
  const [typeReport, setTypeReport] = useState("");

  const handleChangeTypeReport = (e) => {
    setTypeReport(e.target.value);
  };
  const handleExportReport = async () => {
    // debugger;
    try {
      const data = await getViewReportQuantityRevenueAndCostAPI(
        idProject,
        typeReport,
        typeTime
      );
      setViewReports(data);
      // console.log(data);
      return data;
    } catch (error) {}
  };

  return (
    <div>
      <Container className="mt-4">
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: 200, marginRight: "30px" }}>
            <FormControl fullWidth>
              <InputLabel size="small" id="demo-simple-select-label">
                Đơn vị thời gian
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChangeTypeTime}
                value={typeTime}
                label="Đơn vị thời gian"
                size="small"
              >
                <MenuItem value={"week"}>Tuần</MenuItem>
                <MenuItem value={"month"}>Tháng</MenuItem>
                <MenuItem value={"year"}>Năm</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: 200, marginRight: "30px" }}>
            <FormControl fullWidth>
              <InputLabel size="small" id="demo-simple-select-label">
                Loại báo cáo
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChangeTypeReport}
                value={typeReport}
                label="Loại báo cáo"
                size="small"
              >
                <MenuItem value={"quantity"}>Báo cáo sản lượng</MenuItem>
                <MenuItem value={"revenue"}>Báo cáo doanh thu</MenuItem>
                <MenuItem value={"actual-cost"}>Báo cáo chi phí</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            sx={{
              textTransform: "inherit",
            }}
            variant="contained"
            color="warning"
            onClick={handleExportReport}
          >
            Xuất báo cáo
          </Button>
        </div>
        {viewReports.lenght !== 0 ? (
          viewReports?.map((view, index) => (
            <Box key={index}>
              <LineChart
                unit={view?.unit}
                detailModel={view?.listRpQuantityDetailModels}
              />
            </Box>
          ))
        ) : (
          <h1>Vui lòng đợi đồ thị</h1>
        )}

        <Box>
          <LineChart />
        </Box>
      </Container>
    </div>
  );
}

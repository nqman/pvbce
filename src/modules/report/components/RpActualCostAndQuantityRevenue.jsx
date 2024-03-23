import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate, useParams } from "react-router-dom";
import { getViewReportQuantityRevenueAndCostAPI } from "../../../apis/reportAPI";

export default function RpActualCostAndQuantityRevenue() {
  const navigate = useNavigate();
  const params = useParams();
  const idProject = params.code;

  // MENU WEEK
  const [typeTime, setTypeTime] = useState("");

  const handleChangeTime = (e) => {
    setTypeTime(e.target.value);
  };
  // TYPE OF REPORT
  const [typeReport, setTypeReport] = useState("");

  const handleChangeType = (e) => {
    setTypeReport(e.target.value);
  };
  const handleExportReport = async () => {
    try {
      // const viewReport = await getViewReportQuantityRevenueAndCostAPI(
      //   idProject,
      //   typeReport,
      //   typeTime
      // );
      console.log(idProject, typeReport, typeTime);
      // return viewReport;
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
                onChange={handleChangeTime}
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
                onChange={handleChangeType}
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
      </Container>
    </div>
  );
}

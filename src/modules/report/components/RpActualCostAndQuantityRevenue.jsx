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
import LineChartQuantity from "./LineChartQuantity";
import LineChartActualCostAndRevenue from "./LineChartActualCostAndRevenue";

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

  const [units, setUnits] = useState([]);

  const [unit, setUnit] = useState("");
  const [detailModel, setDetailModel] = useState([]);
  const [detailModelRevenue, setDetailModelRevenue] = useState([]);
  const handleChangeUnit = (e) => {
    setUnit(e.target.value);
    const tempDetail = viewReports.filter(
      (report) => report.unit === e.target.value
    );
    setDetailModel(tempDetail[0].listRpQuantityDetailModels);
    // console.log(tempDetail[0].listRpQuantityDetailModels);
  };
  const handleExportReport = async () => {
    debugger;
    try {
      const data = await getViewReportQuantityRevenueAndCostAPI(
        idProject,
        typeReport,
        typeTime
      );
      setViewReports(data);
      if (data[0].unit) {
        const tempUnits = data
          .map((d) => (d.unit ? d.unit : null))
          .filter((unit) => unit !== null);
        setUnits(tempUnits);
        setUnit(tempUnits[0]);
        const tempDetail = data.filter(
          (report) => report.unit === tempUnits[0]
        );
        setDetailModel(tempDetail[0].listRpQuantityDetailModels);
        setDetailModelRevenue([]);
        return;
      }
      setUnits([]);
      setDetailModelRevenue(data);
      console.log(data);
      return data;
    } catch (error) {}
  };

  return (
    <div>
      <Container className="mt-4 mb-4">
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
        {units?.length > 0 ? (
          <div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Box
                sx={{
                  width: 200,
                  marginTop: "20px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel size="small" id="demo-simple-select-label">
                    Đơn vị
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChangeUnit}
                    value={unit}
                    label="Đơn vị"
                    size="small"
                  >
                    {units?.map((unit) => (
                      <MenuItem value={unit}>{unit}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
            {viewReports.lenght !== 0 &&
            viewReports.filter((report) => report.unit === unit) ? (
              <Box sx={{ p: 2, border: "2px solid grey", mt: 2 }}>
                <LineChartQuantity
                  typeTime={typeTime}
                  unit={unit}
                  detailModel={detailModel}
                />
              </Box>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {detailModelRevenue.length > 0 ? (
          <Box sx={{ p: 2, border: "2px solid grey", mt: 2 }}>
            <LineChartActualCostAndRevenue
              typeTime={typeTime}
              detailModelRevenue={detailModelRevenue}
            />
          </Box>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getViewReportQuantityRevenueAndCostAPI } from "../../../apis/reportAPI";
import LineChartQuantity from "./LineChartQuantity";
import LineChartActualCostAndRevenue from "./LineChartActualCostAndRevenue";

//Calendar
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ProjectItem from "./ProjectItem";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../home/components/Loading/Loading";

export default function RpActualCostAndQuantityRevenue() {
  // debugger;
  const navigate = useNavigate();
  const params = useParams();
  const idProject = params.code;
  const [viewReports, setViewReports] = useState([]);
  // const [detailModel, setDetailModel] = useState([]);
  // const [detailModelRevenue, setDetailModelRevenue] = useState([]);

  // TYPE OF REPORT
  const [typeReport, setTypeReport] = useState("");

  const handleChangeTypeReport = (e) => {
    setTypeReport(e.target.value);
  };

  const handleExportReport = async () => {
    // debugger;
    if (typeReport && startDate && endDate) {
      try {
        const data = await getViewReportQuantityRevenueAndCostAPI(
          idProject,
          typeReport,
          startDate,
          endDate
        );
        setViewReports(data);
        console.log(data);
        return data;
      } catch (error) {}
    } else if (!typeReport) {
      toast.error("Vui lòng chọn loại báo cáo!");
    } else if (!startDate) {
      toast.error("Vui lòng chọn ngày bắt đầu!");
    } else if (!endDate) {
      toast.error("Vui lòng chọn ngày kết thúc!");
    }
  };
  // Thời gian dự án
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handlePickStartDate = (date) => {
    if (date.$y) {
      setStartDate(date);
      handlePickDate(date, "startDate");
    }
    return date;
  };

  const handlePickEndDate = (date) => {
    if (date.$y) {
      setEndDate(date);
      handlePickDate(date, "endDate");
    }
    return date;
  };

  const handlePickDate = (date, label) => {
    if (date !== null) {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
      const [day, month, year] = formattedDate.split("/");
      const formattedDateString = `${day}-${month}-${year}`;
      if (label === "startDate") {
        setStartDate(formattedDateString);
      } else if (label === "endDate") {
        setEndDate(formattedDateString);
      }
    }
  };

  return (
    <div>
      <Container className="mt-4 mb-4">
        <Toaster position="top-right" />
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <div className="calendar d-flex ">
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="me-4"
                  onChange={handlePickStartDate}
                  renderInput={(params) => <TextField {...params} />}
                  label="Ngày bắt đầu"
                  format="DD-MM-YYYY"
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="me-4"
                  onChange={handlePickEndDate}
                  renderInput={(params) => <TextField {...params} />}
                  label="Ngày kết thúc"
                  format="DD-MM-YYYY"
                />
              </LocalizationProvider>
            </div>
          </div>

          <Box sx={{ width: 200, marginRight: "30px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Loại báo cáo
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChangeTypeReport}
                value={typeReport}
                label="Loại báo cáo"
              >
                <MenuItem value={"quantity"}>Báo cáo sản lượng</MenuItem>
                <MenuItem value={"revenue"}>Báo cáo doanh thu</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div>
            <Button
              variant="contained"
              color="warning"
              onClick={handleExportReport}
            >
              Xuất báo cáo
            </Button>
          </div>
        </div>
        {typeReport === "quantity" ? (
          <div>
            <LineChartQuantity
              startDate={startDate}
              endDate={endDate}
              detailModel={viewReports}
            />
          </div>
        ) : typeReport === "revenue" ? (
          <div>
            <LineChartActualCostAndRevenue
              startDate={startDate}
              endDate={endDate}
              detailModelRevenue={viewReports}
            />
          </div>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

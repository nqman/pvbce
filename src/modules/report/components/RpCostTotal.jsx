import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getViewReportQuantityRevenueAndCostAPI,
  validateDatePickerAPI,
} from "../../../apis/reportAPI";
import LineChartQuantity from "./LineChartQuantity";
import LineChartActualCostAndRevenue from "./LineChartActualCostAndRevenue";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
//Calendar
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../home/components/Loading/Loading";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function RpCostTotal() {
  // debugger;
  const navigate = useNavigate();
  const [viewReports, setViewReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Thời gian dự án
  const [startPicker, setStartPicker] = useState(null);
  const [endPicker, setEndPicker] = useState(null);

  const handlePickStartPicker = (date) => {
    // debugger;
    if (
      date.$y &&
      1900 <= date.$y &&
      date.$y <= 2099 &&
      date.$d instanceof Date &&
      !isNaN(date.$d)
    ) {
      // setStartPicker(date);
      handlePickDate(date, "startPicker");
      return date;
    }
  };

  const handlePickEndPicker = (date) => {
    if (
      date.$y &&
      1900 <= date.$y &&
      date.$y <= 2099 &&
      date.$d instanceof Date &&
      !isNaN(date.$d)
    ) {
      // setEndPicker(date);
      handlePickDate(date, "endPicker");
      return date;
    }
  };
  const [errorStartDate, setErrorStartDate] = useState("");
  const [errorEndDate, setErrorEndDate] = useState("");
  const handlePickDate = async (date, label) => {
    if (date !== null) {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
      const [day, month, year] = formattedDate.split("/");
      const formattedDateString = `${day}-${month}-${year}`;
      if (label === "startPicker") {
        setStartPicker(formattedDateString);
        try {
          const checkDate = await validateDatePickerAPI(formattedDateString, 6);
          setErrorStartDate("");
        } catch (error) {
          // toast.error(error);
          setErrorStartDate(error);
        }
      } else if (label === "endPicker") {
        setEndPicker(formattedDateString);
        try {
          const checkDate = await validateDatePickerAPI(formattedDateString, 6);
          // console.log(checkDate);
          setErrorEndDate("");
        } catch (error) {
          // toast.error(error);
          setErrorEndDate(error);
        }
      }
    }
  };

  const handleExportReport = async () => {
    // debugger;

    if (startPicker && endPicker && !errorEndDate && !errorStartDate) {
      setIsLoading(true);
      try {
        const data = await getViewReportQuantityRevenueAndCostAPI(
          6, //id
          "revenue", //type
          startPicker,
          endPicker,
          "" //categories
        );
        setViewReports(data);
        setIsLoading(false);
        return data;
      } catch (error) {}
    } else if (!startPicker) {
      toast.error("Vui lòng chọn ngày bắt đầu!");
    } else if (!endPicker) {
      toast.error("Vui lòng chọn ngày kết thúc!");
    } else if (errorStartDate !== "") {
      toast.error("Vui lòng chọn lại ngày bắt đầu!");
    } else if (errorEndDate !== "") {
      toast.error("Vui lòng chọn lại ngày kết thúc!");
    }
  };

  return (
    <div>
      <Container className="mt-4">
        <Toaster position="top-right" />
        <div className="mb-3">
          <Link
            sx={{ fontSize: "16px" }}
            component="button"
            variant="body2"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: "15px" }} />
            Trở về dự án
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            // marginTop: "100px",
          }}
        >
          <div className="calendar d-flex ">
            <div
              style={{ marginRight: "30px", width: "350px", height: "80px" }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="me-4"
                  onChange={handlePickStartPicker}
                  renderInput={(params) => <TextField {...params} />}
                  label="Ngày bắt đầu"
                  format="DD-MM-YYYY"
                />
              </LocalizationProvider>
              <p style={{ marginTop: "5px", color: "red" }}>{errorStartDate}</p>
            </div>

            <div
              style={{ marginRight: "30px", width: "350px", height: "80px" }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="me-4"
                  onChange={handlePickEndPicker}
                  renderInput={(params) => <TextField {...params} />}
                  label="Ngày kết thúc"
                  format="DD-MM-YYYY"
                />
              </LocalizationProvider>
              <p style={{ marginTop: "5px", color: "red" }}>{errorEndDate}</p>
            </div>
          </div>

          <div>
            <Button
              variant="contained"
              color="success"
              onClick={handleExportReport}
              sx={{ height: "54px", width: "150px" }}
            >
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {startPicker !== null && endPicker !== null ? (
          <div style={{ marginBottom: "35px" }}>
            <LineChartActualCostAndRevenue
              startPicker={startPicker}
              endPicker={endPicker}
              detailModelRevenue={viewReports}
            />
          </div>
        ) : (
          <Box
            sx={{
              color: "red",
              marginTop: "10px",
              textAlign: "center",
              border: "1px solid red",
              padding: "5px 0",
            }}
          >
            {" "}
            Vui lòng chọn ngày bắt đầu, ngày kết thúc và nhấn xuất báo cáo!
          </Box>
        )}
      </Container>
    </div>
  );
}

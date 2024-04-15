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
  getCategoriesOfProjectAPI,
  getViewReportQuantityRevenueAndCostAPI,
  selectProjectAPI,
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
import ProjectItem from "./ProjectItem";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../home/components/Loading/Loading";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function RpActualCostAndQuantityRevenue() {
  // debugger;
  const navigate = useNavigate();
  const params = useParams();
  const idProject = params.code;
  const [viewReports, setViewReports] = useState([]);
  // Get category selection
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getCategoriesOfProjectAPI(idProject);
      setCategories(response);
    }
    fetchMyAPI();
  }, [idProject]);
  const handleCategoryChange = (event, value) => {
    setSelectedCategories(value);
    console.log(value);
  };

  // Thời gian dự án
  const [startPicker, setStartPicker] = useState(null);
  const [endPicker, setEndPicker] = useState(null);

  const handlePickStartPicker = (date) => {
    debugger;
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
          const checkDate = await validateDatePickerAPI(
            formattedDateString,
            idProject
          );
          // console.log(checkDate);
          setErrorStartDate("");
        } catch (error) {
          // toast.error(error);
          setErrorStartDate(error);
        }
        console.log(startPicker);
      } else if (label === "endPicker") {
        setEndPicker(formattedDateString);
        try {
          const checkDate = await validateDatePickerAPI(
            formattedDateString,
            idProject
          );
          // console.log(checkDate);
          setErrorEndDate("");
        } catch (error) {
          // toast.error(error);
          setErrorEndDate(error);
        }
      }
    }
  };
  // TYPE OF REPORT
  const [typeReport, setTypeReport] = useState("");

  const handleChangeTypeReport = (e) => {
    setTypeReport(e.target.value);
  };
  const handleExportReport = async () => {
    // debugger;
    let categories = "";
    console.log(selectedCategories.length);
    for (let i = 0; i < selectedCategories.length; i++) {
      categories = categories + selectedCategories[i].name + ";";
    }
    if (categories.length > 0) {
      categories = categories.substring(0, categories?.length - 1);
      // console.log(categories);
    }
    if (
      typeReport &&
      startPicker &&
      endPicker &&
      !errorEndDate &&
      !errorStartDate
    ) {
      try {
        const data = await getViewReportQuantityRevenueAndCostAPI(
          idProject,
          typeReport,
          startPicker,
          endPicker,
          categories
        );
        setViewReports(data);
        return data;
      } catch (error) {}
    } else if (!typeReport) {
      toast.error("Vui lòng chọn loại báo cáo!");
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

          <div style={{ width: 200, marginRight: "40px" }}>
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
        {typeReport === "quantity" && (
          <div style={{ marginTop: "10px" }}>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={categories}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              style={{ width: "100%" }}
              value={selectedCategories}
              onChange={handleCategoryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Chọn hạng mục"
                  placeholder="Chọn hạng mục"
                />
              )}
            />
          </div>
        )}
        {viewReports[0]?.category && typeReport === "quantity" ? (
          <div style={{ marginBottom: "35px" }}>
            <LineChartQuantity
              startPicker={startPicker}
              endPicker={endPicker}
              detailModel={viewReports}
            />
          </div>
        ) : viewReports[0]?.actualRevenue && typeReport === "revenue" ? (
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
            Vui lòng chọn ngày bắt đầu, ngày kết thúc, loại báo cáo và nhấn xuất
            báo cáo!
          </Box>
        )}
      </Container>
    </div>
  );
}

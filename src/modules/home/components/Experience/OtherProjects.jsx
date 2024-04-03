import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import styles from "./EquipCapacity.module.css";
const row_other1 = [
  createData(
    1,
    "Dự án Cầu vượt sông Đáy",
    "Thi công CDM D800",
    "7,200,000,000",
    2023
  ),
  createData(
    2,
    "Nút giao thông Liêm Sơn - QL.1A",
    "Thi công CDM D800",
    "13,800,000,000",
    2023
  ),
  createData(
    3,
    "Gói thầu 17: Nút giao thôn đường sắt",
    "Thi công CDM D800",
    "5,500,000,000",
    2023
  ),
  createData(
    4,
    "Nhà ở cao tầng Khang Phúc",
    "Thi công lắp đặt tấm tường Eurowall",
    "5,522,183,915",
    2023
  ),
  createData(
    5,
    "NM LOGOS Long Hậu – Xưởng 2",
    "Thi công lắp dựng cấu kiện BTĐS",
    "5,356,763,301",
    2023
  ),
  createData(
    6,
    "Kè cảng PV SHIPYARD Vũng Tàu",
    "Thi công kè SW600B",
    "2,148,000,000",
    2023
  ),
  createData(
    7,
    "Kè chống sạt lở (Long Hậu)",
    "Thi công kè",
    "15,740,710,052",
    2022
  ),
  createData(
    8,
    "Cầu dẫn, đê Marina (Lagoon)",
    "Thi công kè",
    "15,027,137,072",
    2022
  ),
  createData(
    9,
    "KĐT Du lịch Nhơn Phước",
    "Thi công cọc CDM D800",
    "9,584,816,000",
    2022
  ),
  createData(
    10,
    "Dự án Opal Skyline",
    "Thi công lắp đặt tấm tường Eurowall",
    "8,923,791,219",
    2022
  ),
  createData(
    11,
    "Nhà máy PAIHONG 2",
    "Thi công lắp dựng cấu kiện BTĐS",
    "8,526,159,663",
    2022
  ),
  createData(
    12,
    "Khu nhà TMDV Lê Hồng Phong (Bình Dương) ",
    "Thi công lắp dựng cấu kiện BTĐS",
    "4,744,654,572",
    2022
  ),
  createData(
    13,
    "Đê ngầm đê tạo bãi đê chắn sóng (NovaWorld Hồ Tràm)",
    "Thi công kè",
    "3,427,152,914",
    2022
  ),
  createData(
    14,
    "Nhà xưởng SUNHOUSE Tân Tạo",
    "Thi công lắp dựng cấu kiện BTĐS",
    "2,839,823,520",
    2022
  ),
  createData(
    15,
    "KDLRoller Coaster - Thung lũng Đại dương",
    "Khoan nhồi D600",
    "1,807,225,588",
    2022
  ),
  createData(
    16,
    "NM Sản xuất Gang Thép",
    "Thi công lắp dựng cấu kiện BTĐS",
    "1,114,478,100",
    2022
  ),
  createData(
    17,
    "Kè Sông Trong AQUA CITY",
    "Thi công kè SW350",
    "2,488,320,000",
    2021
  ),
  createData(
    18,
    "Dự án FERRIS WHEEL",
    "Khoan nhồi D800",
    "1,683,350,645",
    2021
  ),
  createData(
    19,
    "NHÀ XƯỞNG SUNHOUSE",
    "Thi công lắp dựng cấu kiện BTĐS",
    "1,096,574,870",
    2021
  ),
  createData(
    20,
    "Dự án Opal Boulevard",
    "Thi công lắp đặt tấm tường Eurowall",
    "12,929,960,642",
    2020
  ),
  createData(
    21,
    "Dự án AKARI Tháp 1&5",
    "Thi công lắp đặt tấm tường Eurowall",
    "8,432,828,859",
    2020
  ),
  createData(
    22,
    "Dự án Lovera Vista",
    "Thi công lắp đặt tấm tường Eurowall",
    "6,902,008,550",
    2020
  ),
];
const row_other2 = [
  createData(
    23,
    "Dự án AKARI (Tháp 3 & 4)",
    "Thi công lắp đặt tấm tường Eurowall",
    "4,351,486,300",
    2020
  ),
  createData(
    24,
    "Dự án CONDO 2",
    "Thi công lắp đặt tấm tường Eurowall",
    "1,670,708,839",
    2020
  ),
  createData(
    25,
    "CAP SAINT JACQUES (DIC Vũng Tàu)",
    "Thi công lắp đặt tấm tường Eurowall",
    "1,467,778,289",
    2020
  ),
  createData(
    26,
    "NM SMC Đồng Nai",
    "Thi công lắp dựng cấu kiện BTĐS",
    "9,379,875,512",
    2019
  ),
  createData(
    27,
    "CONDO 2",
    "Thi công lắp đặt tấm tường Eurowall",
    "3,173,527,238",
    2019
  ),
  createData(
    28,
    "NM SCM 3 Đồng Nai",
    "Thi công lắp dựng cấu kiện BTĐS",
    "2,389,518,900",
    2019
  ),
  createData(
    29,
    "Dự án Trường ĐH Văn Lang",
    "Thi công CDM D1000",
    "1,119,080,655",
    2019
  ),
  createData(
    30,
    "Dự án MANWAH Việt Nam",
    "Thi công cừ ván D600",
    "1,031,232,600",
    2019
  ),
  createData("", "Cho thuê thiết bị", "", "", ""),
  createData(
    31,
    "Cho thuê xe cẩu CKE250 (Long An)",
    "Cho thuê thiết bị",
    "1,719,981,823",
    2021
  ),
  createData(
    32,
    "Cho thuê SC1500-01",
    "Cho thuê thiết bị",
    "1,257,456,797",
    2021
  ),
  createData(33, "Cho thuê 50T", "Cho thuê thiết bị", "1,081,818,183", 2019),
];

const steps = [
  {
    imagePath: "./image/duankhac1.png",
    data: row_other1,
  },
  {
    imagePath: "./image/duankhac2.png",
    data: row_other2,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00477b",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(no, name, work, value, year) {
  return { no, name, work, value, year };
}

export default function OtherProjects() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
      <Box display={"flex"} sx={{ marginTop: "0px" }}>
        <TableContainer component={Paper} sx={{ height: 450 }}>
          <Table
            sx={{ minWidth: 500, height: "100%" }}
            aria-label="customized table"
          >
            <TableHead
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 999,
              }}
            >
              <TableRow>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 50, padding: "5px 0", fontSize: "11px" }}
                >
                  STT
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 350, padding: "5px 0", fontSize: "11px" }}
                >
                  TÊN DỰ ÁN
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 200, padding: "5px 0", fontSize: "11px" }}
                >
                  PHẠM VI CÔNG VIỆC
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 50, padding: "5px 0", fontSize: "11px" }}
                >
                  GIÁ TRỊ
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 50, padding: "5px 0", fontSize: "11px" }}
                >
                  NĂM
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {steps[activeStep].data.map((row) => (
                <StyledTableRow key={row.no}>
                  <StyledTableCell
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      textAlign: "center",
                      padding: "5px 0",
                    }}
                  >
                    {row.no}
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontSize: "12px",
                      textAlign: "left",
                      padding: "5px 0",
                      fontWeight: row.no === "" ? "bold" : "400",
                    }}
                  >
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    {row.work}
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      textAlign: "right",
                      padding: "5px 0",
                    }}
                  >
                    {row.value}
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      textAlign: "center",
                      padding: "5px 0",
                    }}
                  >
                    {row.year}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box width={"60%"} display={"flex"} justifyContent={"center"}>
          <img
            src={steps[activeStep].imagePath}
            alt=""
            style={{ height: "450px" }}
          />
        </Box>
      </Box>

      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        style={{ maxWidth: "50%", margin: "auto" }}
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {/* Next */}
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            {/* Back */}
          </Button>
        }
      />
    </Box>
  );
}

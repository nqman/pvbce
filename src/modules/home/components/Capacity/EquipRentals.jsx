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
import cn from "classnames";
// import styles from "./EquipCapacity.module.css";
const row_cons1 = [
  createData("", "Xe cẩu bánh xích / Crawler crane", ""),
  createData(1, "Kobelco-CKE2500", 1),
  createData(2, "Hitachi-CX900", 1),
  createData(3, "Nissha DH650-5", 1),
  createData(4, "Sumitomo LS118RH5", 1),
  createData(5, "Sumitomo SC800-2", 1),
  createData(6, "Sumitomo SC1000-2", 2),
  createData(7, "Sumitomo SC1500", 1),
  createData(8, "Sumitomo SC1500-2", 1),
  createData("", "Xe khoan / Excavator", ""),
  createData(9, "Komatsu PC228", 2),
  createData(10, "Komatsu PC300,", 1),
  createData("", "Xe khoan / Drilling truck", ""),
  createData(11, "Nippon Sharyo DH508 - 105M", 3),
  createData(12, "Nippon Sharyo DH608-120M", 6),
  createData(13, "Nippon Sharyo DH658", 1),
  createData(14, "Kobelco DJM2070", 1),
  createData(15, "Sumitomo SP110", 1),
  createData("", "Búa rung điện / Electrical vibratory hammer", ""),
  createData(16, "EP180 Hammer", 1),
  createData("", "Máy bơm vữa / Mortar pump machinery", ""),
  createData(17, "Máy bơm vữa SG30", 22),
  createData("", "Máy nén khí / Compressor", ""),
  createData(18, "Airman PDSK AM900", 3),
  createData(19, "Airman PDSJ AM1000-01", 1),
  createData(20, "XHP900BWCAT", 3),
  createData("", "Máy phát điện / Generator", ""),
  createData(21, "AIRMAN SDG500", 1),
  createData(22, "CAT400", 2),
  createData(23, "DEN90", 1),
  createData(24, "DEN150", 2),
  createData(25, "DEN220", 3),
  createData(26, "DEN250", 1),
  createData(27, "DEN400", 2),
  createData(28, "DEN500", 1),
  createData(29, "NES220", 1),
  createData(30, "NES300", 1),
  createData(31, "NES350", 1),
  createData(32, "NES400", 3),
  createData(33, "NES500", 4),
  createData(34, "NES610", 1),
  createData("", "Thiết bị khác / Other equipment", ""),
  createData(35, "Máy xói áp lực JS330-01", 1),
  createData(36, "Trạm trộn tự động", 12),
  createData("", "Dàn Robot ép cọc / Pile pressing robot", ""),
  createData(37, "Robot ép cọc ZYJ-860-01", 1),
  createData("", "Búa / Air Hammer ", ""),
  createData(38, "SWH320", 1),
  createData(39, "SWH410", 1),
  createData(40, "SWH640", 1),
  createData(41, "TD550", 1),
  createData("", "Đầu khoan / Drilling head", ""),
  createData(42, "Đầu khoan D60HP", 4),
  createData(43, "Đầu khoan D80KP", 1),
  createData(44, "Đầu khoan D100KP", 4),
  createData(45, "Đầu khoan D120HP", 5),
  createData(46, "Đầu khoan D150SP", 1),
  createData(47, "Đầu khoan D240HP", 1),
  createData(48, "Đầu khoan hạ SW150PW", 2),
  createData(49, "Đầu khoan hạ SW200PW", 3),
  createData(50, "Đầu khoan SKC60VA", 1),
  createData(51, "Đầu khoan SKC120VA", 3),
  createData(52, "	Đầu khoan SKC150VM", 1),
  createData(53, "Đầu khoan SKC240VA", 1),
  createData(54, "	Đầu khoan thượng SW100PW", 2),
  createData(55, "Đầu khoan thượng SW120PW", 2),
  createData(56, "Đầu khoan thượng SW150PW", 5),
];

const steps = [
  {
    label: "THIẾT BỊ THI CÔNG",
    imagePath: "./image/thietbithicong1.png",
    data: row_cons1,
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

function createData(no, desc, qty) {
  return { no, desc, qty };
}

export default function EquipRentals() {
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
      <Box display={"flex"} sx={{ marginTop: "10px" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
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
                  // className={styles.cell_head}
                  align="center"
                  sx={{
                    minWidth: 50,
                    padding: "5px 0",
                    fontSize: "11px",
                  }}
                >
                  STT
                </StyledTableCell>
                <StyledTableCell
                  // className={styles.cell_head}
                  align="center"
                  sx={{
                    minWidth: 350,
                    padding: "5px 0",
                    fontSize: "11px",
                  }}
                >
                  MÔ TẢ THIẾT BỊ
                </StyledTableCell>

                <StyledTableCell
                  // className={styles.cell_head}
                  align="center"
                  sx={{
                    minWidth: 50,
                    padding: "5px 0",
                    fontSize: "11px",
                  }}
                >
                  SỐ LƯỢNG
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
                    // className={styles.cell_body}
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

                    // className={styles.cell_body}
                  >
                    {row.desc}
                  </StyledTableCell>

                  <StyledTableCell
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      textAlign: "center",
                      padding: "5px 0",
                    }}
                    // className={styles.cell_body}
                  >
                    {row.qty}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ width: "100%", paddingLeft: "80px" }}>
          <div>
            <h6>PVB chuyên cho thuê một số thiết bị như:</h6>
            <ul>
              <li>Xe cẩu</li>
              <li>Xe cơ sở</li>
              <li>Máy phát điện</li>
              <li>Búa rung</li>
              <li>
                Các loại thiết bị khoan, bơm, trạm phun vữa (Tole, máy đào…)
              </li>
            </ul>
          </div>
          <div className="ps-5">
            <img
              src="./image/thietbithicong1.png"
              alt=""
              style={{ width: "380px" }}
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
}

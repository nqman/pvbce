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
const row_cons1 = [
  createData(1, "Xe khoan DH608-120M", "Bộ", 6),
  createData(2, "Dàn ép cọc tự hành ZYJ 600", "Bộ", 2),
  createData(3, "Dàn ép cọc tự hành ZYJ 860", "Bộ", 1),
  createData(4, "Dàn ép cơ 600 tấn", "Bộ", 1),
  createData(5, "Xe cẩu SUMITOMO, 80 tấn -51m", "Bộ", 1),
  createData(6, "Xe đóng cọc SUMITOMO, 50 tấn (búa Diesel KB60)", "Bộ", 1),
  createData(7, "Xe bánh xích SUMITOMO SP110", "Bộ", 1),
  createData(8, "Máy khoan cọc CDM bánh xích KOBELCO DJM 2070", "Bộ", 1),
  createData(9, "Xe khoan DH508-105M", "Bộ", 2),
  createData(10, "Xe cẩu SUMITOMO, 50 tấn-33,55m", "Bộ", 1),
];
const row_cons2 = [
  createData(11, "Xe cẩu SUMITOMO, 80 tấn", "Bộ", 1),
  createData(12, "Xe cẩu HITACHI, 90 tấn", "Bộ", 1),

  createData(13, "Xe cẩu Nippon sharyo DH650, 65 tấn", "Bộ", 1),
  createData(14, "Xe cẩu SUMITOMO SC1000, 100 tấn", "Bộ", 2),
  createData(15, "Máy đào bánh xích KOMATSU", "Bộ", 2),
  createData(16, "Máy phát điện Ness 500", "Bộ", 3),
  createData(17, "Máy phát điện Den 400", "Bộ", 1),
  createData(18, "Máy phát điện Den 400", "Bộ", 1),
  createData(19, "Máy phát điện Ness 300", "Bộ", 2),
  createData(20, "Máy phát điện Ness 300", "Bộ", 1),
  createData(21, "Máy phát điện Ness 250", "Bộ", 2),
];
const row_survey = [
  createData(1, "Máy toàn đạc LEICA TC 407", "Cái", 1),
  createData(2, "Máy toàn đạc TOPCON GTS 100N", "Cái", 1),
  createData(3, "Máy toàn đạc PENTAX", "Cái", 1),
  createData(4, "Máy kinh vĩ ET - 1005", "Cái", 1),
  createData(5, "Máy kinh vĩ 3T5KII", "Cái", 2),
  createData(6, "Máy kinh vĩ SLON", "Cái", 1),
  createData(7, "Máy kinh vĩ ET - 1005", "Cái", 1),
  createData(8, "Máy kinh vĩ 3T5KII", "Cái", 2),
  createData(9, "Máy kinh vĩ SLON", "Cái", 1),
];
const steps = [
  {
    label: "THIẾT BỊ THI CÔNG",
    imagePath: "./image/thietbithicong1.png",
    data: row_cons1,
  },
  {
    label: "THIẾT BỊ THI CÔNG",
    imagePath: "./image/thietbithicong2.png",
    data: row_cons2,
  },
  {
    label: "THIẾT BỊ TRẮC ĐẠC",
    imagePath: "./image/thietbitracdac.png",
    data: row_survey,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#094906",
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

function createData(no, desc, unit, qty) {
  return { no, desc, unit, qty };
}

export default function EquipCapacity() {
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
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h6">{steps[activeStep].label}</Typography>
      </Paper>
      <Box display={"flex"}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 500, height: "100%" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell
                  // className={styles.cell_head}
                  align="center"
                  sx={{ minWidth: 50, padding: "5px 0", fontSize: "11px" }}
                >
                  STT
                </StyledTableCell>
                <StyledTableCell
                  // className={styles.cell_head}
                  align="center"
                  sx={{ minWidth: 350, padding: "5px 0", fontSize: "11px" }}
                >
                  MÔ TẢ THIẾT BỊ
                </StyledTableCell>
                <StyledTableCell
                  // className={styles.cell_head}
                  align="center"
                  sx={{ minWidth: 50, padding: "5px 0", fontSize: "11px" }}
                >
                  ĐVT
                </StyledTableCell>
                <StyledTableCell
                  // className={styles.cell_head}
                  align="center"
                  sx={{ minWidth: 50, padding: "5px 0", fontSize: "11px" }}
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
                      fontWeight: "400",
                      textAlign: "center",
                      padding: "5px 0",
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
                    {row.unit}
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
        <Box sx={{ width: "100%" }} display={"flex"} justifyContent={"center"}>
          <img
            src={steps[activeStep].imagePath}
            alt=""
            style={{ height: "400px" }}
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

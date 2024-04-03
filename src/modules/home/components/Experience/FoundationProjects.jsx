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
const row_found1 = [
  createData(
    1,
    "Khu phức hợp B3CC1 Starlake Hà Nội",
    "Khoan hạ Basic D600 & D800",
    "15,981,949,900",
    2023
  ),
  createData(
    2,
    "NM Nhiệt điện Quảng Trạch 1",
    "Đóng cọc D400 & D600",
    "7,353,320,000",
    2023
  ),
  createData(
    3,
    "GreenField Long An",
    "Khoan dẫn và ép cọc D300 - D400",
    "4,754,570,000",
    2023
  ),
  createData(
    4,
    "Bồn chứa LPG Thị Vải",
    "Khoan hạ Basic D500",
    "4,300,394,968",
    2023
  ),
  createData(
    5,
    "NM Nguyên liệu - Hòa Phát Dung Quất 2",
    "Đóng cọc D500 & D600",
    "5,792,549,370",
    2023
  ),
  createData(
    6,
    "Chung cư CT Home",
    "Khoan hạ Basic D600",
    "2,630,424,000",
    2023
  ),
  createData(
    7,
    "NM Nhiệt điện Vũng Án",
    "Khoan dẫn D700",
    "2,216,422,000",
    2023
  ),
  createData(
    8,
    "NM Điện gió Cà Mau 1",
    "Đóng cọc D800, bê tông turbin",
    "79,893,217,160",
    2022
  ),
  createData(
    9,
    "Chung cư Khang Phúc",
    "Khoan hạ Basic D600 & D800",
    "28,825,718,639",
    2022
  ),
  createData(
    10,
    "NM Nhiệt điện Vũng Án 2",
    "Khoan hạ Basic D450 & D600",
    "16,469,655,000",
    2022
  ),
  createData(11, "KĐT Aqua Dona", "Đóng cọc D400", "11,170,308,982", 2022),
  createData(
    12,
    "NM BOSTON Việt Nam",
    "Khoan hạ Basic D800",
    "6,123,012,560",
    2022
  ),
  createData(
    13,
    "Nhà ở xã hội (SAPA)",
    "Khoan hạ DTH D600",
    "5,963,195,400",
    2022
  ),
  createData(
    14,
    "Aqua Riverside (B1b,B2)",
    "Ép cọc D300 - D350",
    "3,955,855,700",
    2022
  ),
  createData(
    15,
    "Villa dọc biển và Condotel",
    "Ép cọc D600",
    "3,574,197,320",
    2022
  ),
  createData(
    16,
    "TTTM Aeonmall Huế",
    "Khoan hạ Basic D800",
    "5,485,112,403",
    2022
  ),
  createData(
    17,
    "FEC - PK 9 (Thung lũng Đại dương)",
    "Đóng cọc D600",
    "3,101,011,108",
    2022
  ),
  createData(
    18,
    "Dự án AQUA Dona (44.7ha)",
    "Ép cọc D350",
    "2,781,986,100",
    2022
  ),
  createData(
    19,
    "KDL sinh thái biển Bến cát Hồ",
    "Đóng cọc D300",
    "2,472,224,000",
    2022
  ),
  createData(20, "Khách sạn H2", "Ép cọc D600", "2,261,862,778", 2022),
  createData(21, "Dự án GALAF", "Ép cọc D500", "1,510,186,550", 2022),
  createData(
    22,
    "Cảng cạn An Sơn (Bình Dương)",
    "Đóng cọc D500",
    "1,495,856,000",
    2022
  ),
];
const row_found2 = [
  createData(
    23,
    "KS H1 - PK9 (Thung lũng Đại dương)",
    "Ép cọc D600",
    "1,329,885,040",
    2022
  ),
  createData(
    24,
    "Dự án Bình Châu Onsen - FEC",
    "Khoan hạ Basic D600",
    "1,298,019,792",
    2022
  ),
  createData(
    25,
    "Dự án Aqua City (12HA -A2A)",
    "Đóng cọc D300 - D350",
    "1,219,320,158",
    2022
  ),
  createData(
    26,
    "Dự án Charm Long Hải",
    "Khoan hạ DTH D400",
    "9,816,753,859",
    2022
  ),
  createData(
    27,
    "Dự án Mansion Villa (Hồ Tràm)",
    "Ép cọc D300",
    "1,027,628,350",
    2022
  ),
  createData(
    28,
    "Dự án Vinhomes Grand Park, Q.9",
    "Ép cọc D400",
    "1,003,636,920",
    2022
  ),
  createData(
    29,
    "Dự án Bảo tàng Quân đội",
    "Khoan hạ Basic D600 & D800",
    "16,788,571,548",
    2021
  ),
  createData(
    30,
    "NM Điện gió Chư Prông Gia Lai",
    "Đóng cọc D500",
    "15,029,979,250",
    2021
  ),
  createData(
    31,
    "Khách sạn Baybylon - The Tropicana",
    "Khoan hạ DTH D800",
    "7,251,945,509",
    2021
  ),
  createData(
    32,
    "Dự án Vietsov Petro GĐ2",
    "Ép cọc D800",
    "4,263,528,900",
    2021
  ),
  createData(
    33,
    "Trung tâm TM Go! Lào Cai",
    "Khoan hạ DTH D600 - D800",
    "3,955,702,400",
    2021
  ),
  createData(
    34,
    "Dự án Metro Star",
    "Khoan hạ Basic D600 & D800",
    "31,505,011,396",
    2021
  ),
  createData(
    35,
    "NM Điện gió EA Nam Đắk Lắk",
    "Khoan dẫn D400",
    "2,202,337,350",
    2021
  ),
  createData(36, "Dự án AQUA Dona", "Đóng cọc D400", "2,180,760,200", 2021),
  createData(
    37,
    "Khách sạn H5(Thung Lũng Đại Dương)",
    "Ép cọc D600",
    "2,008,867,000",
    2021
  ),
  createData(
    38,
    "NM Điện gió BIM Ninh Thuận",
    "Ép cọc D800",
    "1,271,251,000",
    2021
  ),
  createData(
    39,
    "Dự án Charm Plaza 1 (A2)",
    "Khoan hạ Basic D500",
    "16,506,508,880",
    2020
  ),
  createData(
    40,
    "Phú Thọ Quốc Cường C-RIVER View",
    "Khoan hạ Hyper-MEGA D600",
    "12,025,193,614",
    2020
  ),
  createData(
    41,
    "Khách sạn Shantira Hội An",
    "Khoan hạ Hyper-MEGA D600",
    "7,742,299,000",
    2020
  ),
  createData(42, "Dự án Núi Cúi", "Khoan hạ DTH D700", "9,688,042,000", 2020),
  createData(43, "Dự án BCONS Garden", "Ép cọc D600", "5,600,806,174", 2020),
  createData(
    44,
    "Dự án PECC2",
    "Khoan hạ Hyper-MEGA D600",
    "4,002,327,300",
    2020
  ),
];
const row_found3 = [
  createData(
    45,
    "	NM Lọc hóa dầu Long Sơn 	",
    "	Khoan hạ Hyper-MEGA D300 - D400 	",
    "	3,878,496,150	",
    2020
  ),
  createData(
    46,
    "	Dự án Saigon Asiana 	",
    "	Khoan hạ Hyper-MEGA D600 	",
    "	3,631,591,500	",
    2020
  ),
  createData(
    47,
    "	Dự án Charm Plaza 1 	",
    "	Khoan hạ Basic D500, 	",
    "	16,449,067,800	",
    2020
  ),
  createData(
    48,
    "	NM Điện mặt trời DOHWA - QB 	",
    "	Ép cọc D300 	",
    "	2,582,610,000	",
    2020
  ),
  createData(
    49,
    "	Dự án Thung lũng Đại dương 	",
    "	Khoan dẫn D450 	",
    "	2,505,783,430	",
    2020
  ),
  createData(
    50,
    "	Dự án Bcons Tân Hòa 	",
    "	Khoan hạ Hyper-MEGA D600 	",
    "	2,411,315,809	",
    2020
  ),
  createData(
    51,
    "	Dự án AL-SHAHEEN GLF 	",
    "	Khoan hạ Hyper-MEGA D500 	",
    "	2,017,359,810	",
    2020
  ),
  createData(
    52,
    "	Dự án GELEXIMCO 	",
    "	Khoan hạ Hyper-MEGA D600 	",
    "	1,980,943,280	",
    2020
  ),
  createData(53, "	The Place Residence 	", "	Ép cọc D600 	", "	1,916,391,070	", 2020),
  createData(
    54,
    "	NM Điện mặt trời Thiên Tân 	",
    "	Ép cọc D300 	",
    "	1,685,940,000	",
    2020
  ),
  createData(
    55,
    "	NM Bia HEINEKEN 	",
    "	Khoan dẫn D300 – D400 	",
    "	1,461,720,000	",
    2020
  ),
  createData(
    56,
    "	NM Pin Ninh Phước 	",
    "	Đóng cọc D350, rung ép cọc SW350 	",
    "	30,633,736,155	",
    2019
  ),
  createData(
    57,
    "	Dự án S6-1 	",
    "	Khoan hạ Hyper-MEGA D800 	",
    "	13,208,600,500	",
    2019
  ),
  createData(
    58,
    "	NM Vĩnh Tân 2 	",
    "	Khoan hạ DTH D600 	",
    "	14,477,759,500	",
    2019
  ),
  createData(
    59,
    "	METRO STAR 	",
    "	Khoan hạ Basic D600 – D800 	",
    "	9,771,519,100	",
    2019
  ),
  createData(60, "	MARUBENI 	", "	Khoan hạ Basic D500 	", "	8,194,416,900	", 2019),
  createData(61, "	BKAC1 SOLAR POWER 	", "	Đóng cọc D300 	", "	3,997,354,200	", 2019),
  createData(
    62,
    "	Dự án LACOSMO 	",
    "	Khoan hạ Basic D600, Khoan dẫn D500 	",
    "	4,424,060,300	",
    2019
  ),
  createData(
    63,
    "	Dự án GALLAF 	",
    "	Khoan hạ Basic D500 	",
    "	2,812,400,000	",
    2019
  ),
  createData(64, "	Dự án Sơn Mỹ 	", "	Khoan dẫn D300 	", "	2,002,626,200	", 2019),
  createData(
    65,
    "	Trung tâm triển lãm SECC 	",
    "	Ép cọc D500 	",
    "	1,429,771,588	",
    2019
  ),
];
const steps = [
  {
    imagePath: "./image/duannenmong1.png",
    data: row_found1,
  },
  {
    imagePath: "./image/duannenmong2.png",
    data: row_found2,
  },
  {
    imagePath: "./image/duannenmong3.png",
    data: row_found3,
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

export default function FoundationProjects() {
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
      <Box display={"flex"}>
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
                  align="center"
                  sx={{ minWidth: 50, padding: "5px 0", fontSize: "11px" }}
                >
                  STT
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 250, padding: "5px 0", fontSize: "11px" }}
                >
                  TÊN DỰ ÁN
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: 250, padding: "5px 0", fontSize: "11px" }}
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
                      fontWeight: "400",
                      textAlign: "left",
                      padding: "5px 0",
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

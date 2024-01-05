// import { Button } from "@mui/material";
// import React from "react";
// import Table from "react-bootstrap/Table";
// import { useNavigate } from "react-router-dom";

// const handleSearch = () => {};
// export default function EquipmentList({ list }) {
//   const listEquipments = list;
//   const navigate = useNavigate();
//   const navigateEquipment = (item) => {
//     navigate(`/catalogue/${item.code}`);
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-center m-3">
//         <div className="input-group  w-50 ">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Tìm kiếm thiết bị..."
//             aria-label="Tìm kiếm thiết bị..."
//             aria-describedby="basic-addon2"
//             onChange={handleSearch}
//           />
//         </div>
//       </div>
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <Button variant="outlined">Thêm thiết bị</Button>
//       </div>
//       <Table striped bordered hover variant="" style={{ fontSize: "13px" }}>
//         <thead>
//           <tr>
//             <th>STT</th>
//             <th>TÊN THIẾT BỊ</th>
//             <th>MÃ THIẾT BỊ</th>
//             <th>THI CÔNG DỰ ÁN</th>
//             <th>NẰM Ở KHO BÃI</th>
//             <th> GHI CHÚ </th>
//           </tr>
//         </thead>
//         <tbody>
//           {listEquipments.map((item, index) => (
//             <tr
//               key={index}
//               onClick={() => {
//                 navigateEquipment(item);
//               }}
//               style={{ cursor: "pointer" }}
//             >
//               <td style={{ width: "5%" }}>{item.number}</td>
//               <td style={{ width: "35%" }}>{item.name}</td>
//               <td style={{ width: "15%" }}>{item.code}</td>
//               <td style={{ width: "15%" }}>{item.construction}</td>
//               <td style={{ width: "20%" }}>{item.location}</td>
//               <td style={{ width: "10%" }}>{item.note}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </>
//   );
// }

import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];
export default function EquipmentList() {
  const [tabPanel, setTabPanel] = useState("none");
  const [table, setTable] = useState("block");

  const handleAdd = () => {
    setTabPanel("block");
    setTable("none");
  };
  const handleClose = () => {
    setTabPanel("none");
    setTable("block");
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [value, setValue] = useState("1");
  const handleChange = (evt, newValue) => {
    return setValue(newValue);
  };
  return (
    <div style={{ position: "relative" }}>
      {/* SEARCH */}
      <div className="d-flex justify-content-center m-3">
        <div className="input-group  w-50 ">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm thiết bị..."
            aria-label="Tìm kiếm thiết bị..."
            aria-describedby="basic-addon2"
          />
        </div>
      </div>
      {/* BTN THÊM THIẾT BỊ */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => handleAdd()} className="btn btn-primary">
          Thêm thiết bị
        </button>
      </div>
      {/* EQUIPMENT LIST */}
      <div style={{ height: 400, width: "1100px", margin: "auto" }}>
        <Paper sx={{ width: "100%", overflow: "hidden", display: `${table}` }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      {/* TABPANEL THÊM THIẾT BỊ */}
      <div
        style={{
          display: `${tabPanel}`,
          position: "absolute",
          top: "10%",
          zIndex: 100,
          height: "100%",
          width: "100%",
          backgroundColor: "whitesmoke",
        }}
      >
        <button
          style={{ position: "absolute", right: "0", top: "0" }}
          className="btn btn-danger"
          onClick={() => handleClose()}
        >
          Đóng
        </button>

        <Box>
          <TabContext value={value}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <TabList onChange={handleChange}>
                <Tab label="THÔNG SỐ CHUNG" value="1" />
                <Tab label="THÔNG SỐ KỸ THUẬT" value="2" />
                <Tab label="NHẬT KÝ BẢO DƯỠNG - SỬA CHỮA" value="3" />
                <Tab label="QR" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="form-group d-flex mb-2">
                <label
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    width: "170px",
                    marginRight: "20px",
                  }}
                  className="form-control"
                  htmlFor="name"
                >
                  Tên thiết bị
                </label>
                <input
                  id="name"
                  className=" form-control w-75"
                  type="text"
                  placeholder="Nhập tên thiết bị..."
                />
              </div>

              <div className="form-group d-flex mb-2">
                <label
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    width: "170px",
                    marginRight: "20px",
                  }}
                  className="form-control"
                  htmlFor="name"
                >
                  Mã thiết bị
                </label>
                <input
                  id="code"
                  className=" form-control w-75"
                  type="text"
                  placeholder="Nhập mã thiết bị..."
                />
              </div>

              <div className="form-group d-flex mb-2">
                <select
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    width: "170px",
                    marginRight: "20px",
                  }}
                  className="form-select"
                >
                  <option value="isUse">
                    <label className="form-control">Thi công dự án</label>
                  </option>
                  <option value="IsInStock">
                    <label className="form-control">Nằm ở kho bãi</label>
                  </option>
                </select>

                <input
                  id="construction"
                  className=" form-control w-75"
                  type="text"
                  placeholder="Nhập vị trí..."
                />
              </div>
              {/* <div className="form-group d-flex mb-2">
                <label
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    width: "170px",
                    marginRight: "20px",
                  }}
                  className="form-control"
                  htmlFor="name"
                >
                  Nằm ở kho bãi
                </label>
                <input
                  id="location"
                  className=" form-control w-75"
                  type="text"
                  placeholder="Nhập tên thiết bị..."
                />
              </div> */}
              <div className="form-group d-flex mb-2">
                <label
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    width: "170px",
                    marginRight: "20px",
                  }}
                  className="form-control"
                  htmlFor="name"
                >
                  Ghi chú
                </label>
                <textarea
                  id="note"
                  className=" form-control w-75"
                  type="text"
                  placeholder=""
                />
              </div>
            </TabPanel>
            <TabPanel value="2"></TabPanel>
            <TabPanel value="3"></TabPanel>
            <TabPanel value="4"></TabPanel>
          </TabContext>
          <button
            style={{ position: "absolute", right: "0", bottom: "0" }}
            className="btn btn-success"
          >
            Lưu
          </button>
        </Box>
      </div>
    </div>
    // </div>
  );
}

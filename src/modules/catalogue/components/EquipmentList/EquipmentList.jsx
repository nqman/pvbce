import * as React from "react";
import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { getListEquipmentsAPI } from "../../../../apis/equipmentAPI";

export default function EquipmentList() {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/create");
  };

  // LIST EQUIPMENT
  const listEquipment = getListEquipmentsAPI();

  // const listEquipment = [
  //   {
  //     id: 1,
  //     name: "NIPPON DH508-1",
  //     divideCode: "DH508-1",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 2,
  //     name: "NIPPON DH508-2",
  //     divideCode: "DH508-2",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 3,
  //     name: "NIPPON DH508-3",
  //     divideCode: "DH508-3",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 4,
  //     name: "NIPPON DH508-4",
  //     divideCode: "DH508-4",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 5,
  //     name: "NIPPON DH508-5",
  //     divideCode: "DH508-5",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 6,
  //     name: "NIPPON DH508-6",
  //     divideCode: "DH508-6",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 7,
  //     name: "NIPPON DH508-7",
  //     divideCode: "DH508-7",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 8,
  //     name: "NIPPON DH508-8",
  //     divideCode: "DH508-8",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 9,
  //     name: "NIPPON DH508-9",
  //     divideCode: "DH508-9",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 10,
  //     name: "NIPPON DH508-10",
  //     divideCode: "DH508-10",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 11,
  //     name: "NIPPON DH508-11",
  //     divideCode: "DH508-11",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 12,
  //     name: "NIPPON DH508-12",
  //     divideCode: "DH508-12",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 13,
  //     name: "NIPPON DH508-13",
  //     divideCode: "DH508-13",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 14,
  //     name: "NIPPON DH508-14",
  //     divideCode: "DH508-14",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 15,
  //     name: "NIPPON DH508-15",
  //     divideCode: "DH508-15",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 16,
  //     name: "NIPPON DH508-16",
  //     divideCode: "DH508-16",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 17,
  //     name: "NIPPON DH508-17",
  //     divideCode: "DH508-17",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 18,
  //     name: "NIPPON DH508-18",
  //     divideCode: "DH508-18",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 19,
  //     name: "NIPPON DH508-19",
  //     divideCode: "DH508-19",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //   },
  //   {
  //     id: 20,
  //     name: "NIPPON DH508-20",
  //     divideCode: "DH508-20",
  //     constructionProject: "HCM",
  //     location: "VN",
  //     note: "man test",
  //     create: "124",
  //   },
  // ];

  const columns = [
    { id: "id", name: "STT" },
    { id: "qr", name: "QR" },
    { id: "name", name: "TÊN THIẾT BỊ" },
    { id: "divideCode", name: "MÃ THIẾT BỊ" },
    { id: "constructionProject", name: "THI CÔNG DỰ ÁN" },
    { id: "location", name: "NẰM Ở KHO BÃI" },
    { id: "note", name: "GHI CHÚ" },
  ];

  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);
  useEffect(() => {
    rowchange(listEquipment);
  }, []);
  // LIST EQUIPMENT

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
      <div style={{ textAlign: "center" }}>
        <Paper sx={{ width: "90%", marginLeft: "5%" }}>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      style={{ backgroundColor: "black", color: "white" }}
                      key={column.id}
                    >
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows
                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((row, index) => {
                      return (
                        <TableRow key={index}>
                          {columns &&
                            columns.map((column, index) => {
                              let value = row[column.id];
                              return <TableCell key={value}>{value}</TableCell>;
                            })}
                        </TableRow>
                      );
                    })}
                {/* {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.qr}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.divideCode}</TableCell>
                    <TableCell>{row.constructionProject}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.note}</TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={rowperpage}
            page={page}
            count={rows.length}
            component="div"
            onPageChange={handlechangepage}
            onRowsPerPageChange={handleRowsPerPage}
          ></TablePagination>
        </Paper>
      </div>
    </div>
    // </div>
  );
}

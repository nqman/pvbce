import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

export default function EquipList({ rows, onEdit, onDelete }) {
  const columns = [
    { id: "id", name: "STT" },
    { id: "qr", name: "QR" },
    { id: "name", name: "TÊN THIẾT BỊ" },
    { id: "divideCode", name: "MÃ THIẾT BỊ" },
    { id: "constructionProject", name: "THI CÔNG DỰ ÁN" },
    { id: "location", name: "NẰM Ở KHO BÃI" },
    { id: "note", name: "GHI CHÚ" },
    // { id: "edit", name: "SỬA" },
    // { id: "delete", name: "XÓA" },
  ];

  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  // const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

  return (
    <div style={{ textAlign: "center" }}>
      <Paper sx={{ width: "90%", marginLeft: "5%" }}>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader>
            <TableHead sx={{ color: "red" }}>
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
                      <TableRow sx={{ height: "75px" }} key={index}>
                        {/* {columns &&
                          columns.map((column) => {
                            let value = row[column.id];
                            return <TableCell>{value}</TableCell>;
                          })} */}
                        {/* <TableCell>{row.id}</TableCell> */}
                        <TableCell>{row.id}</TableCell>
                        <TableCell>
                          <img
                            style={{ width: "50px", height: "50px" }}
                            // src={row.qr}
                            src="https://images.unsplash.com/photo-1503427073713-8e991db6befe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNsYXNofGVufDB8fDB8fHww"
                            alt={row.name}
                          />
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.divideCode}</TableCell>
                        <TableCell>{row.constructionProject}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.note}</TableCell>
                        <div style={{ display: "flex" }}>
                          <button
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "25px",
                              height: "25px",
                              color: "black",
                            }}
                            className="btn btn-outline-warning me-2"
                            onClick={() => onEdit(row.divideCode)}
                          >
                            <EditIcon
                              sx={{ fontSize: "15px", margin: "auto" }}
                            />
                          </button>
                          <button
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "25px",
                              height: "25px",
                            }}
                            className="btn btn-outline-danger"
                            onClick={() => {
                              onDelete(row.divideCode);
                            }}
                          >
                            <ClearIcon />
                          </button>
                        </div>
                      </TableRow>
                    );
                  })}
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
  );
}

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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function EquipList({ rows, onEdit, onDelete, onRead }) {
  const navigate = useNavigate();
  const columns = [
    { id: "id", name: "STT" },
    { id: "qr", name: "QR" },
    { id: "name", name: "TÊN THIẾT BỊ" },
    { id: "divideCode", name: "MÃ THIẾT BỊ" },
    { id: "constructionProject", name: "THI CÔNG DỰ ÁN" },
    { id: "location", name: "NẰM Ở KHO BÃI" },
    { id: "note", name: "GHI CHÚ" },
    { id: "action", name: "TÙY CHỌN" },
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

  //Xem chi tiết thiết bị
  const handleRead = (id) => {
    navigate(`/catalogue/${id}`);
  };

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
                        <TableCell>{row.id}</TableCell>
                        <TableCell>
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src={row.pathOfQR}
                            alt={row.name}
                          />
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.divideCode}</TableCell>
                        <TableCell>{row.constructionProject}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.note}</TableCell>
                        <TableCell>
                          <div style={{ display: "flex" }}>
                            <button
                              style={{
                                padding: "0px",
                                height: "25px",
                                width: "25px",
                                marginRight: "10px",
                              }}
                              className="btn btn-success me-2"
                              onClick={() => handleRead(row.id)}
                            >
                              <VisibilityIcon
                                sx={{
                                  fontSize: "17px",
                                  marginBottom: "2px",
                                }}
                              />
                            </button>
                            <button
                              style={{
                                padding: "0px",
                                height: "25px",
                                width: "25px",
                                marginRight: "10px",
                              }}
                              className="btn btn-warning me-2"
                              onClick={() => onEdit(row.id)}
                            >
                              <EditIcon
                                sx={{
                                  fontSize: "17px",
                                  marginBottom: "2px",
                                }}
                              />
                            </button>
                            <button
                              style={{
                                padding: "0px",
                                height: "25px",
                                width: "25px",
                              }}
                              className="btn btn-danger"
                              onClick={() => {
                                onDelete(row.id);
                              }}
                            >
                              <ClearIcon
                                sx={{
                                  fontSize: "17px",
                                }}
                              />
                            </button>
                          </div>
                        </TableCell>
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

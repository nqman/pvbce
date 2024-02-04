import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
// const rows = [
//   {
//     id: 1,
//     qr: "@MUI",
//     name: 38,
//     dedivideCodesk: "D-546",
//     constructionProject: "D-546",
//     location: "D-546",
//     note: "D-546",
//   },
//   {
//     id: 2,
//     username: "@MUI-X",
//     age: 25,
//     desk: "D-042",
//   },
// ];

export default function ListEquipments({ rows, onEdit, onDelete }) {
  const navigate = useNavigate();
  //Xem chi tiết thiết bị
  const handleRead = (id) => {
    navigate(`/catalogue/${id}`);
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        style={{ fontSize: "14px" }}
        rows={rows.map((row) => ({ ...row, id: row.id }))}
        columns={[
          { field: "id", hideable: false, headerName: "STT", width: 50 },
          {
            field: "qr",
            headerName: "QR",
            width: 100,
            renderCell: (params) => (
              <img
                style={{ width: "50px", height: "50px" }}
                src={params.row.pathOfQR}
                alt={params.row.name}
              />
            ),
          },
          { field: "name", headerName: "TÊN THIẾT BỊ", width: 250 },
          { field: "divideCode", headerName: "MÃ THIẾT BỊ", width: 200 },
          {
            field: "constructionProject",
            headerName: "THI CÔNG DỰ ÁN",
            width: 250,
          },
          { field: "location", headerName: "NẰM Ở KHO BÃI", width: 250 },
          { field: "note", headerName: "GHI CHÚ", width: 250 },
          {
            field: "action",
            headerName: "TÙY CHỌN",
            width: 200,

            renderCell: (params) => (
              <div style={{ display: "flex" }}>
                <button
                  style={{
                    padding: "0px",
                    height: "25px",
                    width: "25px",
                    marginRight: "10px",
                  }}
                  className="btn btn-success me-2"
                  onClick={() => handleRead(params.id)}
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
                  onClick={() => onEdit(params.id)}
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
                    onDelete(params.id);
                  }}
                >
                  <ClearIcon
                    sx={{
                      fontSize: "17px",
                    }}
                  />
                </button>
              </div>
            ),
          },
        ]}
        slots={{
          toolbar: GridToolbar,
        }}
        {...rows}
        initialState={{
          ...rows.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 15]}
      />
    </div>
  );
}

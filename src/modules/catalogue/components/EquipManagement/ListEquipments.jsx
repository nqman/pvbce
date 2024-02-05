import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import "./styles.css";

export default function ListEquipments({ rows, onEdit, onDelete }) {
  const navigate = useNavigate();
  //Xem chi tiết thiết bị
  const handleRead = (id) => {
    navigate(`/catalogue/${id}`);
  };
  return (
    <StyledEngineProvider injectFirst>
      <div style={{ height: 500, width: "1150px" }}>
        <DataGrid
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
            { field: "name", headerName: "TÊN THIẾT BỊ", width: 200 },
            { field: "divideCode", headerName: "MÃ THIẾT BỊ", width: 200 },
            {
              field: "constructionProject",
              headerName: "THI CÔNG DỰ ÁN",
              width: 200,
            },
            { field: "location", headerName: "NẰM Ở KHO BÃI", width: 200 },
            { field: "note", headerName: "GHI CHÚ", width: 200 },
            {
              field: "action",
              headerName: "TÙY CHỌN",
              width: 100,

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
    </StyledEngineProvider>
  );
}

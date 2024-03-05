import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import "./styles.css";

export default function ListProjects({ rows, onEdit, onDelete }) {
  const navigate = useNavigate();
  //Xem chi tiết thiết bị
  const handleRead = (id) => {
    navigate(`/catalogue/${id}`);
  };

  return (
    <StyledEngineProvider injectFirst>
      <div
        style={{
          height: 500,
          width: "100%",
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <DataGrid
          style={{ padding: 10 }}
          rows={rows?.map((row) => ({ ...row, id: row.id }))}
          columns={[
            { field: "id", headerName: "STT", width: 50 },
            {
              field: "qr",
              headerName: "MÃ QR",
              width: 100,
              // align: "center",
              renderCell: (params) => (
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={params.row.imageOfQR}
                  alt={params.row.name}
                />
              ),
            },
            { field: "name", headerName: "TÊN THIẾT BỊ", width: 200 },
            { field: "divideCode", headerName: "MÃ THIẾT BỊ", width: 150 },
            {
              field: "constructionProject",
              headerName: "THI CÔNG DỰ ÁN",
              width: 180,
            },
            { field: "location", headerName: "NẰM Ở KHO BÃI", width: 180 },
            { field: "note", headerName: "GHI CHÚ", width: 150 },
            {
              field: "action",
              headerName: "TÙY CHỌN",
              width: 120,

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
                    title="Xem"
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
                    title="Sửa"
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
                      lineHeight: "15px",
                    }}
                    className="btn btn-danger"
                    onClick={() => {
                      onDelete(params.id);
                    }}
                    title="Xóa"
                  >
                    <ClearIcon
                      sx={{
                        fontSize: "20px",
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
            ...rows?.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 15]}
        />
      </div>
    </StyledEngineProvider>
  );
}
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import "./styles.css";

export default function ListProjects({ rows, onEdit, onDelete, role }) {
  const navigate = useNavigate();

  //Xem chi tiết thiết bị
  const handleRead = (id) => {
    navigate(`/projects/${id}`);
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
          rows={rows?.map((row, index) => ({
            ...row,
            id: row.id,
            index: index + 1,
          }))}
          columns={[
            { field: "index", headerName: "STT", width: 50 },

            { field: "name", headerName: "TÊN DỰ ÁN", width: 400 },
            { field: "startDate", headerName: "NGÀY BẮT ĐẦU", width: 150 },
            {
              field: "endDate",
              headerName: "NGÀY KẾT THÚC",
              width: 150,
            },
            { field: "note", headerName: "GHI CHÚ", width: 250 },
            ...(role && !role !== "Admin"
              ? [
                  {
                    field: "action",
                    headerName: "TÙY CHỌN",
                    width: 150,
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
                          onClick={() => onDelete(params.id)}
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
                ]
              : []),
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

import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { StyledEngineProvider } from "@mui/material";
// import "./styles.css";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fetchPdfDoc } from "../../../apis/documentAPI";
import { FitScreen } from "@mui/icons-material";

export default function ListEquipments({ onDelete, listDocs, role }) {
  const rows = listDocs;
  const getPdf = async (id, type) => {
    try {
      const url = await fetchPdfDoc(id, type);
      window.open(url, "_blank");
    } catch (error) {}
  };

  return (
    <StyledEngineProvider injectFirst>
      <div
        style={{
          height: 500,
          width: "100%",
          margin: "auto",
          overflow: "hidden",
          marginTop: "20px",
        }}
      >
        <DataGrid
          style={{ padding: 10 }}
          rows={rows.map((row) => ({ ...row, id: row.id }))}
          columns={[
            { field: "name", headerName: "TÊN TÀI LIỆU", width: 800 },
            { field: "type", headerName: "LOẠI TÀI LIỆU", width: 200 },

            {
              field: "action",
              headerName: "TÙY CHỌN",
              width: 150,

              renderCell: (params) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {params?.type !== "excel" && (
                    <button
                      className="btn btn-success"
                      style={{
                        padding: "0px",
                        height: "25px",
                        width: "25px",
                        marginRight: "10px",
                      }}
                      onClick={() => getPdf(params?.id, "view")}
                    >
                      <VisibilityIcon
                        sx={{
                          fontSize: "17px",
                          marginBottom: "2px",
                        }}
                      />
                    </button>
                  )}
                  {params?.type !== "link" && (
                    <button
                      className="btn btn-dark"
                      style={{
                        padding: "0px",
                        height: "25px",
                        width: "25px",
                        marginRight: "10px",
                      }}
                      onClick={() => getPdf(params?.id, "attachment")}
                    >
                      <FileDownloadIcon
                        sx={{
                          fontSize: "17px",
                        }}
                      />
                    </button>
                  )}

                  {role && role !== "Admin" && (
                    <button
                      style={{
                        padding: "0px",
                        height: "25px",
                        width: "25px",
                      }}
                      className="btn btn-danger"
                      onClick={() => onDelete(params?.id)}
                    >
                      <ClearIcon
                        sx={{
                          fontSize: "17px",
                        }}
                      />
                    </button>
                  )}
                </div>
              ),
            },
          ]}
          sx={{ width: "100%" }}
          slots={{
            toolbar: GridToolbar,
          }}
          {...rows}
          initialState={{
            ...rows.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 15]}
          disableSelectionOnClick={true}
        />
      </div>
    </StyledEngineProvider>
  );
}

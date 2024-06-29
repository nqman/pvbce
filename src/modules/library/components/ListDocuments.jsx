import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  viVN,
} from "@mui/x-data-grid";

import { StyledEngineProvider } from "@mui/material";
// import "./styles.css";
import ClearIcon from "@mui/icons-material/Clear";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fetchPdfDoc } from "../../../apis/documentAPI";
import { useNavigate } from "react-router-dom";
import { Box, Pagination, PaginationItem } from "@mui/material";
import "./style.css";

export default function ListEquipments({
  onDelete,
  listDocs,
  role,
  selectedCategoryOne,
  selectedCategoryTwo,
}) {
  const rows = listDocs;
  const getPdf = async (id, type) => {
    try {
      const url = await fetchPdfDoc(id, type);
      window.open(url, "_blank");
    } catch (error) {}
  };
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }
  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <div
        style={{
          // height: "",
          width: "100%",
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <DataGrid
          style={{
            paddingTop: "10px",
            borderTop: 0,
            borderRadius: "0 0 5px 5px",
          }}
          rows={rows.map((row, index) => ({
            ...row,
            id: row.id,
            index: index + 1,
          }))}
          columns={[
            // { field: "index", headerName: "STT", width: 50 },
            {
              field: "name",
              headerName: "TÊN TÀI LIỆU",
              width: 900,
            },
            {
              field: "visible",
              headerName: "HIỂN THỊ",
              width: 100,
              align: "center",
              renderCell: (params) => {
                return (
                  <div className="align-to-center">
                    {params.row?.scope === "public" ? (
                      <PublicIcon titleAccess="Tài liệu công khai" />
                    ) : (
                      <LockIcon titleAccess="Tài liệu nội bộ" />
                    )}
                  </div>
                );
              },
            },
            // { field: "type", headerName: "LOẠI TÀI LIỆU", width: 150 },

            {
              field: "action",
              headerName: "TÙY CHỌN",
              width: 150,
              align: "right",
              headerAlign: "center",

              renderCell: (params) => {
                return (
                  <div>
                    {(params.row?.type === "pdf" ||
                      params.row?.type === "link") && (
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
                            fontSize: "15px",
                            marginBottom: "2px",
                          }}
                        />
                      </button>
                    )}
                    {params.row?.type !== "link" && (
                      <button
                        style={{
                          width: "25px",
                          height: "25px",
                          padding: "0 0 2px 0",
                          marginRight: "10px",
                        }}
                        className="btn btn-dark"
                        onClick={() => getPdf(params.row?.id, "attachment")}
                      >
                        <FileDownloadIcon
                          sx={{
                            fontSize: "15px",
                          }}
                        />
                      </button>
                    )}
                    {role !== "null" && role && role === "Admin" && (
                      <button
                        style={{
                          width: "25px",
                          height: "25px",
                          padding: "0 0 2px 0",
                          marginRight: "10px",
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
                );
              },
            },
          ]}
          slots={{
            pagination: CustomPagination,
            toolbar: QuickSearchToolbar,
          }}
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
          {...rows}
          initialState={{
            ...rows.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 15]}
          disableRowSelectionOnClick={true}
          ignoreDiacritics={true}
        />
      </div>
    </StyledEngineProvider>
  );
}

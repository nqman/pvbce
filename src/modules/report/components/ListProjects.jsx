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
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Pagination,
  PaginationItem,
  StyledEngineProvider,
} from "@mui/material";
import "./styles.css";

export default function ListProjects({ rows, onEdit, onDelete, role }) {
  const navigate = useNavigate();

  //Xem chi tiết dự án
  const handleRead = (id) => {
    navigate(`/projects/${id}`);
  };
  console.log(rows);
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
        // @ts-expect-error
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

            { field: "name", headerName: "TÊN DỰ ÁN", width: 380 },
            { field: "startDate", headerName: "NGÀY BẮT ĐẦU", width: 150 },
            {
              field: "endDate",
              headerName: "NGÀY KẾT THÚC",
              width: 150,
            },
            { field: "note", headerName: "GHI CHÚ", width: 150 },

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
                  {role && role === "Admin" && (
                    <>
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
                    </>
                  )}
                </div>
              ),
            },
          ]}
          slots={{
            pagination: CustomPagination,
            toolbar: QuickSearchToolbar,
          }}
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
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

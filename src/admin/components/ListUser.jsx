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
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Pagination,
  PaginationItem,
  Radio,
  RadioGroup,
  StyledEngineProvider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Swal from "sweetalert2";

export default function ListUser({ rows, onEdit, onDelete, role, onEnable }) {
  const navigate = useNavigate();
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
          // height: 500,
          width: "100%",
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={rows.map((row, index) => ({
            ...row,
            id: row.id,
            index: index + 1,
          }))}
          columns={[
            { field: "index", headerName: "STT", width: 50 },

            { field: "name", headerName: "HỌ TÊN", width: 250 },
            { field: "email", headerName: "EMAIL", width: 300 },
            { field: "phone", headerName: "SỐ ĐIỆN THOẠI", width: 200 },
            {
              field: "role",
              headerName: "ROLE",
              width: 100,
              renderCell: (params) => {
                return <div>{params.row.roles[0]?.name}</div>;
              },
            },

            {
              field: "enable",
              headerName: "KÍCH HOẠT",
              width: 100,
              renderCell: (params) => {
                return (
                  <div>
                    {params.value ? (
                      <button
                        title="Đã kích hoạt"
                        style={{
                          // pointerEvents: "none",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onClick={() =>
                          onEnable(params.row?.email, params.row?.enable)
                        }
                      >
                        <CheckCircleIcon sx={{ color: "green" }} />
                      </button>
                    ) : (
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() =>
                          onEnable(params.row?.email, params.row?.enable)
                        }
                        title="Chưa kích hoạt"
                      >
                        <CheckCircleIcon />
                      </button>
                    )}
                  </div>
                );
              },
            },

            {
              field: "action",
              headerName: "TÙY CHỌN",
              width: 150,

              renderCell: (params) => (
                <div
                // style={{
                //   display: "flex",
                //   width: "100%",
                //   justifyContent: "center",
                // }}
                >
                  {/* {console.log(params)} */}

                  <button
                    style={{
                      padding: "0px",
                      height: "25px",
                      width: "25px",
                      marginRight: "10px",
                    }}
                    className="btn btn-warning me-2"
                    onClick={() => onEdit(params.row?.email)}
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
            pagination: CustomPagination,
            toolbar: QuickSearchToolbar,
          }}
          {...rows}
          initialState={{
            ...rows.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 15]}
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
          ignoreDiacritics
          disableRowSelectionOnClick
        />
      </div>
    </StyledEngineProvider>
  );
}

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

export default function ListEquipments({ rows, onEdit, onDelete, role }) {
  const navigate = useNavigate();
  //Xem chi tiết thiết bị
  const handleRead = (id) => {
    navigate(`/catalogue/equipments/${id}`);
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
          rows={rows.map((row, index) => ({
            ...row,
            id: row.id,
            index: index + 1,
          }))}
          columns={[
            {
              field: "index",
              headerName: "STT",
              width: 50,
            },
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
            { field: "note", headerName: "LỊCH SỬ THI CÔNG", width: 150 },
            {
              field: "action",
              headerName: "TÙY CHỌN",
              width: 120,

              renderCell: (params) => (
                <div
                  style={{
                    display: "flex",
                    margin: "auto",
                  }}
                >
                  <button
                    style={{
                      width: "25px",
                      height: "25px",
                      padding: "0 0 2px 0",
                      marginRight: "10px",
                    }}
                    className="btn btn-success"
                    onClick={() => handleRead(params.id)}
                    title="Xem"
                  >
                    <VisibilityIcon
                      sx={{ fontSize: "15px", fontWeight: "bold" }}
                    />
                  </button>
                  {role === "Admin" && role && (
                    <>
                      <button
                        style={{
                          width: "25px",
                          height: "25px",
                          padding: "0 0 2px 0",
                          marginRight: "10px",
                        }}
                        className="btn btn-dark"
                        onClick={() => onEdit(params.id)}
                        title="Sửa"
                      >
                        <EditIcon
                          sx={{ fontSize: "14px", fontWeight: "bold" }}
                        />
                      </button>

                      {/* <button
                        style={{
                          border: "1px solid",
                          borderRadius: "5px",
                          background: "none",
                          color: "red",
                        }}
                        onClick={() => {
                          onDelete(params.id);
                        }}
                        title="Xóa"
                      >
                        <ClearIcon
                          sx={{ fontSize: "20px", fontWeight: "bold" }}
                        />
                      </button> */}
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
            ...rows.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 15]}
          ignoreDiacritics
        />
      </div>
    </StyledEngineProvider>
  );
}

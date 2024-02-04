import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const rows = [
  {
    id: 1,
    qr: "@MUI",
    name: 38,
    dedivideCodesk: "D-546",
    constructionProject: "D-546",
    location: "D-546",
    note: "D-546",
  },
  {
    id: 2,
    username: "@MUI-X",
    age: 25,
    desk: "D-042",
  },
];

export default function ListEquipments() {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        columns={[
          { field: "id", hideable: false, headerName: "STT", width: 50 },
          { field: "qr", headerName: "QR", width: 100 },
          { field: "name", headerName: "TÊN THIẾT BỊ", width: 250 },
          { field: "divideCode", headerName: "MÃ THIẾT BỊ" },
          { field: "constructionProject", headerName: "THI CÔNG DỰ ÁN" },
          { field: "location", headerName: "NẰM Ở KHO BÃI" },
          { field: "note", headerName: "GHI CHÚ" },
          { field: "action", headerName: "TÙY CHỌN", width: 200 },
        ]}
        rows={rows}
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

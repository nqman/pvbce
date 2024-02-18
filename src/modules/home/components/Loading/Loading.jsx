import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Box sx={{ display: "block", textAlign: "center" }}>
      <CircularProgress size={"100px"} style={{ marginTop: "10%" }} />
      <h1 style={{ marginTop: "20px" }}>Vui lòng đợi...</h1>
    </Box>
  );
}

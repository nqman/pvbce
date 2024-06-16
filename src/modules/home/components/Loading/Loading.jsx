import { Box, CircularProgress } from "@mui/material";
import React from "react";

import FadeLoader from "react-spinners/FadeLoader";
export default function Loading() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "70vh",
      }}
    >
      {/* <CircularProgress size={"100px"} style={{ marginTop: "10%" }} />
       */}
      <FadeLoader
        height={20}
        radius={2}
        speedMultiplier={2}
        width={3}
        color="#404490"
      />
      {/* <h1 style={{ marginTop: "20px" }}>Vui lòng đợi...</h1> */}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Header from "../Header/Header";

import { Outlet } from "react-router-dom";
// import Loading from "../Loading/Loading";
import { Box, LinearProgress } from "@mui/material";

export default function MainLayout() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Perform any necessary operations before unloading the page
      setIsLoading(true); // Set isLoading to true before unloading
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <Outlet />
      </div>
    </div>
  );
}

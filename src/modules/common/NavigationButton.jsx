import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function NavigationButton({ url, name }) {
  const navigate = useNavigate();
  return (
    <Button
      sx={{
        textTransform: "initial",
        paddingLeft: "5px",
        paddingRight: "5px",
        fontSize: "13px",
        fontWeight: "bold",
      }}
      onClick={() => {
        navigate(url);
      }}
    >
      <ArrowBackIosIcon sx={{ fontSize: "12px" }} />
      {name}
    </Button>
  );
}

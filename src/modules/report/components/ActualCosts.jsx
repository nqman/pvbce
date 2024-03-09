import React from "react";
import { ActualCostPerWeek } from "./ActualCostPerWeek";
import { Container } from "@mui/material";

export default function ActualCosts() {
  return (
    <div>
      <Container className="mt-5">
        <ActualCostPerWeek />
      </Container>
    </div>
  );
}

import React from "react";
import { Container } from "@mui/material";
import EmployeeManagement from "../components/EmployeeManagement";

export default function Employees() {
  return (
    <>
      <Container maxWidth="lg">
        <EmployeeManagement />
      </Container>
    </>
  );
}

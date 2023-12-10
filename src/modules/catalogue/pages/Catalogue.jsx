import React from "react";
import General_InFormation from "../components/General_Information/General_InFormation";
import HistoryEquipment from "../components/HistoryEquipment/HistoryEquipment";
import TechnicalSheet from "../components/TechnicalSheet/TechnicalSheet";
import Maintenance from "../components/Maintenance/Maintenance";
import { Container } from "@mui/material";

export default function Catalogue() {
  return (
    <>
      <Container maxWidth="lg">
        <General_InFormation />
        <TechnicalSheet />
        <HistoryEquipment />
        <Maintenance />
      </Container>
    </>
  );
}

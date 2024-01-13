import React from "react";
import HistoryEquipment from "../components/EquipDetails/HistoryEquipment/HistoryEquipment";
import TechnicalSheet from "../components/EquipDetails/TechnicalSheet/TechnicalSheet";
import Maintenance from "../components/EquipDetails/Maintenance/Maintenance";
import { Container } from "@mui/material";
import EquipManagement from "../components/EquipManagement/EquipManagement";

export default function Catalogue() {
  return (
    <>
      <Container maxWidth="lg">
        {/* <GeneralInFormation />
        <TechnicalSheet />
        <HistoryEquipment />
        <Maintenance /> */}
        <EquipManagement />
      </Container>
    </>
  );
}

import React from "react";
import GeneralInFormation from "../components/EquipmentItem/GeneralInformation/GeneralInFormation";
import HistoryEquipment from "../components/EquipmentItem/HistoryEquipment/HistoryEquipment";
import TechnicalSheet from "../components/EquipmentItem/TechnicalSheet/TechnicalSheet";
import Maintenance from "../components/EquipmentItem/Maintenance/Maintenance";
import { Container } from "@mui/material";
import EquipmentList from "../components/EquipmentList/EquipmentList";

export default function Catalogue() {
  return (
    <>
      <Container maxWidth="lg">
        {/* <GeneralInFormation />
        <TechnicalSheet />
        <HistoryEquipment />
        <Maintenance /> */}
        <EquipmentList />
      </Container>
    </>
  );
}

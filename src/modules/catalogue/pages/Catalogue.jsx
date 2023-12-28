import React from "react";
import HistoryEquipment from "../components/EquipmentItem/HistoryEquipment/HistoryEquipment";
import TechnicalSheet from "../components/EquipmentItem/TechnicalSheet/TechnicalSheet";
import Maintenance from "../components/EquipmentItem/Maintenance/Maintenance";
import { Container } from "@mui/material";
import EquipmentList from "../components/EquipmentList/EquipmentList";
import data from "../components/EquipmentList/equipmentData.json";

export default function Catalogue() {
  return (
    <>
      <Container maxWidth="lg">
        {/* <GeneralInFormation />
        <TechnicalSheet />
        <HistoryEquipment />
        <Maintenance /> */}
        <EquipmentList list={data} />
      </Container>
    </>
  );
}

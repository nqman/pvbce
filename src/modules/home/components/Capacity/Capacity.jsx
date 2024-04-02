import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EquipCapacity from "./EquipCapacity";
import ConstructionCapacity from "./ConstructionCapacity";
import EquipRentals from "./EquipRentals";
import WorkshopCapacity from "./WorkshopCapacity";

export default function Capacity() {
  const [value, setValue] = useState("1");
  const handleChange = (evt, newValue) => {
    return setValue(newValue);
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h1
        className="text-center"
        style={{ fontSize: "30px ", fontWeight: "bold" }}
      >
        NĂNG LỰC
      </h1>
      <Box>
        <TabContext value={value}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <TabList onChange={handleChange}>
              <Tab label="NĂNG LỰC THIẾT BỊ" value="1" />
              <Tab label="NĂNG LỰC THI CÔNG" value="2" />
              <Tab label="NĂNG LỰC CHO THUÊ THIẾT BỊ" value="3" />
              <Tab label="NĂNG LỰC KHO XƯỞNG" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1" style={{ paddingTop: 0 }}>
            <EquipCapacity />
          </TabPanel>
          <TabPanel value="2">
            <ConstructionCapacity />
          </TabPanel>
          <TabPanel value="3" style={{ paddingTop: 0 }}>
            <EquipRentals />
          </TabPanel>
          <TabPanel value="4">
            <WorkshopCapacity />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

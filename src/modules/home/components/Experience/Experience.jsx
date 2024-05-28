import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import FoundationProjects from "./FoundationProjects";
import OtherProjects from "./OtherProjects";

export default function Experience() {
  const [value, setValue] = useState("1");
  const handleChange = (evt, newValue) => {
    return setValue(newValue);
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <h1
        className="text-center"
        style={{ fontSize: "30px ", fontWeight: "bold" }}
      >
        KINH NGHIỆM THI CÔNG
      </h1>
      <Box>
        <TabContext value={value}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <TabList onChange={handleChange}>
              <Tab
                sx={{ fontSize: "16px" }}
                label="NHÓM DỰ ÁN NỀN MÓNG"
                value="1"
              />
              <Tab
                sx={{ fontSize: "16px" }}
                label="NHÓM DỰ ÁN KHÁC"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <FoundationProjects />
          </TabPanel>
          <TabPanel value="2">
            <OtherProjects />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

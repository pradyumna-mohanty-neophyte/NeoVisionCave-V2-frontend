import React from "react";
// import { useState } from "react";
// import SideNav from "../others/sidenav";
import SettingsHeader from "./settingsHeader";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import EnvConfigs from "./envConfigs";
import EnvironmentalConfigs from "./EnvironmentalConfigs";
// import Roi from "./roi";
// import RoiNew from "./roiNew";
import RoiUp from "./roiUp";
import DepthCal from "./depthCal";
// import { BiReset } from "react-icons/bi";
// import { MdOutlineRefresh } from "react-icons/md";

// import { AiOutlineInfoCircle } from "react-icons/ai";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";

export default function Settings() {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="w-full h-full scrollbar flex bg-gray-100">
      {/* <SideNav /> */}
      {/* <div className="w-2/12 h-screen"></div> */}
      <div className="w-full h-full">
        <div className="w-full shadow-sm z-50 fixed flex bg-white py-3">
          <SettingsHeader />
        </div>
        <div className="w-10/12 h-12"></div>
        <div className="w-full h-full px-3 py-4 flex justify-center">
          <div className="w-full bg-white rounded-md shadow-lg flex flex-col">
            <Box sx={{ width: "100%" }}>
              <Box
                className="flex flex-row"
                // sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Environmental Configurations" {...a11yProps(0)} />
                  <Tab label="Region Of Interest" {...a11yProps(1)} />
                  <Tab label="Depth Calibration" {...a11yProps(2)} />
                </Tabs>
                {/* <div className="flex-grow flex justify-end pr-4">
                  <button
                    id="poppinsFont"
                    type="button"
                    className="px-4 py-1.5 self-center rounded-md shadow-md text-sky-500 border border-sky-500 hover:border-sky-400 hover:bg-sky-100 active:bg-sky-500 active:text-white"
                  >
                    <div className="flex flex-row self-center space-x-2">
                      <MdOutlineRefresh className="self-center text-xl" />
                      <span>Reset All</span>
                    </div>
                  </button>
                </div> */}
              </Box>
              <TabPanel value={value} index={0}>
                {/* <EnvConfigs /> */}
                <EnvironmentalConfigs />
              </TabPanel>
              <TabPanel value={value} index={1}>
                {/* <RoiNew /> */}
                {/* <Roi /> */}
                <RoiUp />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <DepthCal />
              </TabPanel>
            </Box>
            {/* <EnvConfigs />
            <Roi />
            <DepthCal /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

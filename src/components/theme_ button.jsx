import React, { useState, useEffect } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { Button, Menu, MenuItem } from '@mui/material';

// Define Themes
const themes = {
  light: {
    name: "light",
    primary: "#3f51b5", // Default Material UI primary
    secondary: "#f50057", // Default Material UI secondary
    background: "#ffffff",
    paper: "#f5f5f5",
    text: "#333333",
    divider: "#e0e0e0",
    buttonBg: "#3f51b5",
    buttonText: "#ffffff",
    tableBg: "#ffffff",
    tableHeader: "#02b6d2",
    tableCell: "#ffffff",
    cardBg: "#ffffff",
  },
  neo: {
    name: "neo",
    primary: "#04fcfc", // Bright cyan
    secondary: "#0c04fc", // Bright blue
    background: "#040407", // Very dark blue/black
    paper: "#040454", // Dark blue
    text: "#8cfcfc", // Light cyan
    buttonBg: "#0c04fc", // Bright blue
    buttonText: "#7cfcfc", // Light cyan
    tableBg: "#040407", // Very dark blue/black
    tableHeader: "#040454", // Dark blue
    tableCell: "#020213", // Very dark blue
    cardBg: "#040424", // Dark blue
  },
  dark: {
    name: "dark",
    primary: "#bb86fc", // Purple-ish
    secondary: "#03dac6", // Teal
    background: "#121212", // Very dark gray
    paper: "#1e1e1e", // Dark gray
    text: "#e0e0e0", // Light gray
    buttonBg: "#2d2d2d", // Medium gray
    buttonText: "#e0e0e0", // Light gray
    tableBg: "#1e1e1e", // Dark gray
    tableHeader: "#2d2d2d", // Medium gray
    tableCell: "#252525", // Dark gray
    cardBg: "#252525", // Dark gray
  }
};

const ThemeModeButton = ({ onThemeChange }) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("dashboard-theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      applyTheme(themes[savedTheme]);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("dashboard-theme", theme);
    applyTheme(themes[theme]); // Apply new theme
    if (onThemeChange) onThemeChange(themes[theme]);
    handleClose();
  };

  const applyTheme = (theme) => {
    // Update CSS variables dynamically for all components
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--background-color', theme.background);
    document.documentElement.style.setProperty('--paper-color', theme.paper);
    document.documentElement.style.setProperty('--text-color', theme.text);
    document.documentElement.style.setProperty('--button-bg', theme.buttonBg);
    document.documentElement.style.setProperty('--button-text', theme.buttonText);
    document.documentElement.style.setProperty('--table-bg', theme.tableBg);
    document.documentElement.style.setProperty('--table-header', theme.tableHeader);
    document.documentElement.style.setProperty('--table-cell', theme.tableCell);
    document.documentElement.style.setProperty('--card-bg', theme.cardBg);

    // Apply to body for immediate visual changes
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
  };

  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'light':
        return <LightModeIcon />;
      case 'neo':
        return <ColorLensIcon style={{ color: "#04fcfc" }} />;
      case 'dark':
        return <DarkModeIcon />;
      default:
        return <LightModeIcon />;
    }
  };

  return (
    <>
      <Button
        id="theme-mode-button"
        variant="contained"
        onClick={handleClick}
        startIcon={getThemeIcon()}
        style={{ 
          backgroundColor: themes[currentTheme].buttonBg,
          color: themes[currentTheme].buttonText
        }}
      >
        {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Mode
      </Button>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleThemeChange("light")}>
          <LightModeIcon style={{ marginRight: '8px' }} />
          Light Mode
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("neo")}>
          <ColorLensIcon style={{ marginRight: '8px', color: "#04fcfc" }} />
          Neo Mode
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("dark")}>
          <DarkModeIcon style={{ marginRight: '8px' }} />
          Dark Mode
        </MenuItem>
      </Menu>
    </>
  );
};

/*export default ThemeModeButton;*/

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react'
import { SettingsContext } from '../../../context/SettingsContext';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from '@mui/material/IconButton';

const ThemeChanger = (props:any) => {
  const {styles={}} = props
  const { settings, saveSettings } = React.useContext(SettingsContext);

    const handleModeToggle = () => {
      if (settings.mode === "light") {
        saveSettings({ mode: "dark" });
      } else {
        saveSettings({ mode: "light" });
      }
    };
  return (
    <Box sx={{ ...styles }}>
      <Typography sx={{ minWidth: 50 }}>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          onClick={handleModeToggle}
        >
          {settings.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Typography>
    </Box>
  );
}

export default ThemeChanger
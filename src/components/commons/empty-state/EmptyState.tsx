import React from 'react'
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { SettingsContext } from '../../../context/SettingsContext';

const EmptyState:React.FC<{message?:string}> = (props) => {
  const {settings}=React.useContext(SettingsContext)
  return (
    <Box
      className="empty_state"
      sx={{
        padding: "1em 1em",
        background: settings.mode === "light" ? "whitesmoke" : "#30334e",
      }}
    >
      {/* <SentimentVeryDissatisfiedIcon /> */}
      <Typography color={"text.secondary"}>
        {props.message ?? "No Data Found!"}{" "}
      </Typography>
    </Box>
  );
}

export default EmptyState
import React from 'react'
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';

const EmptyState:React.FC<{message?:string}> = (props) => {
  return (
    <Box
      className="empty_state"
      sx={{ padding: "1em 1em", background: "whitesmoke" }}
    >
      {/* <SentimentVeryDissatisfiedIcon /> */}
      <Typography color={"text.secondary"}>
        {props.message ?? "No Data Found!"}{" "}
      </Typography>
    </Box>
  );
}

export default EmptyState
import * as React from "react";
import Box from "@mui/material/Box";
import FolderIcon from "@mui/icons-material/Folder";
import './Folder.css'
import { Typography } from "@mui/material";
type FolderType = {
  name: string;
  width: string;
  height: string;
};
export default function Folder({ name, width, height }: FolderType) {
  return (
    <Box
      sx={{
        width,
        height,
        backgroundColor: "#e8f0fe",
        // color: "#185abc",
        border: "1px solid lighgray",
        "&:hover": {
          color: "#185abc !important",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "1em",
        cursor: "pointer",
      }}
    >
      <FolderIcon
        style={{ color: "#3c4043", marginRight: "10px" }}
        fontSize="large"
      />
      <Typography sx={{ color: "#3c4043" }}>
        {name}
      </Typography>
    </Box>
  );
}

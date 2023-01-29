import * as React from "react";
import Box from "@mui/material/Box";
import FolderIcon from "@mui/icons-material/Folder";
import './Folder.css'
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FolderStructureType, SectionType } from "../../lib/types.index";

type FolderType = {
  data: FolderStructureType;
  sectionType:SectionType;
  width: string;
  height: string;
};
export default function Folder({ data,sectionType, width, height }: FolderType) {
  const navigate =useNavigate();
  console.log(data)
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
      onClick={()=>{
        navigate(`/dashboard/${sectionType}/folders/${data.id}`)
      }}
    >
      <FolderIcon
        style={{ color: "#3c4043", marginRight: "10px" }}
        fontSize="large"
      />
      <Typography sx={{ color: "#3c4043" }}>
        {data?.name}
      </Typography>
    </Box>
  );
}

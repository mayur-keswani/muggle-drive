import React,{useState} from "react";
import Box from "@mui/material/Box";
import FolderIcon from "@mui/icons-material/Folder";
import './Folder.css'
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FolderStructureType, SectionType } from "../../lib/types.index";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

type FolderType = {
  data: FolderStructureType;
  sectionType:SectionType;
  width: string;
  height: string;
};
export default function Folder({ data,sectionType, width, height }: FolderType) {
  const [showOptions, setShowOptions] = useState<null | HTMLElement>(null);
  const navigate =useNavigate();

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
        justifyContent: "space-between",
        padding: "1em",
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(`/dashboard/${sectionType}/folders/${data.id}`);
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection:'row'
        }}
      >
        <FolderIcon
          style={{ color: "#3c4043", marginRight: "10px" }}
          fontSize="large"
        />
        <Typography sx={{ color: "#3c4043" }}>{data?.name}</Typography>
      </Box>
      <Box sx={{ float: "right" }}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={showOptions ? "long-menu" : undefined}
          aria-expanded={showOptions ? "true" : undefined}
          aria-haspopup="true"
          onClick={(e: any) => {
            e.stopPropagation();
            setShowOptions(e.target);
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={showOptions}
          open={!!showOptions}
          onClose={(e: any) => {
            e.stopPropagation();
            setShowOptions(null);
          }}
        >
          <MenuItem onClick={() => {}}>
            <ListItemIcon>
              <DriveFileRenameOutlineIcon />
            </ListItemIcon>
            <ListItemText>Rename</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => {}}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

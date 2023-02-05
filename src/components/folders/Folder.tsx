import React, { useState, useContext } from "react";
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
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ConfirmDialog from "../commons/confirm-dialog/ConfirmDialog";
import { deleteFolderAPI, recoverFolderAPI } from "../../lib/lambdaApi";
import { FoldersContent } from "../../context/FolderContext";
import { BIN } from "../../context/constants";
import { NotificationContent } from "../../context/NotificationContext";

type FolderType = {
  data: FolderStructureType;
  sectionType:SectionType;
  width: string;
  height: string;
};
export default function Folder({ data,sectionType, width, height }: FolderType) {
  const {removeFolder,recoverFolder}=useContext(FoldersContent)
  const {updateNotification} =useContext(NotificationContent)
  const [showOptions, setShowOptions] = useState<null | HTMLElement>(null);
  const [showDeleteConfirmDialog,setShowDeleteConfirmDialog] = useState(false)
  const navigate =useNavigate();

  const onDelete=async(id:string)=>{
    try{
      const response=await deleteFolderAPI(id);
      setShowDeleteConfirmDialog(false);
      removeFolder(id);
      updateNotification({ type: "success", message: "Folder Deleted Successfully!" });

    }catch(error){
      console.log(error);
      updateNotification({ type: "error", message: "Failed to Delete Folder!" });
    }
  }

  const onRecover = async (id: string) => {
      try {
        const response = await recoverFolderAPI(id);
        recoverFolder(id);
        updateNotification({type:'success',message:'Folder Recovered!'})
      } catch (error) {
        console.log(error);
        updateNotification({ type: "error", message: "Failed to Recover!" });

      }
  };
  


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
        paddingRight: "1em",
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(`/dashboard/${sectionType}/folders/${data.id}`);
      }}
    >
      <ConfirmDialog
        handleClose={(e) => {
          e.stopPropagation();
          setShowDeleteConfirmDialog(false);
        }}
        isOpen={showDeleteConfirmDialog}
        handleSubmit={(e: any) => {
          e.stopPropagation();
          onDelete(data.id);
        }}
        title={`Delete folder ${data.name}`}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "row",
          width: "100%",
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
          {sectionType === "bin" ? (
            <MenuItem onClick={(e) => {e.stopPropagation(); onRecover(data.id);}}>
              <ListItemIcon>
                <AutorenewIcon />
              </ListItemIcon>
              <ListItemText>Recover</ListItemText>
            </MenuItem>
          ) : (
            
              // <MenuItem onClick={() => {}}>
              //   <ListItemIcon>
              //     <DriveFileRenameOutlineIcon />
              //   </ListItemIcon>
              //   <ListItemText>Rename</ListItemText>
              // </MenuItem>
              //<Divider />
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirmDialog(true);
                }}
              >
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            
          )}
        </Menu>
      </Box>
    </Box>
  );
}

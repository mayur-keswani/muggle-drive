import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import FolderIcon from "@mui/icons-material/Folder";
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
import { deleteFolderAPI, recoverFolderAPI, starredFolderAPI, unStarredFolderAPI, updateFolderAPI } from "../../lib/lambdaApi";
import { FoldersContent } from "../../context/FolderContext";
import { BIN } from "../../context/constants";
import { NotificationContent } from "../../context/NotificationContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateFolder from "../modals/createFolder/CreateFolder";
import Card from "@mui/material/Card";
import StarsIcon from "@mui/icons-material/Stars";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import CircularProgress from "@mui/material/CircularProgress";
import ShareResource from "../modals/shareResource/ShareResource";

type FolderType = {
  data: FolderStructureType;
  sectionType:SectionType;
  width: string;
  height: string;
};
export default function Folder({ data,sectionType, width, height }: FolderType) {
  const {removeFolder,recoverFolder,updateFolder}=useContext(FoldersContent)
  const {updateNotification} =useContext(NotificationContent)

  const [showOptions, setShowOptions] = useState<null | HTMLElement>(null);
  const [showRenameFolderModal,setShowRenameFolderModal] = useState(false)
  const [showDeleteConfirmDialog,setShowDeleteConfirmDialog] = useState(false)
  const [showShareResourceDialog,setShowShareResourceDialog] = useState(false)
  const [isStarringFolder, setIsStarringFolder] = useState(false);

  const navigate =useNavigate();

  const onDelete=async(id:string)=>{
    try{
      const response=await deleteFolderAPI(id);
      setShowDeleteConfirmDialog(false);
      removeFolder(id,sectionType === BIN);
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
  
  const onStarred = async (id: string) => {
    try {
      setIsStarringFolder(true);
      const response = await starredFolderAPI(id);
      setIsStarringFolder(false);
      updateFolder(id,{isStarred:true});
      updateNotification({ type: "success", message: "Folder Starred!" });
    } catch (error) {
      setIsStarringFolder(false);
      updateNotification({ type: "error", message: "Failed to Star!" });
    }
  };

  const onUnStarred = async (id: string) => {
    try {
      setIsStarringFolder(true);
      const response = await unStarredFolderAPI(id);
      setIsStarringFolder(false);
      updateFolder(id, { isStarred: false });

      updateNotification({ type: "success", message: "Folder removed successfully from starred-list!" });
    } catch (error) {
      setIsStarringFolder(false);
      updateNotification({ type: "error", message: "Failed to remove folder from starred!" });
    }
  };



  return (
    <Card
      sx={{
        width,
        height,
        // backgroundColor: "#e8f0fe",
        // color: "#185abc",
        // border: "1px solid lighgray",
        "&:hover": {
          color: "#185abc !important",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "1em",
        cursor: "pointer",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
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
      <CreateFolder
        editFolderId={data.id}
        isOpen={showRenameFolderModal}
        parentRef={data.id}
        closeModal={() => {
          setShowRenameFolderModal(false);
        }}
      />

      <ShareResource
        id={data?.id}
        type='folder'
        isOpen={showShareResourceDialog}
        closeModal={() => {
          setShowShareResourceDialog(false);
        }}
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
        {data?.isStarred && (
          <StarsIcon fontSize="small" style={{ color: "#e89a0f" }} />
        )}
        <FolderIcon style={{ marginRight: "10px" }} fontSize="large" />
        <Typography>{data?.name}</Typography>
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
          {sectionType === "bin" && (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                onRecover(data.id);
              }}
            >
              <ListItemIcon>
                <AutorenewIcon />
              </ListItemIcon>
              <ListItemText>Recover</ListItemText>
            </MenuItem>
          )}
          {sectionType === "bin" && (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirmDialog(true);
              }}
            >
              <ListItemIcon>
                <DeleteForeverIcon />
              </ListItemIcon>
              <ListItemText>Delete Forever</ListItemText>
            </MenuItem>
          )}

          {sectionType !== "bin" && (
            <MenuItem
              disabled={isStarringFolder}
              onClick={(e: any) => {
                e.stopPropagation();
                data.isStarred ? onUnStarred(data?.id) : onStarred(data?.id);
              }}
            >
              <ListItemIcon>
                {isStarringFolder ? (
                  <CircularProgress size={"1.2em"} />
                ) : (
                  <StarIcon />
                )}
              </ListItemIcon>
              <ListItemText>
                {!data.isStarred ? "Starred" : "Remove Starred"}
              </ListItemText>
            </MenuItem>
          )}
          {sectionType !== "bin" && (
            <MenuItem
              onClick={(e: any) => {
                e.stopPropagation();
                setShowRenameFolderModal(true);
              }}
            >
              <ListItemIcon>
                <DriveFileRenameOutlineIcon />
              </ListItemIcon>
              <ListItemText>Rename</ListItemText>
            </MenuItem>
          )}
          {sectionType !== "bin" && (
            <MenuItem
              onClick={(e: any) => {
                e.stopPropagation();
                setShowShareResourceDialog(true);
              }}
            >
              <ListItemIcon>
                <ShareIcon />
              </ListItemIcon>
              <ListItemText>Share</ListItemText>
            </MenuItem>
          )}
          {sectionType !== "bin" && (
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
    </Card>
  );
}

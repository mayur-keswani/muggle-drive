import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ImageIcon from "@mui/icons-material/Image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StarsIcon from "@mui/icons-material/Stars";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";

import {
  AssetType,
  FileStructureType,
  SectionType,
} from "../../lib/types.index";
import {
  deleteFileAPI,
  recoverFileAPI,
  starredFileAPI,
  unStarredFileAPI,
} from "../../lib/lambdaApi";
import ConfirmDialog from "../commons/confirm-dialog/ConfirmDialog";
import { NotificationContent } from "../../context/NotificationContext";
import { BIN } from "../../context/constants";
import { FilesContext } from "../../context/FileContext";
import ShareResource from "../modals/shareResource/ShareResource";

type AssetComponentType = {
  details: FileStructureType;
  sectionType: SectionType;
};

const Asset: React.FC<AssetComponentType> = ({
  details: file,
  sectionType,
}) => {
  const [showOptions, setShowOptions] = useState<null | HTMLElement>(null);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [isStarringFile, setIsStarringFile] = useState(false);
  const [showShareResourceDialog, setShowShareResourceDialog] = useState(false);


  const { updateNotification } = useContext(NotificationContent);
  const { removeFile, recoverFile, updateFile } = useContext(FilesContext);


  const onDelete = async (id: string,name:string) => {
    try {
      await deleteFileAPI(id,name);
      setShowDeleteConfirmDialog(false);
      removeFile(id, sectionType === BIN);
      updateNotification({
        type: "success",
        message: "File Deleted Successfully!",
      });
    } catch (error) {
      console.log(error);
      updateNotification({
        type: "error",
        message: "Failed to Delete File!",
      });
    }
  };

  const onRecover = async (id: string) => {
    try {
      const response = await recoverFileAPI(id);
      recoverFile(id);
      updateNotification({ type: "success", message: "Folder Recovered!" });
    } catch (error) {
      console.log(error);
      updateNotification({ type: "error", message: "Failed to Recover!" });
    }
  };

  const onStarred = async (id: string) => {
    try {
      setIsStarringFile(true)
      const response = await starredFileAPI(id);
      setIsStarringFile(false);
      updateFile(id, { isStarred: true });
      updateNotification({ type: "success", message: "File Starred!" });
    } catch (error) {
      setIsStarringFile(false);
      updateNotification({ type: "error", message: "Failed to Star!" });
    }
  };

  const onUnStarred = async (id: string) => {
    try {
      setIsStarringFile(true);
      const response = await unStarredFileAPI(id);
      setIsStarringFile(false);
      updateFile(id, { isStarred: false });

      updateNotification({
        type: "success",
        message: "File removed successfully from starred-list!",
      });
    } catch (error) {
      setIsStarringFile(false);
      updateNotification({
        type: "error",
        message: "Failed to remove file from starred!",
      });
    }
  };

  const icon =
    file.type === AssetType.PDF ? <PictureAsPdfOutlinedIcon /> : <ImageIcon />;

  return (
    <Card sx={{ width: "250px", height: "180px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={file.url}
          alt={file.name}
          sx={{ objectFit: "contain", width: "100%" }}
        />
        <ConfirmDialog
          handleClose={(e) => {
            e.stopPropagation();
            setShowDeleteConfirmDialog(false);
          }}
          isOpen={showDeleteConfirmDialog}
          handleSubmit={(e: any) => {
            e.stopPropagation();
            onDelete(file.id, file.name);
          }}
          title={`Delete folder ${file.name}`}
        />
        <ShareResource
          id={file?.id}
          type="folder"
          isOpen={showShareResourceDialog}
          closeModal={() => {
            setShowShareResourceDialog(false);
          }}
        />

        <CardContent className="d-flex align-items-center p-0 m-0">
          <Typography gutterBottom component="div" noWrap>
            {file?.isStarred && (
              <StarsIcon fontSize="small" style={{ color: "#e89a0f" }} />
            )}
            {icon}
            {file.name}
          </Typography>
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
          </Box>
          <Menu
            anchorEl={showOptions}
            open={!!showOptions}
            onClose={(e: any) => {
              e.stopPropagation();
              setShowOptions(null);
            }}
          >
            {sectionType !== "bin" && (
              <MenuItem
                // onClick={(e) => {
                //   Navigate(`/${file.url}`);
                // }}
                href={file.url}
                target="_blank"
                component="a"
              >
                <ListItemIcon>
                  <DownloadIcon />
                </ListItemIcon>
                <ListItemText>Download</ListItemText>
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
            {sectionType === "bin" && (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onRecover(file.id);
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
                onClick={(e: any) => {
                  e.stopPropagation();
                  file.isStarred ? onUnStarred(file?.id) : onStarred(file?.id);
                }}
                disabled={isStarringFile}
              >
                <ListItemIcon>
                  {isStarringFile ? (
                    <CircularProgress size={"1.2em"} />
                  ) : (
                    <StarIcon />
                  )}
                </ListItemIcon>
                <ListItemText>
                  {!file.isStarred ? "Starred" : "Remove Starred"}
                </ListItemText>
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
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default Asset;

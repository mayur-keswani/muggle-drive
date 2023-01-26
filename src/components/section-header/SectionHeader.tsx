import { Box, Button, Typography } from "@mui/material";
import React,{useState} from "react";
import CreateFolder from "../modals/createFolder/CreateFolder";
import UploadAssets from "../modals/uploadAssets/UploadAssets";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

type SectionHeaderPropType={
    title:string,
    allowUploading:boolean
}
const SectionHeader:React.FC<SectionHeaderPropType> = (props) => {

  const [showUploadingOptions, setShowUploadingOption] =
    useState<null | HTMLElement>(null);
  const [showCreateFolderModal, setShowCreateForderModal] =
    React.useState(false);
  const [showUploadAssetsModal, setShowUploadAssetsModal] = useState(false);
  return (
    <Box sx={{margin:'1rem'}}>
      <CreateFolder
        isOpen={showCreateFolderModal}
        closeModal={() => {
          setShowCreateForderModal(false);
        }}
      />
      <UploadAssets
        isOpen={showUploadAssetsModal}
        closeModal={() => {
          setShowUploadAssetsModal(false);
        }}
      />

      <Typography
        variant="h5"
        sx={{ margin: "1em 0em" }}
        color={"text.secondary"}
      >
        {props.title}
      </Typography>
      {props.allowUploading && (
        <Button
          variant="outlined"
          size="large"
          startIcon={<AddOutlinedIcon color="primary" />}
          sx={{
            borderRedius: "40px",
            color: "#252525",
            // margin: "1rem",
            backgroundColor: "#f1f3f4",
          }}
          onClick={(e: any) => {
            setShowUploadingOption(e.target);
          }}
        >
          New
        </Button>
      )}

      <Menu
        anchorEl={showUploadingOptions}
        open={!!showUploadingOptions}
        onClose={() => {
          setShowUploadingOption(null);
        }}
      >
        <MenuItem
          onClick={() => {
            setShowCreateForderModal(true);
          }}
        >
          <ListItemIcon>
            <CreateNewFolderIcon />
          </ListItemIcon>
          <ListItemText>New Folder</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            setShowUploadAssetsModal(true);
          }}
        >
          <ListItemIcon>
            <UploadFileIcon />
          </ListItemIcon>
          <ListItemText>File Upload</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DriveFolderUploadIcon />
          </ListItemIcon>
          <ListItemText>Folder Upload</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SectionHeader;

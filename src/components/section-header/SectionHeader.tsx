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
import { SectionType } from "../../lib/types.index";
import CustBreadcrumbs from "../commons/breadcrumbs/Breadcrumbs";

type SectionHeaderPropType={
    sectionType:SectionType,
    title:string,
    allowUploading:boolean,
    folderId:string|undefined
}
const SectionHeader:React.FC<SectionHeaderPropType> = (props) => {

  const [showUploadingOptions, setShowUploadingOption] =
    useState<null | HTMLElement>(null);
  const [showCreateFolderModal, setShowCreateForderModal] =
    React.useState(false);
  const [showUploadAssetsModal, setShowUploadAssetsModal] = useState(false);
  return (
    <Box sx={{ margin: "1rem" }}>
      <CreateFolder
        parentRef={props.folderId ?? "0"}
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
        parentRef={props.folderId ?? "0"}
      />

      {!props.folderId && (
        <Typography variant="h5" color={"text.secondary"}>
          {props.title}
        </Typography>
      )}
      <CustBreadcrumbs
        folderId={props.folderId}
        sectionType={props.sectionType}
      />
      <Divider variant="fullWidth" sx={{ opacity: "0.7" }} />

      {props.allowUploading && (
        <Button
          variant="outlined"
          size="large"
          startIcon={<AddOutlinedIcon color="primary" />}
          sx={{
            borderRedius: "40px",
            margin: "1em 0em",
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

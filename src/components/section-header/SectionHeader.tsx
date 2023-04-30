import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
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
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { nanoid } from "nanoid";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  webkitdirectory?: string;
  directory?: string;
};

type SectionHeaderPropType = {
  sectionType: SectionType;
  title: string;
  allowUploading: boolean;
  folderId: string | undefined;
};

const SectionHeader: React.FC<SectionHeaderPropType> = (props) => {
  const [showUploadingOptions, setShowUploadingOption] =
    useState<null | HTMLElement>(null);
  const [showCreateFolderModal, setShowCreateForderModal] =
    React.useState(false);
  const [showUploadAssetsModal, setShowUploadAssetsModal] = useState(false);
  const [uploadedFolderFiles, setUploadFolderFiles] = useState<any[]>([]);
  const { settings } = useContext(SettingsContext);

  const handleFolderUpload = (e: any) => {
    let acceptedFiles:any[] = e.target.files;
    acceptedFiles=Object.values(acceptedFiles).map((file: any) => ({
      id: nanoid(),
      name: file.name,
      type: file.type,
      size: file.size,
      blob: file,
    }));
    setUploadFolderFiles(acceptedFiles);
    setShowUploadAssetsModal(true);
  };
  const inputProps: InputProps = {
    type: "file",
    id: "file-upload",
    name: "file-upload[]",
    multiple: true,
    webkitdirectory: "",
    directory: "",
    hidden: true,
  };

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
        uploadedFolderFiles={uploadedFolderFiles}
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
          <ListItemText>
            <Button
              variant="text"
              component="label"
              sx={{
                margin: "0",
                textTransform: "none",
                color: `${
                  settings.mode === "light"
                    ? "rgba(76, 78, 100, 0.87)"
                    : "rgba(234, 234, 255, 0.87)"
                }`,
                padding: "0",
                "&:hover": `${
                  settings.mode === "light"
                    ? "rgba(76, 78, 100, 0.87)"
                    : "rgba(234, 234, 255, 0.87)"
                }`,
              }}
            >
              <input onChange={handleFolderUpload} {...inputProps} />
              Folder Upload
            </Button>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SectionHeader;

import React, { useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Folder from "../../folders/Folder";
import Asset from "../../Assets/Asset";

const Computers = () => {
  const [showUploadingOptions, setShowUploadingOption] =
    useState<null | HTMLElement>(null);
  const [showCreateFolderModal, setShowCreateForderModal] =
    React.useState(false);
  const [showUploadAssetsModal, setShowUploadAssetsModal] = useState(false);

  const assets = [
    { type: "pdf", name: "demo" },
    { type: "pdf", name: "demo 2" },
  ];
  const folders = ["first", "second"];

  return (
    <>
      <Typography
        variant="h5"
        sx={{ margin: "1em 0em" }}
        color={"text.secondary"}
      >
        Computers
      </Typography>
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
      <Box sx={{ padding: "0px 1em" }}>
        <Typography sx={{ margin: "1em 0em" }} color={"text.secondary"}>
          Recents
        </Typography>

        <Grid container spacing={1}>
          {assets.map((asset) => (
            <Grid xs={12} md={3} xl={3}>
              <Asset type="pdf" details={asset} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ padding: "0px 1em" }}>
        <Typography sx={{ margin: "1em 0em" }} color={"text.secondary"}>
          Folders
        </Typography>

        <Grid container spacing={1}>
          {folders.map((data: string) => (
            <Grid xs={12} md={3} xl={3}>
              <Folder width="250px" height="50px" name={data}></Folder>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Computers;

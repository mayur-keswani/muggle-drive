import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MenuDrawer from "../../components/menu-drawer";
import "./Drive.css";
import Folder from "../../components/folders/Folder";
import Asset from "../../components/Assets/Asset";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useParams } from "react-router-dom";
import CreateFolder from "../../components/modals/createFolder/CreateFolder";
import UploadAssets from "../../components/modals/uploadAssets/UploadAssets";

const Drive = () => {
  const {path} = useParams()
  const [showUploadingOptions,setShowUploadingOption] = useState<null | HTMLElement>(null)
  const [heading,setHeader] = useState<string>('My Drive');
  const [showCreateFolderModal, setShowCreateForderModal] = React.useState(false);
  const [showUploadAssetsModal,setShowUploadAssetsModal] = useState(false)
 

  useEffect(() => {
    if (path) {
      if (path === "my-drive") {
        setHeader("My Drive");
      } else if (path === "starred") {
        setHeader("Starred");
      } else if (path === "bin") {
        setHeader("Bin");
      } else if (path === "recent") {
        setHeader("Recent");
      } else if (path === "computers") {
        setHeader("Computers");
      } else if (path === "shared") {
        setHeader("Sharred");
      }
    }
  }, [path]);
  const assets = [
    { type: "pdf", name: "demo" },
    { type: "pdf", name: "demo 2" },
  ];
  const folders = ["first", "second"];
  return (
    <Grid container>
      <CreateFolder isOpen={showCreateFolderModal} closeModal={()=>{setShowCreateForderModal(false)}}/>
      <UploadAssets isOpen={showUploadAssetsModal} closeModal={()=>{setShowUploadAssetsModal(false)}}/>
      <Grid md={2} className="d-flex align-items-center sideMenu">
        <MenuDrawer />
      </Grid>
      <Grid xs={12} md={10}>
        <>
          <Typography
            variant="h5"
            sx={{ margin: "1em 0em" }}
            color={"text.secondary"}
          >
            {heading}
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
            <MenuItem onClick={()=>{ setShowCreateForderModal(true)}}>
              <ListItemIcon>
                <CreateNewFolderIcon />
              </ListItemIcon>
              <ListItemText>New Folder</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={()=>{
              setShowUploadAssetsModal(true);
            }}>
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
      </Grid>
    </Grid>
  );
};

export default Drive;

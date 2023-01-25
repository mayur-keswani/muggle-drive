import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MenuDrawer from "../../components/menu-drawer";
import "./Drive.css";
import { Outlet } from "react-router-dom";
import CreateFolder from "../../components/modals/createFolder/CreateFolder";
import UploadAssets from "../../components/modals/uploadAssets/UploadAssets";

const Drive = () => {
  const [showCreateFolderModal, setShowCreateForderModal] = React.useState(false);
  const [showUploadAssetsModal,setShowUploadAssetsModal] = useState(false)
 

  return (
    <Grid container>
      <CreateFolder isOpen={showCreateFolderModal} closeModal={()=>{setShowCreateForderModal(false)}}/>
      <UploadAssets isOpen={showUploadAssetsModal} closeModal={()=>{setShowUploadAssetsModal(false)}}/>
      <Grid md={2} className="d-flex align-items-center sideMenu">
        <MenuDrawer />
      </Grid>
      <Grid xs={12} md={10}>
        <Outlet/>
      </Grid>
    </Grid>
  );
};

export default Drive;

import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MenuDrawer from "../../components/menu-drawer";
import "./Drive.css";
import { Outlet } from "react-router-dom";
import { FoldersContent } from "../../context/FolderContext";
import { fetchFiles, fetchFolders } from "../../lib/lambdaApi";
import { NotificationContent } from "../../context/NotificationContext";
import { FilesContext } from "../../context/FileContext";

const Drive = () => {
  const { updateLoaderState:updateFolderLoaderState, setInitialFolderList } =
    useContext(FoldersContent);
  const { updateLoaderState: updateFileLoaderState, setInitialFilesList } =
    useContext(FilesContext);
  const { updateNotification } = useContext(NotificationContent);

  const loadFolders = async () => {
    try {
      updateFolderLoaderState(true);
      const response: any = await fetchFolders();
      updateFolderLoaderState(false);
      setInitialFolderList(response.data.body.folders.Items);
      // setSharedToMeFoldersList(response.data.body.sharedToMe.Items);
    } catch (error: any) {
      updateFolderLoaderState(false);
      updateNotification({
        type: "error",
        message: error?.response?.error,
      });
    }
  };
  
  const loadFiles = async () => {
    try {
      updateFileLoaderState(true);
      const response: any = await fetchFiles();
      updateFileLoaderState(false);
      setInitialFilesList(response.data.body.Items);
    } catch (error: any) {
      updateFileLoaderState(false);
      updateNotification({
        type: "error",
        message: error?.response?.error,
      });
    }
  };

  useEffect(() => {
    loadFolders();
    loadFiles();
  }, []);

  return (
    <Grid container>
      <Grid md={2} className="d-flex align-items-center sideMenu">
        <MenuDrawer />
      </Grid>
      <Grid xs={12} md={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Drive;

import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MenuDrawer from "../../components/menu-drawer";
import "./Drive.css";
import { Outlet, useParams } from "react-router-dom";
import { FoldersContent } from "../../context/FolderContext";
import {
  fetchFiles,
  fetchFoldersAPI,
  fetchSharedToMeFoldersAPI,
  fetchSharedToMeFilesAPI,
} from "../../lib/lambdaApi";
import { NotificationContent } from "../../context/NotificationContext";
import { FilesContext } from "../../context/FileContext";
import { SHARED } from "../../context/constants";
import { FolderStructureType } from "../../lib/types.index";

const Drive = () => {
  const {
    updateLoaderState: updateFolderLoaderState,
    setInitialFolderList,
    setSharedToMeFoldersList,
  } = useContext(FoldersContent);
  const {
    updateLoaderState: updateFileLoaderState,
    setInitialFilesList,
    setSharedToMeFilesList,
  } = useContext(FilesContext);
  const { updateNotification } = useContext(NotificationContent);
  const { sectionType, folderId } = useParams();

  const loadFolders = async () => {
    try {
      updateFolderLoaderState(true);
      const response: any = await fetchFoldersAPI();
      setInitialFolderList(response.data.body.folders.Items);
      updateFolderLoaderState(false);

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
      setInitialFilesList(response.data.body.files.Items);
    } catch (error: any) {
      updateFileLoaderState(false);
      updateNotification({
        type: "error",
        message: error?.response?.error,
      });
    }
  };

  const loadSharedResource = async (parentRef:string|null=null) => {
    try {
      updateFolderLoaderState(true);
      const resp1: any = await fetchSharedToMeFoldersAPI(parentRef);
      const sharedToMeFolders = resp1.data.body.folders;
      const resp2: any = await fetchSharedToMeFilesAPI(parentRef);
      console.log(resp2.data)
      const sharedToMeFiles = resp2.data.body.files;

      setSharedToMeFoldersList(sharedToMeFolders);
      setSharedToMeFilesList(sharedToMeFiles);
      updateFolderLoaderState(false);
    } catch (error) {
      console.log(error)
      updateFolderLoaderState(false);
      updateNotification({
        type: "error",
        message: "Failed to fetch shared resources",
      });
    }
  };

  useEffect(() => {
    loadFolders();
    loadFiles();
  }, []);

  useEffect(() => {
    if (sectionType === SHARED) {
      if(folderId){
        loadSharedResource(folderId)
      }else{
        loadSharedResource();
      };
    }
  }, [sectionType, folderId]);

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

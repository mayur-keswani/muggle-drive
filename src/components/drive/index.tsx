import React, { useContext, useEffect, useState } from "react";


import { Box,Button, Pagination, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import Folder from "../folders/Folder";
import Asset from "../Assets/Asset";
import { fetchFiles, fetchFolders } from "../../lib/lambdaApi";
import { NotificationContent } from "../../context/NotificationContext";
import { FileStructureType, FolderStructureType, SectionType } from "../../lib/types.index";
import { FoldersContent } from "../../context/FolderContext";
import SectionHeader from "../section-header/SectionHeader";
import { BIN, COMPUTER, MY_DRIVE, RECENT, SHARED, STARRED } from "../../context/constants";
import Skeleton from "@mui/material/Skeleton";
import { useParams } from "react-router-dom";
import EmptyState from "../commons/empty-state/EmptyState";
import Divider from "@mui/material/Divider";
import { FilesContext } from "../../context/FileContext";

type DashBoardSectionPropType={
  showFolders:boolean,
  showFiles:boolean
}
const MyDrive:React.FC<DashBoardSectionPropType> = (props) => {

  const [filteredFolders,setFilteredFolders] = useState<FolderStructureType[]>([]);
  const [filteredFiles,setFilteredFiles] = useState<FileStructureType[]>([])
  const [folderType, setFolderType] = useState<SectionType>(MY_DRIVE);

  const {
    isLoading: isFoldersLoading,
    folders,
    setInitialFolderList,
    sharedToMeFolders,
  } = useContext(FoldersContent);
  const { files,isLoading:isFilesLoading, setInitialFilesList } = useContext(FilesContext);

  const { sectionType, folderId } = useParams();

  
  // const loadFolders = async () => {
  //   try {
  //     setIsFoldersLoading(true);
  //     const response: any = await fetchFolders();
  //     setIsFoldersLoading(false);
  //     setInitialFolderList(response.data.body.folders.Items);
  //     // setSharedToMeFoldersList(response.data.body.sharedToMe.Items);
  //   } catch (error: any) {
  //     setIsFoldersLoading(false);
  //     updateNotification({
  //       type: "error",
  //       message: error?.response?.error,
  //     });
  //   }
  // };
  // const loadFiles = async () => {
  //   try {
  //     setIsFilesLoading(true);
  //     const response: any = await fetchFiles();
  //     setIsFilesLoading(false);
  //     setInitialFilesList(response.data.body.Items);
  //   } catch (error: any) {
  //     setIsFilesLoading(false);
  //     updateNotification({
  //       type: "error",
  //       message: error?.response?.error
  //     });
  //   }
  // };

  const getSectionType=(param:string)=>{
   switch (param) {
     case MY_DRIVE: return MY_DRIVE
     case BIN: return BIN
     case COMPUTER:return COMPUTER
     case STARRED:return STARRED
     case SHARED:return SHARED
     case RECENT:return RECENT
     default: return MY_DRIVE
   } 
  }

  // const getParentDeletedFolder=(deletedfolders:FolderStructureType[])=>{
  //   const RootFolder = deletedfolders.filter(folder=>folder.parentRef === '0');
  //   if (RootFolder.length > 0) {
  //     return RootFolder;
  //   }else{
  //     let foldersWithNoParent = []
  //     deletedfolders.map(delFolder=>{
  //       let parentRef = delFolder.parentRef;
  //       deletedfolders.map(fol=>fol.id === parentRef)
  //     })
  //   }
  // }

  const getFilteredFolder = (
    sectionType: SectionType,
    folderList: FolderStructureType[],
    parentRef: string = "0"
  ) => {
    if (sectionType === MY_DRIVE) {
      return folderList.filter(
        (folder: FolderStructureType) =>
          folder.parentRef === parentRef &&
          !folder.isDeleted 
      );
    }
    if (sectionType === BIN) {
      if (parentRef !== "0") {
        return folderList.filter(
          (folder: FolderStructureType) => folder.parentRef === parentRef
        );
      }
      return folderList.filter(
        (folder: FolderStructureType) => folder.isDeleted
      );
    }
    if (sectionType === STARRED) {
      return folderList.filter(
        (folder: FolderStructureType) =>
          folder.parentRef === parentRef && folder.isStarred
      );
    } 
    if (sectionType === SHARED) {
      return folderList.filter(
        (folder: FolderStructureType) =>
          folder.parentRef === parentRef && !folder.isDeleted
        // !folder.isStarred
      );
    } else {
      return [];
    }
  };

  const getFilteredFiles = (
    sectionType: SectionType,
    filesList: FileStructureType[],
    parentRef: string = "0"
  ) => {
    if (sectionType === MY_DRIVE) {
      return filesList.filter(
        (file: FolderStructureType) =>
          file.parentRef === parentRef && !file.isDeleted
        // !folder.isStarred
      );
    }
    if (sectionType === BIN) {
      if (parentRef !== "0") {
        return filesList.filter(
          (file: FolderStructureType) => file.parentRef === parentRef
        );
      }
      return filesList.filter((file: FolderStructureType) => file.isDeleted);
    }
    if (sectionType === STARRED) {
      return filesList.filter(
        (file: FolderStructureType) =>
          file.parentRef === parentRef && file.isStarred
      );
    }if (sectionType === SHARED) {
      return filesList.filter(
        (file: FolderStructureType) =>
          file.parentRef === parentRef && !file.isDeleted
        // !file.isStarred
      );
    } else {
      return [];
    }
  };
   

  useEffect(() => {
    if(sectionType === BIN || sectionType === MY_DRIVE || sectionType===SHARED || sectionType===STARRED || sectionType === COMPUTER){
      setFolderType(getSectionType(sectionType));
    }
  }, [sectionType]);
  

  useEffect(() => {
    setFilteredFiles(getFilteredFiles(folderType, folderType===SHARED?[]:files, folderId ?? "0"));
    setFilteredFolders(getFilteredFolder(folderType, folderType===SHARED? sharedToMeFolders: folders, folderId ?? "0"));
  }, [folderId, folderType, folders, files]);

  return (
    <>
      <SectionHeader
        sectionType={MY_DRIVE}
        allowUploading={folderType === MY_DRIVE}
        title={folderType}
        folderId={folderId}
      />

      {props.showFiles && (
        <Box sx={{ padding: "0px 1em" }}>
          <Typography sx={{ margin: "1em 0em" }} color={"text.secondary"}>
            Files
          </Typography>

          {isFilesLoading ? (
            <Grid container spacing={1}>
              <Grid xs={12} md={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" height={50} />
              </Grid>
              <Grid xs={12} md={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" height={50} />
              </Grid>
              <Grid xs={12} md={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" height={50} />
              </Grid>
              <Grid xs={12} md={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" height={50} />
              </Grid>
            </Grid>
          ) : filteredFiles.length > 0 ? (
            <Grid container spacing={1}>
              {filteredFiles.map((file: FileStructureType) => (
                <Grid xs={12} sm={5} md={3} xl={3} key={file.id}>
                  <Asset details={file} sectionType={folderType} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState message="No Files Found!" />
          )}
        </Box>
      )}

      {props.showFolders && (
        <Box sx={{ padding: "0px 1em", margin: "2.5em 0" }}>
          <Typography sx={{ margin: "1em 0em" }} color={"text.secondary"}>
            Folders
          </Typography>
          {isFoldersLoading ? (
            <Grid container spacing={1}>
              <Grid xs={12} md={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" height={50} />
              </Grid>
              <Grid xs={12} md={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" height={50} />
              </Grid>
              <Grid xs={12} md={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" height={50} />
              </Grid>
              <Grid xs={12} md={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" height={50} />
              </Grid>
            </Grid>
          ) : filteredFolders.length > 0 ? (
            <Grid container spacing={1}>
              {filteredFolders.map((data: FolderStructureType) => (
                <Grid xs={12} sm={5} md={3} xl={3} key={data.id}>
                  <Folder
                    width="250px"
                    height="50px"
                    sectionType={folderType}
                    data={data}
                  ></Folder>
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState message="No Folders Found!" />
          )}
        </Box>
      )}
    </>
  );
};

export default MyDrive;

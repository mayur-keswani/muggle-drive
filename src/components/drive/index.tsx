import React, { useContext, useEffect, useState } from "react";


import { Box,Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import Folder from "../folders/Folder";
import Asset from "../Assets/Asset";
import { fetchFolders } from "../../lib/lambdaApi";
import { NotificationContent } from "../../context/NotificationContext";
import { FileStructureType, FolderStructureType, SectionType } from "../../lib/types.index";
import { FoldersContent } from "../../context/FolderContext";
import SectionHeader from "../section-header/SectionHeader";
import { BIN, COMPUTER, MY_DRIVE, RECENT, SHARED, STARRED } from "../../context/constants";
import Skeleton from "@mui/material/Skeleton";
import { useParams } from "react-router-dom";
import EmptyState from "../commons/empty-state/EmptyState";
import Divider from "@mui/material/Divider";
import { FilesContent } from "../../context/FileContext";

type DashBoardSectionPropType={
  showFolders:boolean,
  showFiles:boolean
}
const MyDrive:React.FC<DashBoardSectionPropType> = (props) => {

  const [filteredFolders,setFilteredFolders] = useState<FolderStructureType[]>([]);
  const [filteredFiles,setFilteredFiles] = useState<FileStructureType[]>([])
  const [isFoldersLoading, setIsFoldersLoading] = useState(false);
  const [isFilesLoading,setIsFilesLoading] = useState(false)
  const [folderType, setFolderType] = useState<SectionType>(MY_DRIVE);

  const { updateNotification } = useContext(NotificationContent);
  const {folders,setInitialFolderList} = useContext(FoldersContent);
  const {files} = useContext(FilesContent)

  const { sectionType, folderId } = useParams();

  
  const loadFolders=async(type:SectionType)=>{
    try {
      setIsFoldersLoading(true);
      const response: any = await fetchFolders(type);
      setIsFoldersLoading(false);
      setInitialFolderList(type, response.data.body.Items);
    } catch (error:any) {
      setIsFoldersLoading(false);
      updateNotification({
        type: "error",
        message: error?.response?.data?.message,
      });
    }
  }

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

  useEffect(() => {
    if(sectionType === BIN || sectionType === MY_DRIVE || sectionType===SHARED || sectionType===STARRED || sectionType === COMPUTER){
      setFolderType(getSectionType(sectionType));
      loadFolders(sectionType)
    }
  }, [sectionType]);

  useEffect(() => {
    if (folderId) {
      setFilteredFiles(
        files[folderType].filter(
          (file: FolderStructureType) => file.parentRef === folderId
        )
      );
      setFilteredFolders(
        folders[folderType].filter(
          (folder: FolderStructureType) => folder.parentRef === folderId
        )
      );
    } else {
      setFilteredFiles(
        files[folderType].filter(
          (file: FolderStructureType) => file.parentRef === "0"
        )
      );
      setFilteredFolders(
        folders[folderType].filter(
          (folder: FolderStructureType) => folder.parentRef === "0"
        )
      );
    }
  }, [folderId, folderType, folders[folderType].length]);

  return (
    <>
      <SectionHeader
        sectionType={MY_DRIVE}
        allowUploading={folderType===MY_DRIVE}
        title={folderType}
        parentRef={folderId ?? "0"}
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
              {filteredFiles.map((file:FileStructureType) => (
                <Grid xs={12} md={3} xl={3}>
                  <Asset type="pdf" details={file} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState message="No Files Found!" />
          )}
        </Box>
      )}

      {props.showFolders && (
        <Box sx={{ padding: "0px 1em",margin:'2.5em 0' }}>
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
                <Grid xs={12} md={3} xl={3} key={data.id}>
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

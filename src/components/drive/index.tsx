import React, { useContext, useEffect, useState } from "react";


import { Box,Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import Folder from "../folders/Folder";
import Asset from "../Assets/Asset";
import { fetchFolders } from "../../lib/lambdaApi";
import { NotificationContent } from "../../context/NotificationContext";
import { FolderStructureType, SectionType } from "../../lib/types.index";
import { FoldersContent } from "../../context/FolderContext";
import SectionHeader from "../section-header/SectionHeader";
import { BIN, COMPUTER, MY_DRIVE, RECENT, SHARED, STARRED } from "../../context/constants";
import Skeleton from "@mui/material/Skeleton";
import { useParams } from "react-router-dom";
import EmptyState from "../commons/empty-state/EmptyState";

type DashBoardSectionPropType={
  showFolders:boolean,
  showFiles:boolean
}
const MyDrive:React.FC<DashBoardSectionPropType> = (props) => {

  const [filteredFolders,setFilteredFolders] = useState<FolderStructureType[]>([])
  const { sectionType,folderId } = useParams();
  const { updateNotification } = useContext(NotificationContent);
  const {folders,setInitialFolderList} = useContext(FoldersContent);
  const [isFoldersLoading,setIsFoldersLoading] = useState(false)
  const [folderType,setFolderType] = useState<SectionType>(MY_DRIVE)


    const assets = [
      { type: "pdf", name: "demo" },
      { type: "pdf", name: "demo 2" },
    ];
  
  const loadFolders=async(type:any)=>{
    try {
      setIsFoldersLoading(true);
      const response: any = await fetchFolders(type);
      setIsFoldersLoading(false);
      setInitialFolderList(MY_DRIVE, response.data.body.Items);
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
    if(sectionType){
      setFolderType(getSectionType(sectionType));
      loadFolders(sectionType)
    }
  }, [sectionType]);

  useEffect(()=>{
    if(folderId){
      setFilteredFolders(folders[folderType].filter((folder:FolderStructureType)=>folder.parentRef===folderId));
    }else{
      setFilteredFolders(folders[folderType])
    }
  },[folderId,folders[folderType].length])

  return (
    <>
      <SectionHeader
        sectionType={MY_DRIVE}
        allowUploading={true}
        title={folderType}
        parentRef={folderId ?? "0"}
      />

      {props.showFiles && (
        <Box sx={{ padding: "0px 1em" }}>
          <Typography sx={{ margin: "1em 0em" }} color={"text.secondary"}>
            Files
          </Typography>

          <Grid container spacing={1}>
            {assets.map((asset) => (
              <Grid xs={12} md={3} xl={3}>
                <Asset type="pdf" details={asset} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {props.showFolders && (
        <Box sx={{ padding: "0px 1em" }}>
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
          ) : (
            filteredFolders.length>0?
              <Grid container spacing={1}>
                {filteredFolders.map((data: FolderStructureType) => (
                  <Grid xs={12} md={3} xl={3} key={data.id}>
                    <Folder
                      width="250px"
                      height="50px"
                      sectionType={MY_DRIVE}
                      data={data}
                    ></Folder>
                  </Grid>
                ))}
              </Grid>
            :
            <EmptyState message="No Folders Found!"/>
          )}
        </Box>
      )}
    </>
  );
};

export default MyDrive;

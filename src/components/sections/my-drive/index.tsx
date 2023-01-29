import React, { useContext, useEffect, useState } from "react";


import { Box,Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import Folder from "../../folders/Folder";
import Asset from "../../Assets/Asset";
import { fetchFolders } from "../../../lib/lambdaApi";
import { NotificationContent } from "../../../context/NotificationContext";
import { FolderStructureType } from "../../../lib/types.index";
import { FoldersContent } from "../../../context/FolderContext";
import SectionHeader from "../../section-header/SectionHeader";
import { MY_DRIVE } from "../../../context/constants";
import Skeleton from "@mui/material/Skeleton";

type DashBoardSectionPropType={
  showFolders:boolean,
  showFiles:boolean
}
const MyDrive:React.FC<DashBoardSectionPropType> = (props) => {

  const { updateNotification } = useContext(NotificationContent);
  const {folders,setInitialFolderList} = useContext(FoldersContent);
  const [isFoldersLoading,setIsFoldersLoading] = useState(false)



    const assets = [
      { type: "pdf", name: "demo" },
      { type: "pdf", name: "demo 2" },
    ];
  
  const loadFolders=async()=>{
    try {
      setIsFoldersLoading(true);
      const response:any = await fetchFolders();
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
  useEffect(()=>{
    loadFolders()
  },[])
  console.log(folders[MY_DRIVE]);
  return (
    <>
      <SectionHeader
        sectionType={MY_DRIVE}
        allowUploading={true}
        title={"MyDrive"}
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
                <Skeleton animation="wave"  variant="rectangular" height={50} />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={1}>
              {folders[MY_DRIVE].map((data: FolderStructureType) => (
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
          )}
        </Box>
      )}
    </>
  );
};

export default MyDrive;

import React, { useContext, useEffect, useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import Folder from "../../folders/Folder";
import Asset from "../../Assets/Asset";
import { fetchFolders } from "../../../lib/lambdaApi";
import { NotificationContent } from "../../../context/NotificationContext";
import { FolderStructureType } from "../../../lib/types.index";
import { FoldersContent } from "../../../context/FolderContext";
import SectionHeader from "../../section-header/SectionHeader";
import { STARRED } from "../../../context/constants";


type DashBoardSectionPropType = {
  showFolders: boolean;
  showFiles: boolean;
};
const Starred:React.FC<DashBoardSectionPropType> = (props) => {
  const { updateNotification } = useContext(NotificationContent);
  const { folders, setInitialFolderList } = useContext(FoldersContent);

  const assets = [
    { type: "pdf", name: "demo" },
    { type: "pdf", name: "demo 2" },
  ];

  const loadFolders = async () => {
    try {
      const response: any = await fetchFolders();
      console.log(response.data);
      setInitialFolderList(STARRED, response.data.body.Items);
    } catch (error: any) {
      console.log(error);
      updateNotification({
        type: "error",
        message: error?.response?.data?.message,
      });
    }
  };
  useEffect(() => {
    loadFolders();
  }, []);
  return (
    <>
      <SectionHeader
        sectionType={STARRED}
        allowUploading={false}
        title={"Starred"}
      />

      {props.showFiles &&
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
      </Box>}

      {props.showFolders &&
      <Box sx={{ padding: "0px 1em" }}>
        <Typography sx={{ margin: "1em 0em" }} color={"text.secondary"}>
          Folders
        </Typography>

        <Grid container spacing={1}>
          {folders[STARRED].map((data: FolderStructureType) => (
            <Grid xs={12} md={3} xl={3}>
              <Folder
                width="250px"
                height="50px"
                sectionType={STARRED}
                data={data}
              ></Folder>
            </Grid>
          ))}
        </Grid>
      </Box>}
    </>
  );
};

export default Starred;

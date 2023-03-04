import { Breadcrumbs, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { FoldersContent } from "../../../context/FolderContext";
import { getFolderDetail, getFolderHistory } from "../../../lib/helper";
import { FolderStructureType, SectionType } from "../../../lib/types.index";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";

const CustBreadcrumbs: React.FC<{ folderId: string | undefined,sectionType:SectionType }> = (props) => {
  const [parentList, setParentList] = useState<{name:string,id:string}[]>([]);
  const [currentFolderDetail,setCurrentFolderDetail] = useState<FolderStructureType | null>(null)
  const {folders}= useContext(FoldersContent)

  useEffect(() => {
    if(props.folderId && folders){
        let history = getFolderHistory(folders, props.folderId);
        if(history.length>0){
          history.pop();
        }
        setParentList(history);
        setCurrentFolderDetail(getFolderDetail(folders,props.folderId) ?? null)
    }
  }, [folders,props.folderId]);


  return (
    <Breadcrumbs aria-label="breadcrumb">
      <NavLink
        // underline="hover"
        color="inherit"
        to={`/dashboard/${props.sectionType}`}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
      </NavLink>
      {parentList.map((parent) => (
        <NavLink
          // underline="hover"
          color="inherit"
          to={`/dashboard/${props.sectionType}/folders/${parent.id}`}
          key={parent.id}
        >
          {parent.name}
        </NavLink>
      ))}
      {currentFolderDetail && (
        <Typography color="text.info">
          {currentFolderDetail.name}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default CustBreadcrumbs;

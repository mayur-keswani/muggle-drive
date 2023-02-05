import { Breadcrumbs, Link, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { FoldersContent } from "../../../context/FolderContext";
import { getFolderDetail, getFolderHistory } from "../../../lib/helper";
import { FolderStructureType, SectionType } from "../../../lib/types.index";
import HomeIcon from "@mui/icons-material/Home";

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
    <Breadcrumbs aria-label="breadcrumb" sx={{ margin: "0em 1em" }}>
      <Link
        underline="hover"
        color="inherit"
        href={`/dashboard/${props.sectionType}`}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
      </Link>
      {parentList.map((parent) => (
        <Link
          underline="hover"
          color="inherit"
          href={`/dashboard/${props.sectionType}/folders/${parent.id}`}
          key={parent.id}
        >
          {parent.name}
        </Link>
      ))}
      {currentFolderDetail && (
        <Typography color="text.info" variant="h5">
          {currentFolderDetail.name}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default CustBreadcrumbs;

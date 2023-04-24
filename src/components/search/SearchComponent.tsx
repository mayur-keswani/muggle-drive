import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FoldersContent } from "../../context/FolderContext";
import { FilesContext } from "../../context/FileContext";
import { FileStructureType, FolderStructureType } from "../../lib/types.index";
import Grid from "@mui/material/Unstable_Grid2";
import Asset from "../Assets/Asset";
import { Box, Typography } from "@mui/material";
import Folder from "../folders/Folder";
import { MY_DRIVE } from "../../context/constants";
import LinearProgress from "@mui/material/LinearProgress";
import EmptyState from "../commons/empty-state/EmptyState";

const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(true);
  const { folders } = useContext(FoldersContent);
  const { files } = useContext(FilesContext);
  const [searchValue, setSearchValue] = useState<null | string>(null);
  const [filterFolders, setFilteredFolders] = useState<FolderStructureType[]>(
    []
  );
  const [filterFiles, setFilteredFiles] = useState<FileStructureType[]>([]);

  useEffect(() => {
    if (searchParams && searchParams.get("q")) {
      setSearchValue(searchParams.get("q")!);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchValue) {
      setLoader(true);
      getFilteredList(searchValue);
    }
  }, [searchValue, folders, files]);

  function getFilteredList(value: string) {
    setTimeout(() => {
      setFilteredFolders(
        folders.filter((folder) => !!folder?.name.includes(value))
      );
      setFilteredFiles(files.filter((file) => !!file?.name.includes(value)));
    }, 1000);
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }

  return (
    <div>
      {loader ? (
        <Box sx={{ width: "100%", padding: "1em" }}>
          <LinearProgress />
        </Box>
      ) : (
        filterFiles.length === 0 &&
        filterFolders.length === 0 && (
          <EmptyState message="No Files/Folders Found!" />
        )
      )}

      {filterFiles.length > 0 && (
        <Box sx={{ padding: "0px 1em" }}>
          <Typography sx={{ margin: "1em 0em" }} color={"text.secondary"}>
            Files
          </Typography>
          <Grid container spacing={1}>
            {filterFiles.map((file: FileStructureType) => (
              <Grid xs={12} sm={5} md={3} xl={3} key={file.id}>
                <Asset details={file} sectionType={MY_DRIVE} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {filterFolders.length > 0 && (
        <Box sx={{ padding: "0px 1em" }}>
          <Typography sx={{ margin: "1em 0em" }} color={"text.secondary"}>
            Folders
          </Typography>
          <Grid container spacing={1}>
            {filterFolders.map((folder: FolderStructureType) => (
              <Grid xs={12} sm={5} md={3} xl={3} key={folder.id}>
                <Folder
                  width="250px"
                  height="50px"
                  sectionType={MY_DRIVE}
                  data={folder}
                ></Folder>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default SearchComponent;

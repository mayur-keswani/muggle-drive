import React, { useState } from "react";
import { FolderStructureType, SectionType } from "../lib/types.index";
import { BIN, MY_DRIVE } from "./constants";

export const FoldersContent = React.createContext<{
  folders: FolderStructureType[];
  setInitialFolderList: (
    payload: FolderStructureType[]
  ) => void;
  addFolder: (payload: FolderStructureType) => void;
  removeFolder: (id: string) => void;
  recoverFolder: (id: string) => void;
  updateFolder: (payload: FolderStructureType) => void;
}>({
  folders: [],
  setInitialFolderList: () => {},
  addFolder: () => {},
  removeFolder: () => {},
  recoverFolder: () => {},
  updateFolder: () => {},
});

const FoldersProvider = (props: any) => {
  const [folders, setFolders] = useState<FolderStructureType[]>([]);
 
  const setInitialFolderList=(payload:FolderStructureType[])=>{
    setFolders(payload);
  }


  const addFolder = (payload: FolderStructureType) => {
    let upldatedList = folders.concat(payload)

    setFolders(upldatedList);
  };


  const removeFolder = (id:string) => {
    let updatedList = folders.map(
      (folder: FolderStructureType) => ((folder.id === id)?{...folder,isDeleted:true}:folder)
    );
    setFolders([...updatedList]);
  };



  const recoverFolder = (id: string) => {
      let updatedList = folders.map((folder: FolderStructureType) =>
        folder.id === id ? { ...folder, isDeleted: false } : folder
      );

      setFolders([...updatedList]);
  };



  const updateFolder = (payload: FolderStructureType) => {
    let updatedList = folders.map((folder: FolderStructureType) =>
      folder.id === payload.id ? { ...folder, ...payload } : folder
    );
    setFolders(updatedList);
  };

  return (
    <FoldersContent.Provider
      value={{
        folders,
        setInitialFolderList,
        addFolder,
        removeFolder,
        recoverFolder,
        updateFolder,
      }}
    >
      {props.children}
    </FoldersContent.Provider>
  );
};

export default FoldersProvider;

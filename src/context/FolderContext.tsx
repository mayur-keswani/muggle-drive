import React, { useState } from "react";
import { FolderStructureType } from "../lib/types.index";

export const FoldersContent = React.createContext<
  {
    folders: FolderStructureType[];
    addFolder: (payload: FolderStructureType) => void;
    removeFolder: (id: string) => void;
    updateFolder: (payload: FolderStructureType) => void;
  }
>
    
  ({
    folders: [],
    addFolder: () => {},
    removeFolder: (id: string) => {},
    updateFolder: (payload: FolderStructureType) => {},
});

const FoldersProvider = (props: any) => {
  const [folders, setFolders] = useState<FolderStructureType[]>([]);
 
  const addFolder = (payload:FolderStructureType) => {
    setFolders((prevValues)=> prevValues.concat(payload))
  };
  const removeFolder = (id:string) => {
    setFolders((prevValues)=> prevValues.filter((folder:FolderStructureType)=>folder.id !== id))
  };
  const updateFolder = (payload:FolderStructureType) => {
    setFolders((prevValues)=> prevValues.map((folder:FolderStructureType)=>{
      if(folder.id===payload.id) return {...payload}
      else return folder
    }))
  };
  return (
    <FoldersContent.Provider
      value={{
        folders,
        addFolder,
        removeFolder,
        updateFolder,
      }}
    >
      {props.children}
    </FoldersContent.Provider>
  );
};

export default FoldersProvider;

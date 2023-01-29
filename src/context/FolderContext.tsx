import React, { useState } from "react";
import { FolderStructureType, SectionType } from "../lib/types.index";

export const FoldersContent = React.createContext<{
  folders: Record<SectionType, any[]>;
  setInitialFolderList: (
    type: SectionType,
    payload: FolderStructureType[]
  ) => void;
  addFolder: (type: SectionType, payload: FolderStructureType) => void;
  removeFolder: (type: SectionType, id: string) => void;
  updateFolder: (type: SectionType, payload: FolderStructureType) => void;
}>({
  folders: {
    "my-drive": [],
    computers: [],
    shared: [],
    starred: [],
    bin: [],
    recent: [],
  },
  setInitialFolderList: () => {},
  addFolder: () => {},
  removeFolder: () => {},
  updateFolder: () => {},
});

const FoldersProvider = (props: any) => {
  const [folders, setFolders] = useState<
    Record<SectionType, FolderStructureType[]>
  >({ "my-drive": [], "computers": [], "shared": [], "starred": [], "bin": [], "recent":[] });
 
  const setInitialFolderList=(type:SectionType,payload:FolderStructureType[])=>{
    setFolders((prevValues)=>({...prevValues,[type]:payload}))
  }

  const addFolder = (type: SectionType, payload: FolderStructureType) => {
    let upldatedList = folders[type].concat(payload)

    setFolders((prevValues) => ({ ...prevValues, [type]: upldatedList }));
  };
  const removeFolder = (type:SectionType,id:string) => {
    let existingList = folders[type];
    let updatedList = existingList.filter((folder: FolderStructureType) => folder.id !== id)
    
    setFolders((prevValues) => ({
      ...prevValues,
      type: updatedList,
    }));
  };

  const updateFolder = (type: SectionType, payload: FolderStructureType) => {
    let existingList = folders[type];

    let updatedList=existingList.map((folder: FolderStructureType) => {
        if (folder.id === payload.id) return { ...payload };
        else return folder;
    });

    setFolders((prevValues) => ({
      ...prevValues,
      [type]: updatedList,
    }));
    
  };
  return (
    <FoldersContent.Provider
      value={{
        folders,
        setInitialFolderList,
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

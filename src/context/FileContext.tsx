import React, { useState } from "react";
import { FileStructureType, SectionType } from "../lib/types.index";

export const FilesContext = React.createContext<{
  isLoading: Boolean;
  updateLoaderState: (value: Boolean) => void;
  files: FileStructureType[];
  setInitialFilesList: (payload: FileStructureType[]) => void;
  addFile: (payload: FileStructureType) => void;
  removeFile: (id: string, removePermanent: boolean) => void;
  updateFile: (id: string, payload: any) => void;
  recoverFile: (id: string) => void;
}>({
  isLoading:false,
  updateLoaderState:()=>{},
  files: [],
  setInitialFilesList: () => {},
  addFile: () => {},
  removeFile: () => {},
  updateFile: () => {},
  recoverFile: () => {},
});

const FilesProvider = (props: any) => {
  const [isLoading,setIsLoading] = useState<Boolean>(false)
  const [files, setFiles] = useState<FileStructureType[]>([]);


  const updateLoaderState = (value: Boolean) => {
    setIsLoading(value);
  };
  const setInitialFilesList = (payload: FileStructureType[]) => {
    setFiles(payload);
  };

  const addFile = (payload: FileStructureType) => {
    let upldatedList = files.concat(payload);

    setFiles(upldatedList);
  };

  const removeFile = (id: string, removePermanent: boolean) => {
    let updatedList;
    if (removePermanent) {
      updatedList = files.filter((file: FileStructureType) => file.id !== id);
    } else {
      updatedList = files.map((file: FileStructureType) =>
        file.id === id ? { ...file, isDeleted: true } : file
      );
    }

    setFiles([...updatedList]);
  };

  const updateFile = (id: string, payload: any) => {
    let updatedList = files.map((file: FileStructureType) =>
      file.id === id ? { ...file, ...payload } : file
    );
    setFiles(updatedList);
  };

  const recoverFile = (id: string) => {
    let updatedList = files.map((file: FileStructureType) =>
      file.id === id ? { ...file, isDeleted: false } : file
    );

    setFiles([...updatedList]);
  };

  return (
    <FilesContext.Provider
      value={{
        isLoading,
        updateLoaderState,
        files,
        setInitialFilesList,
        addFile,
        removeFile,
        updateFile,
        recoverFile,
      }}
    >
      {props.children}
    </FilesContext.Provider>
  );
};

export default FilesProvider;

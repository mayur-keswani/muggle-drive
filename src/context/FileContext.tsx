import React, { useState } from "react";
import { FileStructureType, SectionType } from "../lib/types.index";

export const FilesContext = React.createContext<{
  files: FileStructureType[];
  setInitialFilesList: (payload: FileStructureType[]) => void;
  addFile: (payload: FileStructureType) => void;
  removeFile: (id: string, removePermanent: boolean) => void;
  updateFiles: (payload: FileStructureType) => void;
}>({
  files: [],
  setInitialFilesList: () => {},
  addFile: () => {},
  removeFile: () => {},
  updateFiles: () => {},
});

const FilesProvider = (props: any) => {
  const [files, setFiles] = useState<FileStructureType[]>([]);

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
        updatedList = files.filter(
          (file: FileStructureType) => file.id !== id
        );
      } else {
        updatedList = files.map((file: FileStructureType) =>
          file.id === id ? { ...file, isDeleted: true } : file
        );
      }

      setFiles([...updatedList]);
    };


  const updateFiles = (payload: FileStructureType) => {
    let updatedList = files.map((file: FileStructureType) =>
      file.id === payload.id ? { ...file, ...payload } : file
    );
    setFiles(updatedList);
  };
  return (
    <FilesContext.Provider
      value={{
        files,
        setInitialFilesList,
        addFile,
        removeFile,
        updateFiles,
      }}
    >
      {props.children}
    </FilesContext.Provider>
  );
};

export default FilesProvider;

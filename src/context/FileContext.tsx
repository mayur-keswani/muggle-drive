import React, { useState } from "react";
import { FileStructureType, SectionType } from "../lib/types.index";

export const FilesContent = React.createContext<{
  files:FileStructureType[];
  addFiles: (payload: FileStructureType) => void;
  removeFiles: (id: string) => void;
  updateFiles: (payload: FileStructureType) => void;
}>({
  files: [],
  addFiles: () => {},
  removeFiles: () => {},
  updateFiles: () => {},
});

const FilesProvider = (props: any) => {
  const [files, setFiles] = useState<FileStructureType[]>([]);

  const addFiles = (payload: FileStructureType) => {
    let upldatedList = files.concat(payload);
    setFiles(upldatedList);
  };


  const removeFiles = (id: string) => {
     let updatedList = files.map((file: FileStructureType) =>
       file.id === id ? { ...file, isDeleted: true } : file
     );
     setFiles([...updatedList]);
  };


  const updateFiles = (payload: FileStructureType) => {
    let updatedList = files.map((file: FileStructureType) =>
      file.id === payload.id ? { ...file, ...payload } : file
    );
    setFiles(updatedList);
  };
  return (
    <FilesContent.Provider
      value={{
        files,
        addFiles,
        removeFiles,
        updateFiles,
      }}
    >
      {props.children}
    </FilesContent.Provider>
  );
};

export default FilesProvider;

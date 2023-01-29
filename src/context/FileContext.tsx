import React, { useState } from "react";
import { FileStructureType, SectionType } from "../lib/types.index";

export const FilesContent = React.createContext<{
  files: Record<SectionType, any[]>;
  addFiles: (type: SectionType, payload: FileStructureType) => void;
  removeFiles: (type: SectionType, id: string) => void;
  updateFiles: (type: SectionType, payload: FileStructureType) => void;
}>({
  files: {
    'my-drive': [],
    'computers': [],
    'shared': [],
    'starred': [],
    'bin': [],
    'recent': [],
  },
  addFiles: () => {},
  removeFiles: () => {},
  updateFiles: () => {},
});

const FilesProvider = (props: any) => {
  const [files, setFiles] = useState<
    Record<SectionType, FileStructureType[]>
  >({
    'my-drive': [],
    'computers': [],
    'shared': [],
    'starred': [],
    'bin': [],
    'recent': [],
  });

  const addFiles = (type: SectionType, payload: FileStructureType) => {
    let upldatedList = files[type].concat(payload);

    setFiles((prevValues) => ({ ...prevValues, [type]: upldatedList }));
  };
  const removeFiles = (type: SectionType, id: string) => {
    let existingList = files[type];
    let updatedList = existingList.filter(
      (Files: FileStructureType) => Files.id !== id
    );

    setFiles((prevValues) => ({
      ...prevValues,
      type: updatedList,
    }));
  };

  const updateFiles = (type: SectionType, payload: FileStructureType) => {
    let existingList = files[type];

    let updatedList = existingList.map((Files: FileStructureType) => {
      if (Files.id === payload.id) return { ...payload };
      else return Files;
    });

    setFiles((prevValues) => ({
      ...prevValues,
      [type]: updatedList,
    }));
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

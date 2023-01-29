import { type } from "os";
import {
  BIN,
  COMPUTER,
  MY_DRIVE,
  SHARED,
  STARRED,
  RECENT,
} from "../context/constants";

export type FolderStructureType = {
  id: string;
  userId: string;

  name: string;
  parentRef: string; // points to the parent folder
  status: 'ACTIVE' | 'STARRED' | 'DELETED'

  creationDate: string;
};
export type FileStructureType = {
  id: string;
  userId: string;

  name: string;
  parentRef: string; // points to the parent folder
  status: "ACTIVE" | "STARRED" | "DELETED";

  fileType: string;
  size: number;
  fileUrl: string;

  creationDate: string;
};

export type SectionType =
  | typeof MY_DRIVE
  | typeof COMPUTER
  | typeof SHARED
  | typeof STARRED
  | typeof BIN
  | typeof RECENT;

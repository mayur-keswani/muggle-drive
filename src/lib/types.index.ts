import { Direction } from "@mui/material/styles";
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

  isDeleted: boolean;
  isShared: boolean;
  isStarred: boolean;

  creationDate: string;
};
export type FileStructureType = {
  id: string;
  userId: string;

  name: string;
  parentRef: string; // points to the parent folder

  isDeleted:boolean;
  isShared:boolean;
  isStarred:boolean;

  type: string;
  size: number;
  url: string;

  creationDate: string;
};

export type SectionType =
  | typeof MY_DRIVE
  | typeof COMPUTER
  | typeof SHARED
  | typeof STARRED
  | typeof BIN
  | typeof RECENT;

export enum AssetType {
  PDF = "application/pdf",
  DOCS = "application/document",
}
  //THEME
export type Skin = "default" | "bordered" | "semi-dark";
export type ThemeColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

export type PaletteMode = "light" | "dark";
export interface Color {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

export type ContentWidth = "full" | "boxed";

export type Settings = {
  skin: Skin;
  mode: PaletteMode;
  themeColor: ThemeColor;
  contentWidth: ContentWidth;
  menuTextTruncate: boolean /* true | false */;
  responsiveFontSizes: boolean /* true | false */;
  disableRipple: boolean /* true | false */;
  direction: Direction;
};
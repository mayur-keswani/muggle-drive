import { FolderStructureType } from "./types.index";

export const getFolderDetail = (folders: FolderStructureType[], id: string):FolderStructureType|undefined => {
    return folders.find(fold=>fold.id === id) 
};

export const getFolderHistory=(folders:FolderStructureType[],id:string,parentList:any[]=[]):{id:string,name:string}[]=>{
    let folderDetail = getFolderDetail(folders, id)!;
    if(folderDetail){
        if (folderDetail.parentRef === "0") {
          parentList.unshift({id:folderDetail.id,name:folderDetail.name});
          return parentList;
        } else {
          parentList.unshift({id:folderDetail.id,name:folderDetail.name});
          return getFolderHistory(folders, folderDetail.parentRef, parentList);
        }
    }else{
        return []
    }
    
}

/**
 ** Hex color to RGBA color
 */
export const hexToRGBA = (hexCode: string, opacity: number) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
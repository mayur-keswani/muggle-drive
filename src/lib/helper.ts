import { FolderStructureType } from "./types.index";

export const getFolderDetail = (folders: FolderStructureType[], id: string) => {
    return folders.find(fold=>fold.id === id) 
};

export const getFolderHistory=(folders:FolderStructureType[],id:string,parentList:any[]=[]):{id:string,name:string}[]=>{
    let folderDetail = getFolderDetail(folders, id)!;
    if(folderDetail){
        if (folderDetail.parentRef === "0") {
          parentList.unshift({id:folderDetail.id,name:folderDetail.name});
          return parentList;
        } else {
          parentList.unshift(folderDetail.name);
          return getFolderHistory(folders, folderDetail.parentRef, parentList);
        }
    }else{
        return []
    }
    
}
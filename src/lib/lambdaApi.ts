import axios from "axios"
import config from "./config"
import { FolderStructureType } from "./types.index";

export const fetchFolders=async()=>{
    return await axios.get(config.apiEndpoint+'/folders')
}

export const createFolder = async (payload:{name:string,parentRef:string}) => {
  return await axios.post(config.apiEndpoint + "/folders",payload);
};
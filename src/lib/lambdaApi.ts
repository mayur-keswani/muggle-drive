import axios from "axios"
import { MY_DRIVE } from "../context/constants";
import config from "./config"
import { FolderStructureType, SectionType } from "./types.index";

export const fetchFolders=(type:SectionType = MY_DRIVE )=>{
    return axios.get(config.apiEndpoint+'/folders',{params:{
      type
    }})
}

export const createFolder = async (payload:{name:string,parentRef:string}) => {
  return await axios.post(config.apiEndpoint + "/folders",payload);
};
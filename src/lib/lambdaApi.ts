import axios from "./interceptors"
import { MY_DRIVE } from "../context/constants";
import config from "./config"
import { FolderStructureType, SectionType } from "./types.index";

export const fetchFolders=()=>{
    return axios.get(config.apiEndpoint+'/folders')
}

export const createFolderAPI = async (payload:{name:string,parentRef:string}) => {
  return await axios.post(config.apiEndpoint + "/folders",payload);
};

export const updateFolderAPI = async (payload: FolderStructureType) => {
  return await axios.post(config.apiEndpoint + "/folders", payload);
};


export const deleteFolderAPI = async (id:string) => {
  return await axios.delete(config.apiEndpoint + "/folders",{
    params:{
      id
    }
  });
};

export const recoverFolderAPI = async (id: string) => {
  return await axios.delete(
    config.apiEndpoint + "/folders",
    {
      params: {
        id,
      },
      data: {
        mode: "recover",
      },
    }
  );
};
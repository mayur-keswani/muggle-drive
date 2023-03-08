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

export const starredFolderAPI=async(id:string)=>{
  return await axios.put(config.apiEndpoint + `/folders/${id}`,{},{ params:{mode:'starred'}});
}

export const unStarredFolderAPI = async (id: string) => {
  return await axios.put(config.apiEndpoint + `/folders/${id}`, {}, {
    params: { mode: "unstarred" },
  });
};

export const deleteFolderAPI = async (id:string) => {
  return await axios.delete(config.apiEndpoint + `/folders/${id}`);
};

export const recoverFolderAPI = async (id: string) => {
  return await axios.delete(
    config.apiEndpoint + `/folders/${id}`,{
      data: {
        mode: "recover",
      },
    }
  );
};

/** FILES SECTION */
export const getSignedURLAPI = async (payload:{fileName:string,fileType:string})=>{
  return axios.post(config.apiEndpoint + `/files/upload`,payload);
}

export const uploadAssetsAPI = async(url:string,file:any)=>{
  return axios({
    method: "put",
    url,
    data: file,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
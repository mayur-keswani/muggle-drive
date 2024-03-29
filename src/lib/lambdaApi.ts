import axios from "./interceptors"
import { MY_DRIVE } from "../context/constants";
import config from "./config"
import { FolderStructureType, SectionType } from "./types.index";

export const fetchFoldersAPI=()=>{
    return axios.get(config.apiEndpoint+'/folders')
}
export const fetchSharedToMeFoldersAPI = (parentRef: string | null = null) => {
  return axios.get(config.apiEndpoint + "/folders", {
    params: {
      type: "sharedToMe",
      parentRef,
    },
  });
};

export const fetchSharedToMeFilesAPI = (parentRef:string|null=null) => {
  
  return axios.get(config.apiEndpoint + "/files", {
    params: {
      type: "sharedToMe",
      parentRef
    },
  });
};

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

export const fetchFiles = () => {
  return axios.get(config.apiEndpoint + "/files");
};

export const createFileAPI = async (payload: {
  name: string;
  type: String;
  size: Number;
  url: String;
  parentRef: string;
}) => {
  return await axios.post(config.apiEndpoint + "/files", payload);
};

export const getSignedURLAPI = async (payload:any)=>{
  return axios.post(config.apiEndpoint + `/files/upload`,payload);
}

export const uploadToS3API = async(url:string,file:any,cb:(progress:number)=>void)=>{
  return axios.put(url, file, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / (progressEvent?.total)!
      );
      cb(percentCompleted);
    },
  });
};

export const deleteFileAPI = async (id: string,name:string) => {
  return await axios.delete(config.apiEndpoint + `/files/${id}`,{data:{name}});
};

export const recoverFileAPI = async (id: string) => {
  return await axios.delete(config.apiEndpoint + `/files/${id}`, {
    data: {
      mode: "recover",
    },
  });
};

export const starredFileAPI = async (id: string) => {
  return await axios.put(
    config.apiEndpoint + `/files/${id}`,
    {},
    { params: { mode: "starred" } }
  );
};

export const unStarredFileAPI = async (id: string) => {
  return await axios.put(
    config.apiEndpoint + `/files/${id}`,
    {},
    {
      params: { mode: "unstarred" },
    }
  );
};

export const shareFolderAPI = async(id:string,payload:{id:string,shareTo:string})=>{
  return await axios.post(config.apiEndpoint+`/folders/${id}/share`,{...payload,type:'folder'})
}

export const shareFileAPI = async(id:string,payload:{id:string,shareTo:string})=>{
  return await axios.post(config.apiEndpoint + `/files/${id}/share`, {
    ...payload,
    type: "file",
  });
}

/** AUTH APIS */

export const checkUserExistAPI = async (email: string) => {
  return await axios.post(config.apiEndpoint + `/auth/user`, {
    email,
  });
};
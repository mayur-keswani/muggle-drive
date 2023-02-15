import React, { useContext, useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NotificationContent } from "../../../context/NotificationContext";
import { createFolderAPI, updateFolderAPI } from "../../../lib/lambdaApi";
import { FoldersContent } from "../../../context/FolderContext";
import { SectionType } from "../../../lib/types.index";
import { getFolderDetail } from "../../../lib/helper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,

};

type CreateFolderType={
    parentRef:string,
    isOpen:boolean,
    closeModal:any,
    editFolderId?:string
}

export default function CreateFolder({
  parentRef,
  isOpen,
  closeModal,
  ...props
}: CreateFolderType) {
  const [name, setName] = useState("");
  const {folders}=useContext(FoldersContent)
  const { updateNotification } = useContext(NotificationContent);
  const { addFolder,updateFolder } = useContext(FoldersContent);

  const onSubmit = async () => {
    try {
      if(props.editFolderId){
        const existingDetail =getFolderDetail(folders,props.editFolderId)!
        const response = await updateFolderAPI({...existingDetail, name });
        updateFolder(props.editFolderId,{name});
        updateNotification({
          type: "success",
          message: "Folder Renamed!",
        });
      }else{
        const response = await createFolderAPI({ name, parentRef });
        addFolder(response.data.body);
        updateNotification({
          type: "success",
          message: "Folder Created!",
        });
      }
      
      closeModal();
    } catch (error: any) {
      console.log(error)
      updateNotification({
        type: "error",
        message: error.response?.data?.message,
      });
    }
  };

  useEffect(()=>{
    if(props.editFolderId){
      let folderDetail=getFolderDetail(folders,props.editFolderId);
      if(folderDetail)
        setName(folderDetail.name)
    }
  },[])

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        onClick={(e:any)=>{
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0",
                margin: "0",
              }}
              onClick={closeModal}
            >
              <CloseIcon />
            </Box>
            <Typography id="transition-modal-title" variant="h6">
              {props.editFolderId?'Rename Folder':'Create New Folder'}
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="name"
              value={name}
              onChange={(e) => {
                e.stopPropagation();
                setName(e.target.value);
              }}
              sx={{ width: "100%", margin: "1em 0em" }}
            />
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              size="medium"
              onClick={onSubmit}
            >
              {props.editFolderId?'Update':'Create'}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

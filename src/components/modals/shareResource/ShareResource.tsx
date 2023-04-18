import React, { useContext, useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Autocomplete, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NotificationContent } from "../../../context/NotificationContext";
import {
  shareFolderAPI,
  shareFileAPI,
  checkUserExistAPI,
} from "../../../lib/lambdaApi";
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

type ShareResourcePropsType = {
  id: string;
  type: "folder" | "file";
  isOpen: boolean;
  closeModal: any;
};

let timer: any;
export default function ShareResource({
  id,
  type,
  isOpen,
  closeModal,
}: ShareResourcePropsType) {
  const [options, setOptions] = useState<any[]>([]);

  const [isChecking, setIsChecking] = useState(false);
  const [shareToUserEmail, setSharedToUserEmail] = useState("1e12423");
  const { updateNotification } = useContext(NotificationContent);

  const checkUserExist = async (value: string) => {
    try {
      setIsChecking(true);
      await checkUserExistAPI(value);
      setIsChecking(false);
      setOptions((prevState) => [value]);
    } catch (error) {
      setIsChecking(false);
    }
  };
  const onSelectingUser = (email: string) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(async () => {
       await checkUserExist(email);
    }, 1000);
  };
  const onSubmit = async () => {
    try {
      let response =
        type === "file"
          ? await shareFileAPI(id, {
              id,
              shareTo: shareToUserEmail,
            })
          : await shareFolderAPI(id, { id, shareTo: shareToUserEmail });
      updateNotification({
        type: "success",
        message: "Shared Successfully!",
      });

      closeModal();
    } catch (error: any) {
      console.log(error);
      updateNotification({
        type: "error",
        message: error.response?.data?.message,
      });
    }
  };

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
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
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
              {"Share Resouce"}
            </Typography>
            {isChecking && (
              <Typography color={"text.secondary"} sx={{textAlign:'right'}}>Checking </Typography>
            )}
            <Autocomplete
              id="tags-outlined"
              options={options}
              // freeSolo
              // getOptionLabel={(option) =>{
              //   console.log(option.title)
              // }}
              defaultValue={[]}
              filterSelectedOptions
              onChange={(e, value) => {
                setOptions([]);
                setSharedToUserEmail(value);
              }}
              loading={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Add user email here"
                  sx={{ width: "100%", margin: "1em 0em" }}
                  onChange={async (e) => {
                    await onSelectingUser(e.target.value);
                  }}
                />
              )}
            />

            <Button
              sx={{ width: "100%" }}
              variant="contained"
              size="medium"
              onClick={onSubmit}
            >
              {"Share"}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

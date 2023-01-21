import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
    isOpen:boolean,
    closeModal:any
}
export default function CreateFolder({isOpen,closeModal}:CreateFolderType) {


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
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <Box sx={{display:'flex', justifyContent: "flex-end", alignItems: "center",padding:"0",margin:'0' }} onClick={closeModal}>
              <CloseIcon />
            </Box>
            <Typography id="transition-modal-title" variant="h6">
              Create New Folder
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="name"
              defaultValue="Hello World"
              sx={{ width: "100%", margin: "1em 0em" }}
            />
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              size="medium"
              //   onClick={onSubmitHandler}
            >
              Create
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

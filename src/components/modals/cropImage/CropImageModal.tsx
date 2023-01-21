import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageCropper from "../../cropper/ImageCropper";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./CropImageModal.css";

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

type CropImageModalType = {
  isOpen: boolean;
  closeModal: any;
  onSubmit: (url: string) => void;
  url: string;
};
export default function CropImageModal({
  isOpen,
  closeModal,
  onSubmit,
  url:initialUrl,
}: CropImageModalType) {
  const [isCropping, setIsCropping] = useState(true);
  const [croppedImageUrl, setCroppedImageUrl] = useState<null | string>(null);

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
              Crop Image
            </Typography>

            {isCropping ? (
              <ImageCropper
                url={initialUrl}
                onSubmit={(url) => {
                  setIsCropping(false);
                  setCroppedImageUrl(url);
                }}
              />
            ) : (
              <Box
                className={`cropped-image-section`}
                sx={{ position: "relative" }}
              >
                <Box
                  className={`update-cropped-image-section`}
                  sx={{
                    display: "none",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EditIcon
                    onClick={() => {
                      setIsCropping(true);
                    }}
                  />
                  <HighlightOffIcon
                    onClick={() => {
                      setIsCropping(false);
                      // setInitialImageUrl(null)
                      setCroppedImageUrl("");
                    }}
                  />
                </Box>

                <img
                  src={croppedImageUrl ? croppedImageUrl : initialUrl}
                  width={"100%"}
                  style={{ maxHeight: "300px", objectFit: "contain" }}
                />
              </Box>
            )}

            {!isCropping && (
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                size="medium"
                onClick={() => {
                 onSubmit(croppedImageUrl || initialUrl);
                }}
              >
                Submit
              </Button>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

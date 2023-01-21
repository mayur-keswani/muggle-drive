import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Dropzone, { useDropzone } from "react-dropzone";
import CropIcon from "@mui/icons-material/Crop";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CropImageModal from "../cropImage/CropImageModal";
import {nanoid} from 'nanoid'

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

type CreateFolderType = {
  isOpen: boolean;
  closeModal: any;
};
type FileObjectType={
  path: string,
  lastModified: number,
  lastModifiedDate: string,
  size: number,
  type: string
}
export default function UploadAssets({ isOpen, closeModal }: CreateFolderType) {

  const [acceptedFiles,setAcceptedFiles] = useState<any[]>([]);

  const [croppingImage,setCroppingImage] = useState({
    url:'',
    id:null
  })
  const [showCropImageModal,setShowCropImageModal]=useState(false)

  return (
    <div>
      {showCropImageModal && (
        <CropImageModal
          isOpen={showCropImageModal}
          url={croppingImage.url}
          onSubmit={async(croppedUrl: string) => {
            let blob = await fetch(croppedUrl).then((r) => r.blob());
            console.log("croppedURL", blob);

            console.log('acceptedFiled',acceptedFiles)
            let temp = acceptedFiles.map(file=>(file.id===croppingImage.id)?{...file,blob}:file);
            
            setAcceptedFiles(temp)
            setShowCropImageModal(false)

          }}
          closeModal={() => {
            setShowCropImageModal(false);
          }}
        />
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        slotProps={{
          backdrop: Backdrop,
        }}
        sx={{ overFlow: "scroll" }}
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
              Upload Your Files
            </Typography>

            {acceptedFiles.length > 0 ? (
              acceptedFiles.map((file) => {
                return (
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "#e8f0fe",
                      // color: "#185abc",
                      border: "1px solid lighgray",
                      "&:hover": {
                        color: "#185abc !important",
                      },
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.5em",
                      cursor: "pointer",
                    }}
                  >
                    <Typography sx={{ color: "#3c4043" }}>
                      {file?.name}
                    </Typography>
                    <div>
                      {(file.type === "image/png" ||
                        file.type === "image/jpeg" ||
                        file.type === "image/jpg") && (
                        <CropIcon
                          onClick={() => {
                            setShowCropImageModal(true);

                            setCroppingImage({
                              url: URL.createObjectURL(file.blob),
                              id: file.id,
                            });
                          }}
                        />
                      )}
                      <HighlightOffIcon
                        sx={{margin:'0px 2px'}}
                        onClick={() => {
                          setAcceptedFiles((prevState) => {
                            return prevState.filter((f) => f.id !== file.id);
                          });
                        }}
                      />
                    </div>
                  </Box>
                );
              })
            ) : (
              <Dropzone
                onDrop={(acceptedFiles: any[]) => {
                  setAcceptedFiles(acceptedFiles.map((file)=>(
                    {id:nanoid(),name:file.path,type: file.type,size:file.size,blob:file}
                    )));
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    sx={{
                      padding: "4em",
                      margin: "1em",
                      border: "1px dotted black",
                    }}
                  >
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </Box>
                )}
              </Dropzone>
            )}

            <Button
              sx={{ width: "100%", margin: "2em 0em" }}
              variant="contained"
              size="medium"
              //   onClick={onSubmitHandler}
            >
              Upload
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

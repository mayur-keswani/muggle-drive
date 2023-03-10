import React, { useContext, useState } from "react";
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
import { createFileAPI, getSignedURLAPI, uploadToS3API } from "../../../lib/lambdaApi";
import { FilesContext } from "../../../context/FileContext";
import config from "../../../lib/config";
import { styled } from "@mui/system";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

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
  parentRef:string
};
type UploadAssetType={
  id: string,
  blob:any,
  name:string,
  size: number,
  type: string
}

export default function UploadAssets({ isOpen, closeModal, parentRef }: CreateFolderType) {

  const [acceptedFiles, setAcceptedFiles] = useState<UploadAssetType[]>([]);
  const [croppingImage,setCroppingImage] = useState({url:'',id:''})
  const [showCropImageModal,setShowCropImageModal]=useState(false);
  const [uploadStatus,setUploadStatus] = useState({
    inProgress:false,
    currentNo:0,
    progressPercent:0
  })
  const {addFile}=useContext(FilesContext)

  const uploadAssetsHandler = async (file: UploadAssetType) => {
    try {
      let fileName = file.name + Date.now();
      let bucketName = config.awsBucketName;

      const payload = {
        name: fileName,
        type: file.type,
        size: file.size,
        url: `https://s3.amazonaws.com/${bucketName}/${fileName}`,
        parentRef: parentRef,
      };
      const {
        data: { body: signedURL },
      } = await getSignedURLAPI(payload);


      await uploadToS3API(signedURL, file.blob, (uploadProgress: number) => {
        setUploadStatus((prevState) => ({
          ...prevState,
          progressPercent: uploadProgress,
        }));
      });
      const { data } = await createFileAPI(payload);
      addFile(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (acceptedFiles: any[]) => {
    try {
      for (const iterator of acceptedFiles) {
        setUploadStatus((prevState) => ({
          ...prevState,
          currentNo: prevState.currentNo + 1,
          inProgress: true,
        }));
        await uploadAssetsHandler(iterator);
        setUploadStatus((prevState) => ({ ...prevState, inProgress: false }));
      }
      closeModal();

    } catch (error) {
      console.log(error);
    }
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  return (
    <div>
      {showCropImageModal && (
        <CropImageModal
          isOpen={showCropImageModal}
          url={croppingImage.url}
          onSubmit={async (croppedUrl: string) => {
            let blob = await fetch(croppedUrl).then((r) => r.blob());
            // console.log("croppedURL", blob);

            let temp = acceptedFiles.map((file) =>
              file.id === croppingImage.id ? { ...file, blob } : file
            );
            setAcceptedFiles(temp);
            setShowCropImageModal(false);
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
              acceptedFiles.map((file, index) => {
                return (
                  <Box
                    key={file.id + "-" + index}
                    sx={{
                      width: "100%",
                      // backgroundColor: "#e8f0fe",
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
                    <Typography sx={{ maxWidth: "220px", overflowX: "scroll" }}>
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
                        sx={{ margin: "0px 2px" }}
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
                  setAcceptedFiles(
                    acceptedFiles.map((file) => ({
                      id: nanoid(),
                      name: file.path,
                      type: file.type,
                      size: file.size,
                      blob: file,
                    }))
                  );
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

            {uploadStatus.inProgress && (
              <Box sx={{ flexGrow: 1 }}>
                <Typography>
                  Uploading {uploadStatus.currentNo} out of{" "}
                  {acceptedFiles.length}
                </Typography>
                <BorderLinearProgress
                  variant="determinate"
                  value={uploadStatus.progressPercent}
                />
              </Box>
            )}

            <Button
              sx={{ width: "100%", margin: "2em 0em" }}
              variant="contained"
              size="medium"
              onClick={() => {
                onSubmitHandler(acceptedFiles);
              }}
            >
              Upload
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

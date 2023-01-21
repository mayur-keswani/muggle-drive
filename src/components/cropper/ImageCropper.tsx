import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "@mui/material";

type CropperType = {
  url: string;
  onSubmit:(url:string)=>void
};
const ImageCropper: React.FC<CropperType> = ({ url,onSubmit }) => {
  const [cropper, setCropper] = useState<any>();
  const cropperRef = useRef<HTMLImageElement>(null);
  const onCrop = () => {
     const imageElement: any = cropperRef?.current;
     const cropper: any = imageElement?.cropper;
    //  console.log(cropper.getCroppedCanvas().toDataURL());
  };
   const getCropData = () => {
     if (typeof cropper !== "undefined") {
       onSubmit(cropper.getCroppedCanvas().toDataURL());
     }
   };
  return (
    <div>
      <Cropper
        src={url}
        style={{ width: "100%" }}
        // Cropper.js options
        initialAspectRatio={16 / 9}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
      <Button variant="outlined" onClick={getCropData}>
        Crop
      </Button>
    </div>
  );
};

export default ImageCropper;

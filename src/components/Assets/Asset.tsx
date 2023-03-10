import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ImageIcon from "@mui/icons-material/Image";
import { AssetType, FileStructureType } from "../../lib/types.index";

type AssetComponentType = {
  details: FileStructureType;
};

const Asset: React.FC<AssetComponentType> = ({details:file}) => {
  const icon =
    file.type === AssetType.PDF ? (
      <PictureAsPdfOutlinedIcon />
    ) : (
      <ImageIcon />
    );

  return (
    <Card sx={{ width: "250px", height: "180px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={file.url}
          alt={file.name}
          sx={{ objectFit: "contain", width: "100%" }}
        />
        <CardContent className="d-flex align-items-center py-1 m-0">
          <Typography
            gutterBottom
            component="div"
            noWrap
          >
            {icon} {file.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default Asset;

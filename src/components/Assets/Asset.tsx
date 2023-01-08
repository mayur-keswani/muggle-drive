import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { AssetType } from "../types";

type AssetComponentType = {
  type: string;
  details: any;
};

const Asset: React.FC<AssetComponentType> = (props) => {
  const icon =
    props.type === AssetType.PDF ? (
      <PictureAsPdfOutlinedIcon />
    ) : (
      <PictureAsPdfOutlinedIcon />
    );

  return (
    <Card sx={{ width: "250px", height: "180px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://images.pexels.com/photos/12358386/pexels-photo-12358386.jpeg"
          alt="green iguana"
          sx={{objectFit:'contain',width:'100%'}}
        />
        <CardContent className="d-flex align-items-center py-1 m-0">
          <Typography gutterBottom component="div">
            {icon} {props.details.name}
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

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Button, CardActionArea, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import {useNavigate} from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  const onSubmitHandler=()=>{
    navigate("/dashboard");
  }
  return (
    <main className="d-flex flex-column align-items-center justify-content-center h-100">
      <Typography variant="h3" className="appTitle">
        Welcome to MuggleDrive
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Clone of Google Drive
      </Typography>

      <Card sx={{ width: "450px", height: "380px", margin: "2em" }}>
        <div className="d-flex justify-content-center flex-column align-items-center p-2">
          <Avatar
            alt="Travis Howard"
            sx={{ width: "100px", height: "100px" }}
            src="https://th.bing.com/th/id/OIP.9OLanwqz0biqN8b9QijRqwHaHV?pid=ImgDet&rs=1"
          />
          
        </div>
        <CardContent className="d-flex align-items-center flex-column py-1 m-0">
          <Typography gutterBottom component="div"></Typography>
          <TextField label="Username" sx={{ width: "100%", margin: "1em" }} />
          <TextField label="Password" sx={{ width: "100%" }} />
          <Button
            sx={{ width: "100%", margin: "1em" }}
            variant="contained"
            size="medium"
            onClick={onSubmitHandler}
          >
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Signup;

import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { userPool } from "../../utils/UserPool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { UserContext } from "../../context/UserContext";
import { NotificationContent } from "../../context/NotificationContext";
import { LoadingButton } from "@mui/lab";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading,setIsloading] = useState(false)

  const { updateUserHandler } = useContext(UserContext);
  const { updateNotification } = useContext(NotificationContent);

  const navigate = useNavigate();

  const onSubmitHandler = () => {
    // const attributeListattrList: CognitoUserAttribute[] = [];
    const emailAttribute = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });

    try {
      setIsloading(true)
      userPool.signUp(
        username,
        password,
        [emailAttribute],
        [],
        function (err, result) {
          if (err) {
            setIsloading(false)
            // returnData = { "result ": "fail", data: err.message };
            console.log(err.message);
            updateNotification({type:"error",message:err.message});
          } else {
            setIsloading(false);

            // {"AttributeName": "email","DeliveryMedium": "EMAIL","Destination": "m***@g***"};
            console.log(result);
            updateNotification({type:"success",message:"Signup Successfull,Please Check you Mail for Verification code!"});
              
            updateUserHandler({ username });
            navigate(`/verify`);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="d-flex flex-column align-items-center justify-content-center h-100">
      <h3 className="gradiendText" color="text.secondary">
        Welcome to MuggleDrive
      </h3>
      <Typography variant="h6" color="text.secondary">
        Clone of Google Drive
      </Typography>

      <Card sx={{ width: "450px", height: "auto", margin: "2em" }}>
        <div className="d-flex justify-content-center flex-column align-items-center p-2">
          {/* <Avatar
            alt="Travis Howard"
            sx={{ width: "100px", height: "100px" }}
            src="https://th.bing.com/th/id/OIP.9OLanwqz0biqN8b9QijRqwHaHV?pid=ImgDet&rs=1"
          /> */}
        </div>
        <CardContent className="d-flex align-items-center flex-column py-1 m-0">
          <Typography gutterBottom component="div"></Typography>

          <TextField
            label="Username"
            sx={{ width: "100%" }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            label="Email"
            sx={{ width: "100%", margin: "1em" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="Password"
            sx={{ width: "100%" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography color={"text.secondary"}>
              Already have account?
            </Typography>
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Box>

          <LoadingButton
            sx={{ width: "100%", margin: "1em" }}
            variant="contained"
            size="medium"
            onClick={onSubmitHandler}
            loading={isLoading}
          >
            Sign Up
          </LoadingButton>
        </CardContent>
      </Card>
    </main>
  );
};

export default Signup;

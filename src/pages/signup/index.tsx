import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { NotificationContent } from "../../context/NotificationContext";
import { LoadingButton } from "@mui/lab";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CognitoService } from "../../lib/cognitoServices";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { updateUserHandler } = useContext(UserContext);
  const { updateNotification } = useContext(NotificationContent);

  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    // const attributeListattrList: CognitoUserAttribute[] = [];
    // const emailAttribute = new CognitoUserAttribute({
    //   Name: "email",
    //   Value: email,
    // });
    try {
      setIsloading(true);
      const cognitoService = new CognitoService();
      await cognitoService.registerUser(username, password, { email });
      setIsloading(false);
      updateNotification({
        type: "success",
        message:
          "Signup Successfull,Please Check you Mail for Verification code!",
      });

      updateUserHandler({ username });
      navigate(`/verify`);
    } catch (error:any) {
      setIsloading(false);
      updateNotification({ type: "error", message: error.message });
      console.log(error);
    }
  };

  return (
    <main className="auth-page d-flex flex-column align-items-center justify-content-center">
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <h4 className="gradiendText" color="text.secondary">
          Welcome to MuggleDrive
        </h4>
        <Typography variant="h6" color="text.secondary">
          Clone of Google Drive
        </Typography>
      </Box>

      <Card sx={{ width: { sm: "80%", md: "40%", xl: "30%" }, height: "auto" }}>
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
          {/* <TextField
            label="Password"
            sx={{ width: "100%" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          /> */}
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Password"
              sx={{ width: "100%" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword((prevValue) => !prevValue);
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

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

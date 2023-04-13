import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, FormControl, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import { NotificationContent } from "../../context/NotificationContext";
import { LoadingButton } from "@mui/lab";
import { MY_DRIVE } from "../../context/constants";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CognitoService } from "../../lib/cognitoServices";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateNotification } = useContext(NotificationContent);
  const navigate = useNavigate();

  const { updateUserHandler } = useContext(UserContext);

  const onSubmitHandler = async () => {
    try {
      setIsLoading(true);
      const cognitoService = new CognitoService();

      const result = await cognitoService.loginUser(username, password);
      setIsLoading(false);
      updateUserHandler({
        username,
        isLoggedIn: true,
        idToken: result.getIdToken().getJwtToken(),
        refreshToken: result.getRefreshToken().getToken(),
        accessToken: result.getAccessToken().getJwtToken(),
      });
      updateNotification({ type: "success", message: "Login Successfull" });
      if (result.isValid()) {
        navigate(`/dashboard/${MY_DRIVE}`);
      } else {
        navigate("/verify");
      }
    } catch (error: any) {
      setIsLoading(false);
      updateNotification({ type: "error", message: error.message });
    }
  };

  return (
    <main className="auth-page d-flex flex-column align-items-center justify-content-center">
      <Box sx={{ width: "100%", textAlign: "center", padding: "1em 0em" }}>
        <h4 className="gradiendText">Welcome to MuggleDrive</h4>
        <Typography variant="h6" color="text.secondary">
          Clone of Google Drive
        </Typography>
      </Box>

      <Card sx={{ width: { sm: "85%", md: "40%", xl: "30%" }, height: "auto" }}>
        <div className="d-flex justify-content-center flex-column align-items-center p-2">
          {/* <Avatar
            alt="Travis Howard"
            sx={{ width: "100px", height: "100px" }}
            src="https://images.pexels.com/photos/5774802/pexels-photo-5774802.jpeg?auto=compress&cs=tinysrgb&w=400"
          /> */}
          {/* <div className="avatarDestription d-flex  align-items-center justify-content-center">
            <Typography color="text.secondary">John Doe</Typography>
          </div> */}
        </div>
        <CardContent className="d-flex align-items-center flex-column py-1 m-0">
          <Typography gutterBottom component="div"></Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            sx={{ width: "100%", margin: "1em" }}
          />
          {/* <TextField
            label="Password"
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            sx={{ width: "100%" }}
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
              {" "}
              Don't have account?{" "}
            </Typography>
            <Button
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </Button>
          </Box>
          <LoadingButton
            sx={{ width: "100%", margin: "1em" }}
            variant="contained"
            size="medium"
            onClick={onSubmitHandler}
            loading={isLoading}
          >
            Sign In
          </LoadingButton>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;

import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import React, { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { VerificationCodeComponent } from "../../components/verification-code/VerificationCodeComponent";
import { NotificationContent } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import { CognitoService } from "../../lib/cognitoServices";

const VerifyUser = () => {
  const { user } = useContext(UserContext);
  const { updateNotification } = useContext(NotificationContent);

  const Navigate = useNavigate();

  const onSubmit = async (code: string) => {
    try {
      const cognitoService = new CognitoService();
      await cognitoService.verifyUserCode(code, user.username);
      updateNotification({
        type: "success",
        message: "You are Verified!, Welcome to MuggleDrive",
      });
      Navigate("/login");
    } catch (error) {
      updateNotification({
        type: "error",
        message: "Something went wrong!,Please contact Administerator",
      });
    }
  };

  const reSendCode = async () => {
    try {
      const cognitoService = new CognitoService();
      await cognitoService.reSendVerificationCode('Mohit');
    } catch (error:any) {
      alert(error.message || JSON.stringify(error));
    }
  };

  return (
    <div className="container">
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <h4 className="gradiendText">Verify Your Account</h4>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "1.5em 1em",
        }}
      >
        <VerificationCodeComponent
          id=""
          type="number"
          fields={6}
          fieldWidth={50}
          fieldHeight={46}
          autoFocus={true}
          onChange={() => {}}
          onComplete={onSubmit}
        />
        <Box>
          <Button onClick={reSendCode}>Resent Code</Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}></Box>
    </div>
  );
};

export default VerifyUser;

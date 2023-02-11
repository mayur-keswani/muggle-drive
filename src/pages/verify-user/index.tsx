import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button/Button';
import { CognitoUser } from 'amazon-cognito-identity-js';
import React,{useContext} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {VerificationCodeComponent} from '../../components/verification-code/VerificationCodeComponent';
import { NotificationContent } from '../../context/NotificationContext';
import { UserContext } from '../../context/UserContext';
import { userPool } from '../../utils/UserPool';


const VerifyUser = () => {
   const {user} = useContext(UserContext);
   const { updateNotification } = useContext(NotificationContent);

   const Navigate = useNavigate();
   
   const onSubmit=(code:string)=>{
    console.log(code)
    const payload = {
      Username:user.username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(payload);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if(err){
        // console.log(err);
        updateNotification({type:"error",message:'Something went wrong!,Please contact Administerator'});

      }else if(result){
        if(result==='SUCCESS'){
          updateNotification({type:"success",message:"You are Verified!, Welcome to MuggleDrive"})
          Navigate('/login')
        }
      }
    });
  };

  const reSendCode=()=>{
    const payload = {
      Username: user.username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(payload);
    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log("call result: " + result);
    });
  }
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
          padding:'1.5em 1em'
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
}

export default VerifyUser;
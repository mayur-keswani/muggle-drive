import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button/Button';
import { CognitoUser } from 'amazon-cognito-identity-js';
import React,{useContext} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import {VerificationCodeComponent} from '../../components/verification-code/VerificationCodeComponent';
import { UserContext } from '../../context/UserContext';
import { userPool } from '../../utils/UserPool';


const VerifyUser = () => {
   const {user} = useContext(UserContext);

   const onSubmit=(code:string)=>{
    console.log(code)
    const payload = {
      Username:user.username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(payload);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if(err){
        console.log(err)
      }else if(result){
        console.log(result)
      }
    });
  };

  const reSendCode=()=>{
    
  }
  return (
    <div className="container">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant={"h5"}
          sx={{ margin: "1em" }}
          className="gradiendText"
        >
          Verify Your Account
        </Typography>
        <VerificationCodeComponent
          id=""
          type="number"
          fields={6}
          fieldWidth={58}
          fieldHeight={54}
          autoFocus={true}
          onChange={() => {}}
          onComplete={onSubmit}
        />
        <Button>Resent Code</Button>
      </Box>
      <Box sx={{ display: "flex" }}></Box>
    </div>
  );
}

export default VerifyUser;
import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Box, Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import {  useNavigate } from "react-router-dom";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { userPool } from "../../utils/UserPool";
import { UserContext } from "../../context/UserContext";
import { NotificationContent } from "../../context/NotificationContext";
import {LoadingButton} from "@mui/lab";
import { MY_DRIVE } from "../../context/constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const {updateNotification} = useContext(NotificationContent)
  const navigate = useNavigate();

  const {updateUserHandler}=useContext(UserContext)
  const onSubmitHandler = () => {
    const payload = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const poolPayload = {
      Username: username,
      Pool: userPool,
    };
    
    setIsLoading(true);

    const cognitoUser = new CognitoUser(poolPayload);
    cognitoUser.authenticateUser(payload, {
      onSuccess(result: CognitoUserSession) {
        setIsLoading(false)
        // console.log(result);
        // {
        // "idToken": {
        //      "jwtToken": "eyJraWQiOiJxN0FKc09yK2xWUlI5Sk9VVHduZlNzeHJ3YXcwSzdkZWV6bXIxRHRnR1NzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0ZDNkZjQxNy1iOWIxLTRiNmUtOWNhMi0zODY5YzQ4NmQ1M2EiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfUVdtZlgzTTZVIiwiY29nbml0bzp1c2VybmFtZSI6Ik1heXVyIiwib3JpZ2luX2p0aSI6ImJjN2NmMGY2LTdkODctNDQxZC1iZjY5LTcxNmM3NTNhMmVmMyIsImF1ZCI6IjJ0Zzc3cmw5OGQ4bjRvNW1pYmJrbTlndGRrIiwiZXZlbnRfaWQiOiI2NGQ3ZWE2Ny1lYTVhLTQ0MGQtOGYyNS0yYTdiNTZlNjQyMjUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY3NDMwNzAyOCwiZXhwIjoxNjc0MzEwNjI4LCJpYXQiOjE2NzQzMDcwMjgsImp0aSI6IjljMDU3ZGZmLTVlZjEtNDZjYi1hODdiLTY2Njc0YTJiYzlkOSIsImVtYWlsIjoibWUubWF5dXJrZXN3YW5pQGdtYWlsLmNvbSJ9.Kxky1ViE1JGVmsAts-UFieva5T8RKKlrHX9lw1WVve4rpb8rCtxh2ijQ_z5ctzJVE0i3pXqwlORx2rtKfRd5UyNpPsxtnwu9tBmbCZIugIJe8wTNJ4l5NJxbrro12KxfLRdabR2y_pU6UsM-ktbAqwvJ4Lql8TQb1mqa1Sw7X1izyd77q9KFAGjm1UjTD4t_LteDBc65DPvOh85JISptn8MyArt3FgSXIl0-05tUz8v75su0DvjfiZFLNQ5r0lnhsW7g9a-CzOgYZ_3tgV5VfByZppiNZgMFCgq864d7vtJ-VLpSSF2wY3JOqXk-LmA2bUydOAQg4tMZ32DIewrmNQ",
        //       "payload": {
        //             "sub": "4d3df417-b9b1-4b6e-9ca2-3869c486d53a",
        //             "email_verified": true,
        //             "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_QWmfX3M6U",
        //             "cognito:username": "Mayur",
        //             "origin_jti": "bc7cf0f6-7d87-441d-bf69-716c753a2ef3",
        //             "aud": "2tg77rl98d8n4o5mibbkm9gtdk",
        //             "event_id": "64d7ea67-ea5a-440d-8f25-2a7b56e64225",
        //             "token_use": "id",
        //             "auth_time": 1674307028,
        //             "exp": 1674310628,
        //             "iat": 1674307028,
        //             "jti": "9c057dff-5ef1-46cb-a87b-66674a2bc9d9",
        //             "email": "me.mayurkeswani@gmail.com"
        //       }
        //  },
        //  "refreshToken": {
        //       "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.dsr4jGJw2B_ZnIzF2b3lm7R5QoyaZZ4D3FUCjGU_XTneMJKoAdiACobSSAHDPzQJrs_78WtsPP-8cfFv1VVpbXU4TMkmKROLj_I7Sz1aijL3kxOsZdA1NzX09jvCTnTNMp6C_qc3AzSUFqc18nyjGCtjUy2Td5NKbHe6t0MToNFuzG8E_xsWXezq9nEGgoAxck4_9kRow0uxuJbeIjyafUAQO22Hd1JZkkqdIMcppz2KLgfJxFzEy-dcJ2uTj7-a-BGSJGffPelhKIf-jsARhF6Fwk8HNTmg3vkaavZZzvhvmvqJ5b5JeqV9co_Jr0mRF5vTLcgrqmPzq7vs2BPk6g.F-t8REejfChum8JJ.EOzP5B9IU5AZtaQz_Y85_elMM6qYAJJ-7UkSha2LH03_tW5ks0w88mx7E5OokmlQbciu5YFNO_B5izMzWClQ6LfKqgu0kpcR7d0rOIP8spmX-XAArW7ugHXtqGFimvC0AcxrdMwtzE7XgVMUreGl_EmqfBvhx3vs55pd4-olBqDO0ZTVG7Xi5EIwb4-guQ7ptTfYuE9lPUW6rmz29gT7PHg97Y7rSyY9VRH7oQCy0oXfkmEnBO8H_KpBiKsa8tWDqRrYUmHeyyEB0qQPa00dYr4GNti_75h6_VQrryXnktTQLgUSF7_hxAyiTVO9m8U3I3P7X6AsnHdDeTQOW3Zwa2NJZpxh0Oo2BBYa5Gl6E8jLwCH7m8yOdEP8-1USFw8TvQB3wfPInF0pxnF1MUMWcgfwmGH3bvmVIEOe8v5eRpAokCF0aYXMVkjk3sBwPrwPAswbONaMU4TS9gt2elW8-a9BBAZ7t2sehA7UMYP8SMGTy7KLaLy4wDWWnsaiAlMk2XgfhAvS1k5tOLvVQVqyExWWYFroh6DYyXkEY3PFB97yrnhiV3P_WFeyleXUChts9lFl1il8jXrXRVG_cJer6jd_8njrwMcie9G9jQPj9PMNpOcaxe661pEPrB_gz4Ea4rhXCr-drs9TIAwWe6BA_diJZFQjWtcWF-3vyVeWkTpe945ShGMtNuQEELMOWwsraPozZdpJ4_jifrQZsJUrBYjfLVcIYv8Cyf3EmVGvlAWQe53NgfBsBWVE4tlrvveIlnJDtvZBoQjlHh4mAOJGm0i8CvuZpBnj-KSZaDQuCnikXuSaZUmQ-EcaZ_pZIg6CVPj922oyDkne22JhcvXq743JAvhI8TYImolvOGb-xraPvo8dLdhnaE4jif7fVawDxWxY1gFMoHswm-G5V9Koep3EVGidh_d2dwpLyDZGF2B2K7UP6L4pnUeImjKHZcFouWpuX9-Jzl7VdwoqvWbnhxsBj6_UWYz06I55wAZvt-99_SnaR-ubmP4d30qksSUtYTwMQMltal4miDcXH8bQrQ29wCWqqfr2Ugj3ZXBmu_TMnZP2Bsv4fxZJ3FZoNkobvKt1yXwmho4lTUbEb8WU46KxI8I1jKSka1N_AsMdh-51vBUYwbIKkrF4VTBxAUnYFsSac1QnEnazGPe5bZ4RzmviQSRfCUR7gEnlhInnPflhmEPIJn_OLul6i5A2RjnoYwzSqb_ne4M8m0U3DPykHMctUgxWm-l5UYWAuVNp1ukFdxDWmMDNiVIlPuEN-liyk90.cqktSPAL8QzOlqyftUShUw"
        //  },
        //  "accessToken": {
        //        "jwtToken": "eyJraWQiOiJPUm9lcGVnMGdGNW93ZTV4RGQydytUeU1nTk9yNzlRTlNCcUtIVk9tU3ZJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0ZDNkZjQxNy1iOWIxLTRiNmUtOWNhMi0zODY5YzQ4NmQ1M2EiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9RV21mWDNNNlUiLCJjbGllbnRfaWQiOiIydGc3N3JsOThkOG40bzVtaWJia205Z3RkayIsIm9yaWdpbl9qdGkiOiJiYzdjZjBmNi03ZDg3LTQ0MWQtYmY2OS03MTZjNzUzYTJlZjMiLCJldmVudF9pZCI6IjY0ZDdlYTY3LWVhNWEtNDQwZC04ZjI1LTJhN2I1NmU2NDIyNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NzQzMDcwMjgsImV4cCI6MTY3NDMxMDYyOCwiaWF0IjoxNjc0MzA3MDI4LCJqdGkiOiJiNmRlNzA2Yy0wMmFkLTQ0YmUtYWI2ZC1hNzgzMmU0ZTFiMDAiLCJ1c2VybmFtZSI6Ik1heXVyIn0.Kjnj7CR68Zcs1p5mUaOF1w2IvZ_7qlILKKJkDMzky6ZXFcdEYt9LowLsH-uumazPAUfQUC6fI67gKVP4n--vGYu5twK7iv1lS8QA2ga2kKQe4JvhRVIib6eH3db7SH8RE07wyvK7v6pCLIaYWuLIFYnfgOJFOLHV46EoJRw3KtRQax9p0u4UWbMAzOfAsqpNo9Ca_Np9OG4yAUJAkcE23uYtXj112FLEkn7pt9jA9x_ujSKl688Iz-lbf1mQYA0oesB6i-C8Tn-z-BzC6_q_nryqZMfOMKtxthzOPVUPpInXIMMlRHtI4OBi_L-o9_YSWl8JhfYX6nIIklWPwO1U-Q",
        //        "payload": {
        //             "sub": "4d3df417-b9b1-4b6e-9ca2-3869c486d53a",
        //             "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_QWmfX3M6U",
        //             "client_id": "2tg77rl98d8n4o5mibbkm9gtdk",
        //             "origin_jti": "bc7cf0f6-7d87-441d-bf69-716c753a2ef3",
        //             "event_id": "64d7ea67-ea5a-440d-8f25-2a7b56e64225",
        //             "token_use": "access",
        //             "scope": "aws.cognito.signin.user.admin",
        //             "auth_time": 1674307028,
        //             "exp": 1674310628,
        //             "iat": 1674307028,
        //             "jti": "b6de706c-02ad-44be-ab6d-a7832e4e1b00",
        //             "username": "Mayur"
        //         }
        //     },
        //     "clockDrift": 0
        // }
        updateUserHandler({
          username,
          isLoggedIn:true,
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
          accessToken: result.getAccessToken().getJwtToken(),
        });
        updateNotification({type:"success",message:'Login Successfull'});
        if(result.isValid()){

            navigate(`/dashboard/${MY_DRIVE}`);
        }else{
          navigate('/verify')
        }
        
      },
      onFailure(error) {
        console.log(error);
        setIsLoading(false)
        updateNotification({ type: "error", message: error.message  });

      },
    });
  };
  return (
    <main className="auth-page d-flex flex-column align-items-center justify-content-center">
      <Box  sx={{width:'100%',textAlign:'center' ,padding:'1em 0em'}}>
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
          <TextField
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            sx={{ width: "100%" }}
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

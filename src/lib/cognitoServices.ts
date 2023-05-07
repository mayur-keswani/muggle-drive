import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

export class CognitoService {
  userPool;

  constructor() {
    const POOL_DATA = {
      UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID as string,
      ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID as string,
    };
    this.userPool = new CognitoUserPool(POOL_DATA);
  }

  /**
   * Registers a new user with the provided email, password, and optional user attributes.
   * @param {string} email - The email of the user to register.
   * @param {string} password - The password of the user to register.
   * @param {object} attributes - Optional user attributes to be associated with the user.
   * @returns {Promise} - A Promise that resolves with the result of the user registration.
   */
  registerUser(
    username: string,
    password: string,
    attributes: Record<string, string> = {}
  ) {
    const attributeList: any = [];
    for (const attribute in attributes) {
      attributeList.push({
        Name: attribute,
        Value: attributes[attribute],
      });
    }
    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        username,
        password,
        attributeList,
        [],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  /**
   * Logs in a user with the provided email and password.
   * @param {string} email - The email of the user to log in.
   * @param {string} password - The password of the user to log in.
   * @returns {Promise} - A Promise that resolves with the authenticated user.
   */
  loginUser(email: string, password: string) {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Promise(
      (resolve: (value: CognitoUserSession) => void, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess(result: CognitoUserSession) {
            resolve(result);
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
          },
          onFailure(error) {
            reject(error);
          },
        });
      }
    );
  }

  /**
   * Logs out the currently authenticated user.
   * @returns {Promise} - A Promise that resolves with the result of the user logout.
   */
  logoutUser() {
    const cognitoUser = this.userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (cognitoUser) {
        cognitoUser.signOut();
        resolve(true);
      } else {
        reject();
      }
    });
  }

  /**
   * Logs in a user with the provided email and password.
   * @param {string} code - The verification code that is received by user over email.
   * @param {string} username
   * @returns {Promise}
   */
  verifyUserCode(code: string, username: string) {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else if (result === "SUCCESS") {
          resolve(true);
        }
      });
    });
  }

  /**
   * Logs in a user with the provided email and password.
   * @param {string} username
   * @returns {Promise} - A Promise that resolves with the authenticated user.
   */
  reSendVerificationCode(username: string) {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          reject(err);
        } else if (result === "SUCCESS") {
          resolve(true);
        }
      });
    });
  }

  /**
   * Resets the password for the provided user.
   * @param {string} username - The email of the user to reset password.
   * @returns {Promise} - A Promise that resolves with the result of the password reset request.
   */
  resetPassword(username: string) {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });
    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}

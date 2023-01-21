import { CognitoUserPool } from "amazon-cognito-identity-js";

const POOL_DATA = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID as string,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID as string,
};
export const userPool = new CognitoUserPool(POOL_DATA);
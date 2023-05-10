// ** React Imports
import { useState, useEffect } from "react";


// ** MUI Imports
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

import UserViewLeft from "./UserViewLeft";
import { checkUserExistAPI } from "../../lib/lambdaApi";
import { Link } from "react-router-dom";

const UserProfile:React.FC<{username:string}> = ({ username }) => {
  // ** State
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>(null);
  const fetchUserDetails=async(username:string)=>{
    try{
        const res =await checkUserExistAPI(username)
        let formattedValue:any={}
        res.data.UserAttributes.forEach((data:any) => {
            formattedValue[data.Name]=data.Value
        });
        formattedValue = { ...res.data, ...formattedValue };
        setData(formattedValue);
    }catch(error){
        setData(null);
        setError(true);
    }
  }
  useEffect(() => {
    fetchUserDetails(username);
  }, [username]);
  if (data) {
    return (
      <Grid container spacing={0} justifyContent="center" alignItems="center">
        <Grid item xs={10} md={6} lg={6}>
          <UserViewLeft data={data} />
        </Grid>

      </Grid>
    );
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={24}>
          <Alert severity="error">
            User with the name {username} does not exist. Please check the list
            of users: <Link to="/apps/user/list">User List</Link>
          </Alert>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserProfile;

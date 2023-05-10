import React, { useContext } from "react";
import UserProfile from '../../components/user-profile/UserProfile';
import { UserContext } from '../../context/UserContext';

const Account = () => {
  const {user:{username}} =useContext(UserContext)
  return (
    <div><UserProfile username={username}/></div>
  )
}

export default Account;
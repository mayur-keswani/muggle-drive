import React, { useEffect, useState } from "react";

type UserType = {
  username: string;
  accessToken: null;
  refreshToken: null;
  idToken: null;
  isLoggedIn: boolean;
};
const initialUserValue = {
  username: "",
  accessToken: null,
  refreshToken: null,
  idToken: null,
  isLoggedIn: false,
};
export const UserContext = React.createContext<{
  user: UserType;
  updateUserHandler: (params: Record<string, string|boolean>) => void;
}>({
  user: initialUserValue,
  updateUserHandler: (params) => {},
});
const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<UserType>(()=> JSON.parse(localStorage.getItem('auth')!)??initialUserValue);

  const updateUserHandler = (params: Record<string, string|boolean>) => {  
    setUser((prevValues) => ({ ...prevValues, ...params }));
  };

  useEffect(()=>{
    localStorage.setItem('auth',JSON.stringify(user))
  },[user])
  return (
    <UserContext.Provider value={{ user, updateUserHandler }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

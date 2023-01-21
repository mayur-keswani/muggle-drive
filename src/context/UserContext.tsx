import React, { useState } from "react";

type UserType = {
  username: string;
};
export const UserContext = React.createContext<{
  user: UserType;
  updateUserHandler: (params: Record<string, string>) => void;
}>({
  user: { username: "" },
  updateUserHandler: (params) => {},
});
const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<UserType>({
    username: "",
  });

  const updateUserHandler = (params: Record<string, string>) => {
    setUser((prevValues) => ({ ...prevValues, ...params }));
  };
  return (
    <UserContext.Provider value={{ user, updateUserHandler }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

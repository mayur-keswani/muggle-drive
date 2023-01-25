import React, { useState } from "react";

type AlertColor = 'success'|'error'|'warning';
export const NotificationContent = React.createContext<{
  showNotification: boolean;
  hideNotification: ((event: React.SyntheticEvent<Element, Event>) => void);
  notification: { type: AlertColor; message: string };
  updateNotification: (params: {
    type: AlertColor;
    message: string;
  }) => void;
}>({
  showNotification: false,
  hideNotification: () => {},
  notification: { type: 'success', message: "" },
  updateNotification: (params) => {},
});

const NotificationProvider = (props: any) => {
  const [showNotification,setShowNotification] = useState(false)
  const [notification, setNotification] = useState<{
    type: AlertColor;
    message: string;
  }>({ type: 'success', message: '' });

  const updateNotification = (params: { type: AlertColor; message: string }) => {
    setShowNotification(true)
    setNotification(params);
  };
  const hideNotification=()=>{
    setShowNotification(false)
  }
  return (
    <NotificationContent.Provider
      value={{ showNotification,hideNotification, notification, updateNotification }}
    >
      {props.children}
    </NotificationContent.Provider>
  );
};

export default NotificationProvider;

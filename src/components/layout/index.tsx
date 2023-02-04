import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import React, { useContext } from "react";
import { NotificationContent } from '../../context/NotificationContext';
import Header from './header/Header';

const Layout = (props:any) => {
  const {showNotification,hideNotification,notification}=useContext(NotificationContent);
  return (
    <>
      {props.showHeader && <Header />}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ maxWidth: 600 }}
      >
        <Alert
          onClose={hideNotification}
          variant="filled"
          severity={notification.type}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      {props.children}
    </>
  );
}

export default Layout;
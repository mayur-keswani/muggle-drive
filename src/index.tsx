import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter  } from "react-router-dom";
import UserContextProvider from './context/UserContext';
import NotificationProvider from './context/NotificationContext';
import FoldersProvider from './context/FolderContext';
import FilesProvider from './context/FileContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <FoldersProvider>
        <FilesProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </FilesProvider>
      </FoldersProvider>
    </UserContextProvider>
  </BrowserRouter>
);


import React, { useContext } from "react";
import "./App.css";
import Layout from "./components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import VerifyUser from "./pages/verify-user";
import MyDrive from "./components/drive";
import { UserContext } from "./context/UserContext";
import Folders from "./components/folders/Folders";
import SearchComponent from "./components/search/SearchComponent";

const ProtectedRoute = (props:any) => {
  if (!props.user.isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  return props.children ? props.children :<Outlet />;
};
function App() {
  const {user}=useContext(UserContext)
  return (
    <div className="App">
      <Routes>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute user={user}>
              <Layout showHeader>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        >
          <Route path={`/dashboard/search`} element={<SearchComponent/>}></Route>
          <Route path={`/dashboard/:sectionType`} element={<MyDrive showFolders={true} showFiles={true}/>}></Route>
          <Route path={`/dashboard/:sectionType/folders`} element={<MyDrive showFolders={true} showFiles={false}/>} />
          <Route path={`/dashboard/:sectionType/folders/:folderId`} element={<MyDrive showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/:sectionType/folders/:folderId`} element={<MyDrive showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/:sectionType/files`} element={<MyDrive showFolders={false} showFiles={true}/>} />

          

          {/* <Route path={`/dashboard/${COMPUTER}`} element={<Computers showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${COMPUTER}/folders`} element={<Computers showFolders={true} showFiles={false}/>} />
          <Route path={`/dashboard/${COMPUTER}/folders/:folderId`} element={<Computers showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${COMPUTER}/folders/:folderId`} element={<Computers showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${COMPUTER}/files`} element={<Computers showFolders={false} showFiles={true}/>} /> */}

          {/* <Route path={`/dashboard/${BIN}`} element={<Bin showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${BIN}/folders`} element={<Bin showFolders={true} showFiles={false}/>} />
          <Route path={`/dashboard/${BIN}/folders/:folderId`} element={<Bin showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${BIN}/folders/:folderId`} element={<Bin showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${BIN}/files`} element={<Bin showFolders={false} showFiles={true}/>} /> */}

          {/* <Route path={`/dashboard/${RECENT}`} element={<Recent  showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${RECENT}/folders`} element={<Recent showFolders={true} showFiles={false}/>} />
          <Route path={`/dashboard/${RECENT}/folders/:folderId`} element={<Recent showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${RECENT}/folders/:folderId`} element={<Recent showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${RECENT}/files`} element={<Recent showFolders={false} showFiles={true}/>} /> */}
          
          {/* <Route path={`/dashboard/${SHARED}`} element={<Shared showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${SHARED}/folders`} element={<Shared showFolders={true} showFiles={false}/>} />
          <Route path={`/dashboard/${SHARED}/folders/:folderId`} element={<Shared showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${SHARED}/folders/:folderId`} element={<Shared showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${SHARED}/files`} element={<Shared showFolders={false} showFiles={true}/>} /> */}


          {/* <Route path={`/dashboard/${STARRED}`} element={<Starred showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${STARRED}/folders`} element={<Starred showFolders={true} showFiles={false}/>} />
          <Route path={`/dashboard/${STARRED}/folders/:folderId`} element={<Starred showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${STARRED}/folders/:folderId`} element={<Starred showFolders={true} showFiles={true}/>} />
          <Route path={`/dashboard/${STARRED}/files`} element={<Starred showFolders={false} showFiles={true}/>} /> */}
        </Route>

        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route
          path="/login"
          element={
            <Layout showHeader={false}>
              <Login />
            </Layout>
          }
        />

        <Route
          path="/signup"
          element={
            <Layout showHeader={false}>
              <Signup />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout showHeader={false}>
              <Signup />
            </Layout>
          }
        />

        <Route
          path="/verify"
          element={
            <Layout showHeader={false}>
              <VerifyUser />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

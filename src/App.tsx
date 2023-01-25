import React, { useContext } from "react";
import "./App.css";
import Layout from "./components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import VerifyUser from "./pages/verify-user";
import MyDrive from "./components/sections/my-drive";
import Computers from "./components/sections/computers";
import Bin from "./components/sections/bin";
import Recent from "./components/sections/recent";
import Shared from "./components/sections/shared";
import Starred from "./components/sections/starred";
import { UserContext } from "./context/UserContext";

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
          <Route path="/dashboard/my-drive" element={<MyDrive />} />
          <Route path="/dashboard/computers" element={<Computers />} />
          <Route path="/dashboard/bin" element={<Bin />} />
          <Route path="/dashboard/recent" element={<Recent />} />
          <Route path="/dashboard/shared" element={<Shared />} />
          <Route path="/dashboard/starred" element={<Starred />} />
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

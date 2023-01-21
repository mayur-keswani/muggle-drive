import React from "react";
import "./App.css";
import Layout from "./components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import VerifyUser from "./pages/verify-user";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/dashboard/:path"
          element={
            <Layout showHeader>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="dashboard"
          element={<Navigate to="/dashboard/my-drive" replace />}
        />
        <Route
          path="/"
          element={
            <Layout showHeader={false}>
              <Signup />
            </Layout>
          }
        />

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

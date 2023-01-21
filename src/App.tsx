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
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="dashboard"
          element={<Navigate to="/dashboard/my-drive" replace />}
        />
        <Route path="/" element={<Signup />} />

        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyUser />} />
      </Routes>
    </div>
  );
}

export default App;

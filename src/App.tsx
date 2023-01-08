import React from "react";
import "./App.css";
import Layout from "./components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";

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
        <Route path="/" element={<Signup />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

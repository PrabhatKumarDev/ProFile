import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <ConditionalLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Assuming Home is the dashboard */}
            <Route path="/register" element={<Login />} /> {/* Reusing Login component for Register */}
          </Routes>
        </ConditionalLayout>
      </Router>
    </>
  );
}

// Component to conditionally render Navbar and Sidebar
const ConditionalLayout = ({ children }) => {
  const location = useLocation();

  // Define routes where Navbar and Sidebar should not be displayed
  const noLayoutRoutes = ["/login","/register","/"];

  // Check if the current route is in the noLayoutRoutes list
  const shouldShowLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowLayout && <Navbar />}
      <div className="flex flex-row">
        {shouldShowLayout && <Sidebar />}
        {children}
      </div>
    </>
  );
};

export default App;
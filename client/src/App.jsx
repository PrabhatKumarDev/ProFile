import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation,matchPath } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TemplateSelection from "./pages/TemplateSelection";
import Dashboard from "./pages/Dashboard";
import PortfolioEditor from "./pages/PortfolioEditor";
import PortfolioPreview from "./pages/PortfolioPreview";
import PublicPortfolio from "./pages/PublicPortfolio";

function App() {
  return (
    <>
      <Router>
        <ConditionalLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Assuming Home is the dashboard */}
            <Route path="/templates" element={<TemplateSelection/>} /> {/* Placeholder for Templates page */}
            <Route path="/editor" element={<PortfolioEditor />} /> {/* Placeholder for Portfolio Editor page */}
            <Route path="/preview" element={<PortfolioPreview />} /> {/* Placeholder for Portfolio Preview page */}
            <Route path="/register" element={<Register />} /> {/* Reusing Login component for Register */}
            <Route path="/editor/:id" element={<PortfolioEditor />} /> {/* Portfolio Editor with ID */}
            <Route path="/preview/:id" element={<PortfolioPreview />} /> {/* Portfolio Preview with ID */}
            <Route path ="/portfolio/:slug" element={<PublicPortfolio />} /> {/* Portfolio by username */}
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
  const noLayoutRoutes = ["/login","/register ","/portfolio/:slug"];

  // Check if the current route is in the noLayoutRoutes list
  const shouldShowLayout = !noLayoutRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  return (
    <>
      {shouldShowLayout && <Navbar />}
      <div className="flex flex-row">
        {/* {shouldShowLayout && <Sidebar />} */}
        {children}
      </div>
    </>
  );
};

export default App;
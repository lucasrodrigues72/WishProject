import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage"; // ✅ Importer la page d'inscription
import Dashboard from "./Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> {/* ✅ Ajouter cette ligne */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

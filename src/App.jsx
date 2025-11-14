import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
           
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

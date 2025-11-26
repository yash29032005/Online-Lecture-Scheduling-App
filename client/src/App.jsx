import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import InstructorLayout from "./layouts/InstructorLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/*"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorLayout />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;

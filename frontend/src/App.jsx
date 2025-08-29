import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CourseManagement from "./pages/CourseManagement";
import CourseDetail from "./pages/CourseDetail";
import LessonDetail from "./pages/LessonDetail";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/courses/:courseId" 
            element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/courses/:courseId/lessons/:lessonId" 
            element={
              <ProtectedRoute>
                <LessonDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manage" 
            element={
              <ProtectedRoute requiredRole="manager">
                <CourseManagement />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
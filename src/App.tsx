
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import MainLayout from "./components/layout/MainLayout";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";

// Mentor pages
import MentorDashboard from "./pages/mentor/Dashboard";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import MissionList from "./pages/student/MissionList";
import AiMentor from "./pages/student/AiMentor";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles: string[];
}) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    // You can add a loading spinner here
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    // Redirect to the appropriate dashboard based on role
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (currentUser.role === 'mentor') {
      return <Navigate to="/mentor/dashboard" replace />;
    } else {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />

      {/* If authenticated, redirect to role-specific dashboard */}
      <Route path="/" element={isAuthenticated ? <AuthRedirect /> : <Navigate to="/login" replace />} />

      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* Add other admin routes as needed */}
      </Route>

      {/* Mentor routes */}
      <Route path="/mentor" element={
        <ProtectedRoute allowedRoles={['mentor']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<MentorDashboard />} />
        {/* Add other mentor routes as needed */}
      </Route>

      {/* Student routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={['student']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="missions/:category" element={<MissionList />} />
        <Route path="mentor" element={<AiMentor />} />
        {/* Add other student routes as needed */}
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Helper component to redirect based on role
const AuthRedirect = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;

  switch (currentUser.role) {
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    case "mentor":
      return <Navigate to="/mentor/dashboard" replace />;
    case "student":
      return <Navigate to="/student/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

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
import AdminUsers from "./pages/admin/Users";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

// Mentor pages
import MentorDashboard from "./pages/mentor/Dashboard";
import MentorStudents from "./pages/mentor/Students";
import MentorMessages from "./pages/mentor/Messages";
import MentorMissions from "./pages/mentor/Missions";
import MentorProfile from "./pages/mentor/Profile";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import MissionList from "./pages/student/MissionList";
import MissionDetail from "./pages/student/MissionDetail";
import AiMentor from "./pages/student/AiMentor";
import StudentProfile from "./pages/student/Profile";
import SoulCircles from "./pages/student/SoulCircles";

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
      <Route path="/" element={<Index />} />

      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/new" element={<UserCreate />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Mentor routes */}
      <Route path="/mentor" element={
        <ProtectedRoute allowedRoles={['mentor']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<MentorDashboard />} />
        <Route path="students" element={<MentorStudents />} />
        <Route path="student/:studentId" element={<MentorStudents />} />
        <Route path="messages" element={<MentorMessages />} />
        <Route path="messages/:userId" element={<MentorMessages />} />
        <Route path="missions" element={<MentorMissions />} />
        <Route path="missions/new" element={<MissionsCreate />} />
        <Route path="missions/:missionId" element={<MentorMissions />} />
        <Route path="missions/:missionId/edit" element={<MissionEdit />} />
        <Route path="profile" element={<MentorProfile />} />
      </Route>

      {/* Student routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={['student']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="missions/:category" element={<MissionList />} />
        <Route path="missions/:category/:missionId" element={<MissionDetail />} />
        <Route path="mentor" element={<AiMentor />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="soul-circles" element={<SoulCircles />} />
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

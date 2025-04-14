
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export type UserRole = "admin" | "mentor" | "student";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileImg?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Sample users for demonstration
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@liferoot.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as UserRole,
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  },
  {
    id: "2",
    email: "mentor@liferoot.com",
    password: "mentor123",
    name: "Mentor Smith",
    role: "mentor" as UserRole,
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=mentor",
  },
  {
    id: "3",
    email: "student@liferoot.com",
    password: "student123",
    name: "Alex Student",
    role: "student" as UserRole,
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=student",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("liferoot_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("liferoot_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to the backend
      // Here we're using mock data for demonstration
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Extract everything except the password
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      
      // Store in localStorage for persistence
      localStorage.setItem("liferoot_user", JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });

      // Redirect based on role
      if (userWithoutPassword.role === "admin") {
        navigate("/admin/dashboard");
      } else if (userWithoutPassword.role === "mentor") {
        navigate("/mentor/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // In a real app, this would include an API call to invalidate the session
    localStorage.removeItem("liferoot_user");
    setCurrentUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

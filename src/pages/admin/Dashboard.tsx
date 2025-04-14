
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserPlus, 
  School, 
  Award, 
  TrendingUp,
  BarChart2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for the admin dashboard
const mockUserStats = {
  totalStudents: 245,
  totalMentors: 12,
  totalAdmins: 3,
  totalSchools: 5,
  totalMissions: 48,
  totalCompletedMissions: 1256,
  growthRate: 15,
};

const mockActivityData = [
  { name: "Monday", students: 65, mentors: 12 },
  { name: "Tuesday", students: 78, mentors: 15 },
  { name: "Wednesday", students: 90, mentors: 18 },
  { name: "Thursday", students: 81, mentors: 14 },
  { name: "Friday", students: 56, mentors: 10 },
  { name: "Saturday", students: 30, mentors: 5 },
  { name: "Sunday", students: 42, mentors: 8 },
];

const mockMissionTypeData = [
  { name: "Eco", value: 40 },
  { name: "EQ", value: 35 },
  { name: "Values", value: 25 },
];

const mockCompletionData = [
  { month: "Jan", completed: 65 },
  { month: "Feb", completed: 78 },
  { month: "Mar", completed: 90 },
  { month: "Apr", completed: 120 },
  { month: "May", completed: 100 },
  { month: "Jun", completed: 145 },
];

const MISSION_TYPE_COLORS = ["#4CAF50", "#42A5F5", "#FFEE58"];

const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {currentUser.name}</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button onClick={() => navigate("/admin/users/new")}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/reports")}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-liferoot-blue mr-2" />
              <div className="text-2xl font-bold">
                {mockUserStats.totalStudents + mockUserStats.totalMentors + mockUserStats.totalAdmins}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Schools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <School className="h-5 w-5 text-liferoot-yellow-dark mr-2" />
              <div className="text-2xl font-bold">{mockUserStats.totalSchools}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Missions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-liferoot-green mr-2" />
              <div className="text-2xl font-bold">{mockUserStats.totalCompletedMissions}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Growth Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-liferoot-earth mr-2" />
              <div className="text-2xl font-bold">+{mockUserStats.growthRate}%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>
              User engagement throughout the week
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockActivityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" name="Students" fill="#4CAF50" />
                <Bar dataKey="mentors" name="Mentors" fill="#42A5F5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mission completion chart */}
        <Card>
          <CardHeader>
            <CardTitle>Mission Completions</CardTitle>
            <CardDescription>
              Monthly mission completions
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCompletionData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  name="Completed Missions" 
                  stroke="#4CAF50" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mission type distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Mission Type Distribution</CardTitle>
            <CardDescription>
              Distribution of mission types
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockMissionTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockMissionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={MISSION_TYPE_COLORS[index % MISSION_TYPE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User roles distribution */}
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>
              Distribution of user roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Students</span>
                  <span className="text-sm text-muted-foreground">{mockUserStats.totalStudents}</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-liferoot-green" 
                    style={{ 
                      width: `${(mockUserStats.totalStudents / (mockUserStats.totalStudents + mockUserStats.totalMentors + mockUserStats.totalAdmins)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Mentors</span>
                  <span className="text-sm text-muted-foreground">{mockUserStats.totalMentors}</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-liferoot-blue" 
                    style={{ 
                      width: `${(mockUserStats.totalMentors / (mockUserStats.totalStudents + mockUserStats.totalMentors + mockUserStats.totalAdmins)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Admins</span>
                  <span className="text-sm text-muted-foreground">{mockUserStats.totalAdmins}</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-liferoot-yellow-dark" 
                    style={{ 
                      width: `${(mockUserStats.totalAdmins / (mockUserStats.totalStudents + mockUserStats.totalMentors + mockUserStats.totalAdmins)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm font-medium mb-1">Students</p>
                <p className="text-2xl font-bold">{mockUserStats.totalStudents}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm font-medium mb-1">Mentors</p>
                <p className="text-2xl font-bold">{mockUserStats.totalMentors}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm font-medium mb-1">Admins</p>
                <p className="text-2xl font-bold">{mockUserStats.totalAdmins}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

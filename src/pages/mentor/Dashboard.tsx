
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, Users, Award, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for the mentor dashboard
const mockStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    pendingMissions: 2,
    lastActive: "Today",
  },
  {
    id: "2",
    name: "Jamie Smith",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
    pendingMissions: 0,
    lastActive: "Yesterday",
  },
  {
    id: "3",
    name: "Casey Wilson",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
    pendingMissions: 1,
    lastActive: "2 days ago",
  },
  {
    id: "4",
    name: "Riley Brown",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
    pendingMissions: 3,
    lastActive: "3 days ago",
  },
];

const mockPendingApprovals = [
  {
    id: "1",
    title: "Reduce Food Waste",
    student: "Alex Johnson",
    studentImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    submittedAt: "2 hours ago",
    type: "eco",
  },
  {
    id: "2",
    title: "Daily Mindfulness",
    student: "Casey Wilson",
    studentImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
    submittedAt: "Yesterday",
    type: "eq",
  },
  {
    id: "3",
    title: "Help Someone In Need",
    student: "Riley Brown",
    studentImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
    submittedAt: "2 days ago",
    type: "values",
  },
];

const MentorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "eco": return "bg-liferoot-green text-white";
      case "eq": return "bg-liferoot-blue text-white";
      case "values": return "bg-liferoot-yellow text-black";
      default: return "bg-liferoot-earth text-white";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {currentUser.name}!</h1>
          <p className="text-muted-foreground">Mentor Dashboard</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button onClick={() => navigate("/mentor/messages")}>
            <MessageSquare className="h-4 w-4 mr-2" />
            New Messages
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/mentor/students")}
          >
            <Users className="h-4 w-4 mr-2" />
            View All Students
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Assigned Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-liferoot-blue mr-2" />
              <div className="text-2xl font-bold">{mockStudents.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-liferoot-yellow-dark mr-2" />
              <div className="text-2xl font-bold">{mockPendingApprovals.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved Missions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-liferoot-green mr-2" />
              <div className="text-2xl font-bold">24</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Student Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-liferoot-earth mr-2" />
              <div className="text-2xl font-bold">+18%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending approvals */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Mission Approvals</CardTitle>
          <CardDescription>
            Review and approve student mission submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockPendingApprovals.length > 0 ? (
            <div className="space-y-4">
              {mockPendingApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={approval.studentImg} />
                      <AvatarFallback>{approval.student.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{approval.student}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded ${getTypeColor(approval.type)}`}>
                          {approval.type === "eco" ? "Eco" : approval.type === "eq" ? "EQ" : "Values"}
                        </span>
                        <span className="text-sm text-muted-foreground">{approval.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Submitted {approval.submittedAt}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-liferoot-green text-liferoot-green hover:bg-liferoot-green hover:text-white">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
                      <XCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/mentor/mission/${approval.id}`)}>
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No pending approvals</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student list */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockStudents.map((student) => (
            <Card key={student.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={student.profileImg} />
                    <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <CardDescription>Last active: {student.lastActive}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Pending missions:</span>
                  <span className={student.pendingMissions > 0 ? "text-liferoot-yellow-dark font-medium" : "text-muted-foreground"}>
                    {student.pendingMissions}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate(`/mentor/student/${student.id}`)}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;


import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Leaf, Brain, Heart, Award, TrendingUp, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for the student dashboard
const mockMissions = [
  {
    id: "1",
    title: "Reduce Food Waste",
    category: "eco",
    icon: Leaf,
    color: "bg-liferoot-green",
    progress: 30,
    description: "Track your food waste for 7 days and reduce it by 20%",
    daysLeft: 5,
  },
  {
    id: "2",
    title: "Daily Mindfulness",
    category: "eq",
    icon: Brain,
    color: "bg-liferoot-blue",
    progress: 60,
    description: "Complete 5 minutes of mindfulness exercises for 10 days",
    daysLeft: 3,
  },
  {
    id: "3",
    title: "Help Someone In Need",
    category: "values",
    icon: Heart,
    color: "bg-liferoot-yellow",
    progress: 100,
    description: "Identify someone who needs help and assist them",
    daysLeft: 0,
    completed: true,
  },
];

const mockStats = {
  totalPoints: 560,
  ecoPoints: 210,
  eqPoints: 175,
  valuePoints: 175,
  weeklyGrowth: 15,
  streak: 5,
  badges: 8,
};

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {currentUser.name}!</h1>
          <p className="text-muted-foreground">Track your growth journey with LifeRoot</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button onClick={() => navigate("/student/mentor")}>
            Talk to Roo 🤖
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/student/missions/eco")}
          >
            New Missions
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total LifePoints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-liferoot-green mr-2" />
              <div className="text-2xl font-bold">{mockStats.totalPoints}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Weekly Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-liferoot-blue mr-2" />
              <div className="text-2xl font-bold">+{mockStats.weeklyGrowth}%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Daily Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-liferoot-yellow-dark mr-2" />
              <div className="text-2xl font-bold">{mockStats.streak} days</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Badges Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-liferoot-earth mr-2" />
              <div className="text-2xl font-bold">{mockStats.badges}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Your Growth Areas</CardTitle>
          <CardDescription>
            Balance your growth across these key areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center">
                  <Leaf className="h-4 w-4 mr-1 text-liferoot-green" />
                  Environmental Sustainability
                </span>
                <span className="text-sm text-muted-foreground">{mockStats.ecoPoints} pts</span>
              </div>
              <Progress value={Math.round((mockStats.ecoPoints / mockStats.totalPoints) * 100)} 
                        className="h-2 bg-liferoot-earth-light" 
                        indicatorClassName="bg-liferoot-green" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center">
                  <Brain className="h-4 w-4 mr-1 text-liferoot-blue" />
                  Emotional Intelligence
                </span>
                <span className="text-sm text-muted-foreground">{mockStats.eqPoints} pts</span>
              </div>
              <Progress value={Math.round((mockStats.eqPoints / mockStats.totalPoints) * 100)} 
                        className="h-2 bg-liferoot-earth-light" 
                        indicatorClassName="bg-liferoot-blue" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center">
                  <Heart className="h-4 w-4 mr-1 text-liferoot-yellow" />
                  Ethical Values
                </span>
                <span className="text-sm text-muted-foreground">{mockStats.valuePoints} pts</span>
              </div>
              <Progress value={Math.round((mockStats.valuePoints / mockStats.totalPoints) * 100)} 
                        className="h-2 bg-liferoot-earth-light" 
                        indicatorClassName="bg-liferoot-yellow" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active missions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Active Missions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockMissions.map((mission) => (
            <Card key={mission.id} className={mission.completed ? "border-liferoot-green" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className={`${mission.color} p-2 rounded-full`}>
                    <mission.icon className="h-4 w-4 text-white" />
                  </div>
                  {mission.completed ? (
                    <div className="bg-liferoot-green/20 text-liferoot-green text-xs font-medium py-1 px-2 rounded-full">
                      Completed
                    </div>
                  ) : (
                    <div className="bg-liferoot-earth-light text-liferoot-earth-dark text-xs py-1 px-2 rounded-full">
                      {mission.daysLeft} days left
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg mt-2">{mission.title}</CardTitle>
                <CardDescription>{mission.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{mission.progress}%</span>
                  </div>
                  <Progress value={mission.progress} className="h-2" />
                  <div className="pt-2">
                    <Button 
                      variant={mission.completed ? "outline" : "default"} 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate(`/student/missions/${mission.category}/${mission.id}`)}
                    >
                      {mission.completed ? "View Details" : "Continue Mission"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

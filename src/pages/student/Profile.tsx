
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "@/components/user/UserProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BarChart2 } from "lucide-react";

// Mock user stats
const mockUserStats = {
  totalPoints: 560,
  ecoPoints: 210,
  eqPoints: 175,
  valuePoints: 175,
  badges: [
    { id: "1", name: "Eco Warrior", category: "eco", description: "Completed 5 environmental missions" },
    { id: "2", name: "Mindfulness Master", category: "eq", description: "Maintained a 10-day mindfulness streak" },
    { id: "3", name: "Community Helper", category: "values", description: "Helped 5 people in need" },
  ],
  achievements: [
    { id: "1", date: "2023-04-12", title: "First Mission Completed", points: 30 },
    { id: "2", date: "2023-04-15", title: "3-Day Streak", points: 15 },
    { id: "3", date: "2023-04-20", title: "Eco Challenge Completed", points: 50 },
  ],
};

const StudentProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const [userStats, setUserStats] = useState(mockUserStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user profile and stats from backend
    // API endpoint: GET /api/student/profile
    // API endpoint: GET /api/student/stats
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (!currentUser) return null;
  
  const getBadgeColor = (category: string) => {
    switch (category) {
      case "eco": return "bg-liferoot-green";
      case "eq": return "bg-liferoot-blue";
      case "values": return "bg-liferoot-yellow";
      default: return "bg-liferoot-earth";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">View and update your personal information</p>
      </div>
      
      <UserProfile isLoading={isLoading} />
      
      <Tabs defaultValue="badges" className="w-full">
        <TabsList>
          <TabsTrigger value="badges">
            <Award className="h-4 w-4 mr-2" /> Badges & Achievements
          </TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart2 className="h-4 w-4 mr-2" /> My Stats
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="badges" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Earned Badges</CardTitle>
              <CardDescription>
                Badges you've earned through completing missions and challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {userStats.badges.map(badge => (
                    <div key={badge.id} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className={`${getBadgeColor(badge.category)} p-2 rounded-full`}>
                          <Award className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{badge.name}</h3>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse">Loading badges...</div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>
                Your latest accomplishments and point earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isLoading ? (
                <div className="divide-y">
                  {userStats.achievements.map(achievement => (
                    <div key={achievement.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-liferoot-green font-medium">
                        +{achievement.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse">Loading achievements...</div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Growth Stats</CardTitle>
              <CardDescription>
                Track your progress across different growth areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isLoading ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Total LifePoints: {userStats.totalPoints}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="bg-liferoot-green p-2 rounded-full mr-2">
                              <Award className="h-4 w-4 text-white" />
                            </div>
                            <span>Eco Points</span>
                          </div>
                          <span className="font-medium">{userStats.ecoPoints}</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-liferoot-green" 
                            style={{ width: `${(userStats.ecoPoints / userStats.totalPoints) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="bg-liferoot-blue p-2 rounded-full mr-2">
                              <Award className="h-4 w-4 text-white" />
                            </div>
                            <span>EQ Points</span>
                          </div>
                          <span className="font-medium">{userStats.eqPoints}</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-liferoot-blue" 
                            style={{ width: `${(userStats.eqPoints / userStats.totalPoints) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="bg-liferoot-yellow p-2 rounded-full mr-2">
                              <Award className="h-4 w-4 text-white" />
                            </div>
                            <span>Values Points</span>
                          </div>
                          <span className="font-medium">{userStats.valuePoints}</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-liferoot-yellow" 
                            style={{ width: `${(userStats.valuePoints / userStats.totalPoints) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* TODO: Add more detailed stats, graphs, etc. */}
                  <div className="text-center text-muted-foreground py-4">
                    Detailed growth charts coming soon...
                  </div>
                </div>
              ) : (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse">Loading stats...</div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProfile;

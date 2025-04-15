
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

// Mock data for the students
const mockStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    school: "Eco High School",
    grade: "10th Grade",
    lastActive: "Today",
    pendingMissions: 2,
    completedMissions: 15,
    progress: {
      eco: 70,
      eq: 50,
      values: 85
    }
  },
  {
    id: "2",
    name: "Jamie Smith",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
    school: "Green Future Institute",
    grade: "11th Grade",
    lastActive: "Yesterday",
    pendingMissions: 0,
    completedMissions: 22,
    progress: {
      eco: 85,
      eq: 75,
      values: 60
    }
  },
  {
    id: "3",
    name: "Casey Wilson",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
    school: "Sustainable Academy",
    grade: "9th Grade",
    lastActive: "2 days ago",
    pendingMissions: 1,
    completedMissions: 10,
    progress: {
      eco: 40,
      eq: 65,
      values: 55
    }
  },
  {
    id: "4",
    name: "Riley Brown",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
    school: "Earth Institute",
    grade: "12th Grade",
    lastActive: "3 days ago",
    pendingMissions: 3,
    completedMissions: 8,
    progress: {
      eco: 55,
      eq: 80,
      values: 45
    }
  },
  {
    id: "5",
    name: "Taylor Lee",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
    school: "Eco High School",
    grade: "11th Grade",
    lastActive: "5 days ago",
    pendingMissions: 0,
    completedMissions: 18,
    progress: {
      eco: 90,
      eq: 45,
      values: 70
    }
  },
];

const Students: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">My Students</h1>
          <p className="text-muted-foreground">Manage and track your students' progress</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Message All
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..." 
          className="pl-8 max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending Missions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.profileImg} />
                        <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{student.name}</CardTitle>
                        <CardDescription>{student.school} • {student.grade}</CardDescription>
                      </div>
                    </div>
                    {student.pendingMissions > 0 && (
                      <div className="bg-amber-100 text-amber-800 text-xs font-medium py-1 px-2 rounded-full">
                        {student.pendingMissions} pending
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 flex justify-between">
                      <span>Last active: {student.lastActive}</span>
                      <span>{student.completedMissions} missions completed</span>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Eco Knowledge</span>
                        <span>{student.progress.eco}%</span>
                      </div>
                      <Progress value={student.progress.eco} className="h-1.5" indicatorClassName="bg-liferoot-green" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Emotional Intelligence</span>
                        <span>{student.progress.eq}%</span>
                      </div>
                      <Progress value={student.progress.eq} className="h-1.5" indicatorClassName="bg-liferoot-blue" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Value System</span>
                        <span>{student.progress.values}%</span>
                      </div>
                      <Progress value={student.progress.values} className="h-1.5" indicatorClassName="bg-liferoot-yellow" />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/mentor/messages/${student.id}`)}
                    >
                      Message
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/mentor/student/${student.id}`)}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents
              .filter(student => student.lastActive === "Today" || student.lastActive === "Yesterday")
              .map((student) => (
                <Card key={student.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.profileImg} />
                          <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{student.name}</CardTitle>
                          <CardDescription>{student.school} • {student.grade}</CardDescription>
                        </div>
                      </div>
                      {student.pendingMissions > 0 && (
                        <div className="bg-amber-100 text-amber-800 text-xs font-medium py-1 px-2 rounded-full">
                          {student.pendingMissions} pending
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Same content as in the "all" tab */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 flex justify-between">
                        <span>Last active: {student.lastActive}</span>
                        <span>{student.completedMissions} missions completed</span>
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Progress bars - same as in the "all" tab */}
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Eco Knowledge</span>
                          <span>{student.progress.eco}%</span>
                        </div>
                        <Progress value={student.progress.eco} className="h-1.5" indicatorClassName="bg-liferoot-green" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Emotional Intelligence</span>
                          <span>{student.progress.eq}%</span>
                        </div>
                        <Progress value={student.progress.eq} className="h-1.5" indicatorClassName="bg-liferoot-blue" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Value System</span>
                          <span>{student.progress.values}%</span>
                        </div>
                        <Progress value={student.progress.values} className="h-1.5" indicatorClassName="bg-liferoot-yellow" />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/mentor/messages/${student.id}`)}
                      >
                        Message
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/mentor/student/${student.id}`)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents
              .filter(student => student.pendingMissions > 0)
              .map((student) => (
                <Card key={student.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.profileImg} />
                          <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{student.name}</CardTitle>
                          <CardDescription>{student.school} • {student.grade}</CardDescription>
                        </div>
                      </div>
                      <div className="bg-amber-100 text-amber-800 text-xs font-medium py-1 px-2 rounded-full">
                        {student.pendingMissions} pending
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Same content structure as other tabs */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 flex justify-between">
                        <span>Last active: {student.lastActive}</span>
                        <span>{student.completedMissions} missions completed</span>
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Progress bars - same as in other tabs */}
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Eco Knowledge</span>
                          <span>{student.progress.eco}%</span>
                        </div>
                        <Progress value={student.progress.eco} className="h-1.5" indicatorClassName="bg-liferoot-green" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Emotional Intelligence</span>
                          <span>{student.progress.eq}%</span>
                        </div>
                        <Progress value={student.progress.eq} className="h-1.5" indicatorClassName="bg-liferoot-blue" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Value System</span>
                          <span>{student.progress.values}%</span>
                        </div>
                        <Progress value={student.progress.values} className="h-1.5" indicatorClassName="bg-liferoot-yellow" />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/mentor/messages/${student.id}`)}
                      >
                        Message
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/mentor/student/${student.id}`)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Students;

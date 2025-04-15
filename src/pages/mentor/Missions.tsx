
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Plus, 
  Leaf, 
  Brain, 
  Heart, 
  CheckCircle, 
  Clock, 
  MoreHorizontal 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for missions
const mockMissions = [
  {
    id: "1",
    title: "Reduce Food Waste",
    description: "Track and reduce your household food waste for one week",
    category: "eco",
    icon: Leaf,
    difficulty: "medium",
    points: 50,
    completionRate: 70,
    status: "active",
    studentsAssigned: 12,
    studentsCompleted: 8,
    createdAt: "2023-03-15"
  },
  {
    id: "2",
    title: "Daily Mindfulness",
    description: "Complete 5 minutes of mindfulness exercises for 10 days",
    category: "eq",
    icon: Brain,
    difficulty: "easy",
    points: 30,
    completionRate: 85,
    status: "active",
    studentsAssigned: 15,
    studentsCompleted: 13,
    createdAt: "2023-03-01"
  },
  {
    id: "3",
    title: "Help Someone In Need",
    description: "Identify someone who needs help and assist them",
    category: "values",
    icon: Heart,
    difficulty: "easy",
    points: 40,
    completionRate: 65,
    status: "active",
    studentsAssigned: 15,
    studentsCompleted: 10,
    createdAt: "2023-02-20"
  },
  {
    id: "4",
    title: "Carbon Footprint Audit",
    description: "Calculate and analyze your household's carbon footprint",
    category: "eco",
    icon: Leaf,
    difficulty: "hard",
    points: 70,
    completionRate: 40,
    status: "draft",
    studentsAssigned: 0,
    studentsCompleted: 0,
    createdAt: "2023-04-05"
  },
  {
    id: "5",
    title: "Emotional Awareness Journal",
    description: "Track and reflect on your emotions for 14 days",
    category: "eq",
    icon: Brain,
    difficulty: "medium",
    points: 50,
    completionRate: 55,
    status: "active",
    studentsAssigned: 10,
    studentsCompleted: 5,
    createdAt: "2023-03-10"
  },
  {
    id: "6",
    title: "Community Service Project",
    description: "Complete 3 hours of service in your local community",
    category: "values",
    icon: Heart,
    difficulty: "hard",
    points: 80,
    completionRate: 30,
    status: "active",
    studentsAssigned: 8,
    studentsCompleted: 2,
    createdAt: "2023-03-25"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "eco": return "bg-liferoot-green text-white";
    case "eq": return "bg-liferoot-blue text-white";
    case "values": return "bg-liferoot-yellow text-black";
    default: return "bg-gray-200 text-gray-700";
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy": return "bg-green-100 text-green-800";
    case "medium": return "bg-blue-100 text-blue-800";
    case "hard": return "bg-amber-100 text-amber-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const Missions: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  
  const filteredMissions = mockMissions.filter(mission => {
    const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         mission.description.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = categoryFilter ? mission.category === categoryFilter : true;
    const matchesStatus = statusFilter ? mission.status === statusFilter : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Missions</h1>
          <p className="text-muted-foreground">Create and manage student missions</p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={() => navigate("/mentor/missions/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Mission
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search missions..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-[180px]">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="eco">Eco</SelectItem>
              <SelectItem value="eq">EQ</SelectItem>
              <SelectItem value="values">Values</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-[180px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Missions</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions.map((mission) => (
              <Card key={mission.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className={`p-2 rounded-full ${getCategoryColor(mission.category)}`}>
                      <mission.icon className="h-4 w-4" />
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(mission.difficulty)}>
                      {mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1)}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2">{mission.title}</CardTitle>
                  <CardDescription>{mission.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <div className={`px-2 py-0.5 rounded-full text-xs ${getCategoryColor(mission.category)}`}>
                      {mission.category === "eco" ? "Eco" : mission.category === "eq" ? "Emotional Intelligence" : "Values"}
                    </div>
                    <div className="px-2 py-0.5 rounded-full text-xs bg-liferoot-earth-light text-liferoot-earth-dark">
                      {mission.points} points
                    </div>
                    {mission.status === "draft" && (
                      <div className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
                        Draft
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-xs">
                      <span>Completion rate</span>
                      <span>{mission.completionRate}%</span>
                    </div>
                    <Progress value={mission.completionRate} className="h-1.5" />
                  </div>

                  <div className="text-sm text-muted-foreground mb-1 flex justify-between">
                    <span>{mission.studentsCompleted}/{mission.studentsAssigned} students</span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-sm"
                      onClick={() => navigate(`/mentor/missions/${mission.id}`)}
                    >
                      View Details
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit mission</DropdownMenuItem>
                        <DropdownMenuItem>Assign students</DropdownMenuItem>
                        <DropdownMenuItem>View submissions</DropdownMenuItem>
                        {mission.status === "draft" ? (
                          <DropdownMenuItem>Publish</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>Unpublish</DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions
              .filter(mission => mission.status === "active")
              .map((mission) => (
                <Card key={mission.id} className="hover:shadow-md transition-shadow">
                  {/* Same content structure as in the "all" tab */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className={`p-2 rounded-full ${getCategoryColor(mission.category)}`}>
                        <mission.icon className="h-4 w-4" />
                      </div>
                      <Badge variant="outline" className={getDifficultyColor(mission.difficulty)}>
                        {mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{mission.title}</CardTitle>
                    <CardDescription>{mission.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <div className={`px-2 py-0.5 rounded-full text-xs ${getCategoryColor(mission.category)}`}>
                        {mission.category === "eco" ? "Eco" : mission.category === "eq" ? "Emotional Intelligence" : "Values"}
                      </div>
                      <div className="px-2 py-0.5 rounded-full text-xs bg-liferoot-earth-light text-liferoot-earth-dark">
                        {mission.points} points
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Completion rate</span>
                        <span>{mission.completionRate}%</span>
                      </div>
                      <Progress value={mission.completionRate} className="h-1.5" />
                    </div>

                    <div className="text-sm text-muted-foreground mb-1 flex justify-between">
                      <span>{mission.studentsCompleted}/{mission.studentsAssigned} students</span>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-sm"
                        onClick={() => navigate(`/mentor/missions/${mission.id}`)}
                      >
                        View Details
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit mission</DropdownMenuItem>
                          <DropdownMenuItem>Assign students</DropdownMenuItem>
                          <DropdownMenuItem>View submissions</DropdownMenuItem>
                          <DropdownMenuItem>Unpublish</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions
              .filter(mission => mission.status === "draft")
              .map((mission) => (
                <Card key={mission.id} className="hover:shadow-md transition-shadow">
                  {/* Same content structure as in the "all" tab */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className={`p-2 rounded-full ${getCategoryColor(mission.category)}`}>
                        <mission.icon className="h-4 w-4" />
                      </div>
                      <Badge variant="outline" className={getDifficultyColor(mission.difficulty)}>
                        {mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{mission.title}</CardTitle>
                    <CardDescription>{mission.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <div className={`px-2 py-0.5 rounded-full text-xs ${getCategoryColor(mission.category)}`}>
                        {mission.category === "eco" ? "Eco" : mission.category === "eq" ? "Emotional Intelligence" : "Values"}
                      </div>
                      <div className="px-2 py-0.5 rounded-full text-xs bg-liferoot-earth-light text-liferoot-earth-dark">
                        {mission.points} points
                      </div>
                      <div className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
                        Draft
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-sm"
                        onClick={() => navigate(`/mentor/missions/${mission.id}/edit`)}
                      >
                        Edit Draft
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit mission</DropdownMenuItem>
                          <DropdownMenuItem>Preview</DropdownMenuItem>
                          <DropdownMenuItem>Publish</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default Missions;

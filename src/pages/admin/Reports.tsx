
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Calendar, Filter } from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for the reports
const mockEngagementData = [
  { month: "Jan", students: 65, mentors: 12, completedMissions: 85 },
  { month: "Feb", students: 78, mentors: 15, completedMissions: 110 },
  { month: "Mar", students: 90, mentors: 18, completedMissions: 150 },
  { month: "Apr", students: 120, mentors: 20, completedMissions: 200 },
  { month: "May", students: 100, mentors: 19, completedMissions: 180 },
  { month: "Jun", students: 145, mentors: 22, completedMissions: 250 },
];

const mockMissionTypeData = [
  { name: "Eco Missions", value: 40, color: "#4CAF50" },
  { name: "EQ Missions", value: 35, color: "#42A5F5" },
  { name: "Values Missions", value: 25, color: "#FFEE58" },
];

const mockSchoolEngagementData = [
  { name: "Eco High School", missions: 145, students: 45 },
  { name: "Green Future Institute", missions: 120, students: 30 },
  { name: "Sustainable Academy", missions: 90, students: 25 },
  { name: "Earth Institute", missions: 85, students: 20 },
  { name: "LifeRoot Academy", missions: 70, students: 15 },
];

const Reports: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState("6months");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Analytics and insights about platform usage</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="engagement">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>
                Platform user engagement trends over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="students" name="Students" stroke="#4CAF50" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="mentors" name="Mentors" stroke="#42A5F5" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="completedMissions" name="Completed Missions" stroke="#FFEE58" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mission Type Distribution</CardTitle>
                <CardDescription>
                  Distribution of missions by category
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
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mission Completion Rate</CardTitle>
                <CardDescription>
                  Monthly mission completion statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completedMissions" name="Completed Missions" fill="#4CAF50" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schools" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>School Engagement</CardTitle>
              <CardDescription>
                Comparison of engagement metrics across schools
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockSchoolEngagementData}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" name="Active Students" fill="#42A5F5" />
                  <Bar dataKey="missions" name="Completed Missions" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;

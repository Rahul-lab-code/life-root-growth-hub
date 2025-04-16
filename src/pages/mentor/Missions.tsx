
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useLiferootAPI } from "@/hooks/useLiferootAPI";
import { toast } from "@/components/ui/sonner";

interface Mission {
  id: string;
  title: string;
  description: string;
  type: string;
  status: 'active' | 'completed';
  createdAt: string;
}

const Missions = () => {
  const navigate = useNavigate();
  const [missionType, setMissionType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { useFetch } = useLiferootAPI();

  // Fetch missions using the API
  const { data: missions, isLoading, error } = useFetch<Mission[]>('/api/mentor/missions', []);

  // Filter missions based on type and search query
  const filteredMissions = missions?.filter(mission => {
    const matchesType = missionType === "all" || mission.type === missionType;
    const matchesSearch = mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mission.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Missions</h1>
          <p className="text-muted-foreground">Create and manage learning missions</p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={() => navigate("/mentor/missions/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Mission
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Missions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search missions..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={missionType} onValueChange={setMissionType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="eco">Eco Missions</SelectItem>
                <SelectItem value="eq">EQ Missions</SelectItem>
                <SelectItem value="values">Values Missions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading missions...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">
              <p>Error loading missions. Please try again.</p>
            </div>
          ) : filteredMissions?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No missions found. Create your first mission using the button above.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredMissions?.map((mission) => (
                <Card key={mission.id} className="cursor-pointer hover:bg-accent/50" 
                      onClick={() => navigate(`/mentor/missions/${mission.id}/edit`)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{mission.title}</h3>
                        <p className="text-sm text-muted-foreground">{mission.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Created: {new Date(mission.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Missions;

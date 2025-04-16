
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const Missions = () => {
  const navigate = useNavigate();
  const [missionType, setMissionType] = useState<string | undefined>(undefined);

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
              <Input placeholder="Search missions..." className="pl-8" />
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

          <div className="text-center py-8 text-muted-foreground">
            No missions found. Create your first mission using the button above.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Missions;

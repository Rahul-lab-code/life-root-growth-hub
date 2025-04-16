
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MissionsCreate = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/mentor/missions")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Missions
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create New Mission</h1>
          <p className="text-muted-foreground">Design a new learning mission</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mission Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input id="title" placeholder="Enter mission title" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">Mission Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select mission type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eco">Eco Mission</SelectItem>
                <SelectItem value="eq">EQ Mission</SelectItem>
                <SelectItem value="values">Values Mission</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea id="description" placeholder="Enter mission description" className="min-h-[100px]" />
          </div>

          <div className="space-y-2">
            <label htmlFor="objectives" className="text-sm font-medium">Learning Objectives</label>
            <Textarea id="objectives" placeholder="Enter learning objectives" className="min-h-[100px]" />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate("/mentor/missions")}>Cancel</Button>
            <Button>Create Mission</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissionsCreate;

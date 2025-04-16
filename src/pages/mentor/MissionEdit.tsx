import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLiferootAPI } from "@/hooks/useLiferootAPI";
import { toast } from "@/components/ui/sonner";

interface MissionData {
  title: string;
  description: string;
  type: string;
  objectives: string;
  timeEstimate: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const MissionEdit = () => {
  const navigate = useNavigate();
  const { missionId } = useParams();
  const { get, put, delete: deleteMission } = useLiferootAPI();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MissionData>({
    title: '',
    description: '',
    type: '',
    objectives: '',
    timeEstimate: '',
    points: 0,
    difficulty: 'medium',
  });

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const data = await get(`/api/mentor/missions/${missionId}`);
        setFormData(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load mission details",
          variant: "destructive",
        });
        navigate("/mentor/missions");
      } finally {
        setIsLoading(false);
      }
    };

    if (missionId) {
      fetchMission();
    }
  }, [missionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await put(`/api/mentor/missions/${missionId}`, formData);
      
      toast({
        title: "Mission updated",
        description: "Your changes have been saved successfully.",
      });
      navigate("/mentor/missions");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update mission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this mission?")) {
      return;
    }

    try {
      await deleteMission(`/api/mentor/missions/${missionId}`);
      
      toast({
        title: "Mission deleted",
        description: "The mission has been deleted successfully.",
      });
      navigate("/mentor/missions");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete mission. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof MissionData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading mission details...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/mentor/missions")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Missions
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Mission</h1>
          <p className="text-muted-foreground">Modify mission details</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mission Details</CardTitle>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
          >
            Delete Mission
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input id="title" defaultValue="Example Mission Title" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">Mission Type</label>
              <Select defaultValue="eco">
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
              <Textarea 
                id="description" 
                defaultValue="Example mission description"
                className="min-h-[100px]" 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="objectives" className="text-sm font-medium">Learning Objectives</label>
              <Textarea 
                id="objectives" 
                defaultValue="Example learning objectives"
                className="min-h-[100px]" 
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => navigate("/mentor/missions")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissionEdit;

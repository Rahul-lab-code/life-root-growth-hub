import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
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

const MissionsCreate = () => {
  const navigate = useNavigate();
  const { post } = useLiferootAPI();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await post('/api/mentor/missions', formData);
      
      toast({
        title: "Mission created",
        description: "Your mission has been created successfully.",
      });
      navigate("/mentor/missions");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create mission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof MissionData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input 
                  id="title" 
                  placeholder="Enter mission title" 
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">Mission Type</label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleInputChange('type', value)}
                >
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
                <Textarea id="description" placeholder="Enter mission description" className="min-h-[100px]" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="objectives" className="text-sm font-medium">Learning Objectives</label>
                <Textarea id="objectives" placeholder="Enter learning objectives" className="min-h-[100px]" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="difficulty" className="text-sm font-medium">Difficulty</label>
                <Select 
                  value={formData.difficulty} 
                  onValueChange={(value: 'easy' | 'medium' | 'hard') => handleInputChange('difficulty', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="points" className="text-sm font-medium">Points</label>
                <Input 
                  id="points" 
                  type="number" 
                  placeholder="Enter points value" 
                  value={formData.points}
                  onChange={(e) => handleInputChange('points', parseInt(e.target.value))}
                  required 
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => navigate("/mentor/missions")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Mission"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissionsCreate;

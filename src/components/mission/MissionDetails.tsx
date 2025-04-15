
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Leaf, Brain, Heart, Upload, Clock, Award, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

interface MissionDetailsProps {
  mission: {
    id: string;
    title: string;
    description: string;
    category: "eco" | "eq" | "values";
    difficulty: "easy" | "medium" | "hard";
    timeEstimate: string;
    points: number;
    progress?: number;
    daysLeft?: number;
    isCompleted?: boolean;
    steps?: {
      id: string;
      title: string;
      description: string;
      isCompleted: boolean;
    }[];
    reflection?: {
      question: string;
      hint?: string;
    };
  };
}

const MissionDetails: React.FC<MissionDetailsProps> = ({ mission }) => {
  const [activeTab, setActiveTab] = useState<string>("details");
  const [reflectionText, setReflectionText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const navigate = useNavigate();

  const getCategoryIcon = () => {
    switch (mission.category) {
      case "eco":
        return <Leaf className="h-5 w-5 text-liferoot-green" />;
      case "eq":
        return <Brain className="h-5 w-5 text-liferoot-blue" />;
      case "values":
        return <Heart className="h-5 w-5 text-liferoot-yellow-dark" />;
    }
  };

  const getCategoryColor = () => {
    switch (mission.category) {
      case "eco":
        return "bg-liferoot-green";
      case "eq":
        return "bg-liferoot-blue";
      case "values":
        return "bg-liferoot-yellow";
    }
  };

  const getDifficultyLabel = () => {
    switch (mission.difficulty) {
      case "easy":
        return "Easy";
      case "medium":
        return "Medium";
      case "hard":
        return "Challenging";
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      
      // Simulate file upload to backend
      // TODO: Replace with actual file upload API call
      // API endpoint: POST /api/mission/evidence
      // Request body: FormData with file and missionId
      
      setTimeout(() => {
        const newUploadedFiles = Array.from(e.target.files || []).map(
          file => URL.createObjectURL(file)
        );
        setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
        setIsUploading(false);
        
        toast.success("Evidence uploaded successfully");
      }, 1500);
    }
  };

  const handleSubmitReflection = () => {
    if (!reflectionText.trim()) {
      toast.error("Please enter your reflection before submitting");
      return;
    }
    
    // TODO: Send reflection to backend
    // API endpoint: POST /api/mission/reflection
    // Request body: { missionId: mission.id, reflection: reflectionText }
    
    toast.success("Reflection submitted successfully");
    setActiveTab("evidence");
  };

  const handleCompleteMission = () => {
    // TODO: Send completion request to backend
    // API endpoint: PUT /api/mission/{missionId}/complete
    // Request body: { missionId: mission.id }
    
    toast.success("Mission completed! You earned " + mission.points + " points!");
    
    // Redirect back to mission list after short delay
    setTimeout(() => {
      navigate(`/student/missions/${mission.category}`);
    }, 2000);
  };

  // Generate mock steps if not provided
  const steps = mission.steps || [
    {
      id: "1",
      title: "Step 1: Get started",
      description: "Begin by understanding the mission objectives",
      isCompleted: true
    },
    {
      id: "2",
      title: "Step 2: Take action",
      description: "Complete the key activities for this mission",
      isCompleted: mission.progress ? mission.progress > 50 : false
    },
    {
      id: "3",
      title: "Step 3: Reflect and submit",
      description: "Document your experience and submit evidence",
      isCompleted: mission.progress ? mission.progress > 90 : false
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <div className={`${getCategoryColor()} w-fit p-2 rounded-full mb-2`}>
                {getCategoryIcon()}
              </div>
              <CardTitle className="text-2xl">{mission.title}</CardTitle>
              <CardDescription>{mission.description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">
                Difficulty: <span className="font-medium">{getDifficultyLabel()}</span>
              </div>
              <div className="text-sm text-muted-foreground mb-1">
                Time: <span className="font-medium">{mission.timeEstimate}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Points: <span className="font-medium text-liferoot-green">{mission.points}</span>
              </div>
            </div>
          </div>
          
          {mission.progress !== undefined && !mission.isCompleted && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{mission.progress}%</span>
              </div>
              <Progress 
                value={mission.progress} 
                className="h-2"
                indicatorClassName={getCategoryColor()}
              />
              {mission.daysLeft !== undefined && (
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{mission.daysLeft} {mission.daysLeft === 1 ? 'day' : 'days'} left</span>
                </div>
              )}
            </div>
          )}
          
          {mission.isCompleted && (
            <div className="mt-4 flex items-center text-liferoot-green">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Mission Completed</span>
            </div>
          )}
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="px-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reflection">Reflection</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
          </TabsList>
          
          <CardContent>
            <TabsContent value="details" className="pt-4 pb-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Mission Steps</h3>
                  <div className="space-y-4">
                    {steps.map((step) => (
                      <div key={step.id} className="flex">
                        <div className={`mt-1 p-1 rounded-full ${step.isCompleted ? "bg-liferoot-green" : "bg-muted"}`}>
                          <CheckCircle className={`h-4 w-4 ${step.isCompleted ? "text-white" : "text-muted-foreground"}`} />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-base font-medium">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">What You'll Learn</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center bg-muted p-3 rounded-lg">
                      <Award className="h-5 w-5 text-liferoot-yellow-dark mr-2" />
                      <span className="text-sm">Practical sustainability skills</span>
                    </div>
                    <div className="flex items-center bg-muted p-3 rounded-lg">
                      <Award className="h-5 w-5 text-liferoot-blue mr-2" />
                      <span className="text-sm">Environmental impact awareness</span>
                    </div>
                    <div className="flex items-center bg-muted p-3 rounded-lg">
                      <Award className="h-5 w-5 text-liferoot-green mr-2" />
                      <span className="text-sm">Problem-solving abilities</span>
                    </div>
                    <div className="flex items-center bg-muted p-3 rounded-lg">
                      <Award className="h-5 w-5 text-liferoot-earth mr-2" />
                      <span className="text-sm">Community engagement</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reflection" className="pt-4 pb-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Reflect on Your Experience</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {mission.reflection?.question || "What did you learn from this mission? How did it change your perspective?"}
                  </p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reflection">Your Reflection</Label>
                    <Textarea 
                      id="reflection"
                      placeholder="Share your thoughts and learning moments..."
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      rows={6}
                    />
                    {mission.reflection?.hint && (
                      <p className="text-xs italic text-muted-foreground">
                        Tip: {mission.reflection.hint}
                      </p>
                    )}
                  </div>
                </div>
                
                <Button onClick={handleSubmitReflection}>
                  Submit Reflection
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="evidence" className="pt-4 pb-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Upload Evidence</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload photos, videos, or documents that show your mission progress
                  </p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="evidence">Add Files</Label>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                        <p className="text-sm mb-2">Drag files here or click to browse</p>
                        <Input
                          id="evidence"
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                          multiple
                          accept="image/*,video/*,.pdf,.doc,.docx"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => document.getElementById("evidence")?.click()}
                          disabled={isUploading}
                        >
                          {isUploading ? "Uploading..." : "Select Files"}
                        </Button>
                      </div>
                      
                      {uploadedFiles.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                              <img src={file} alt="Evidence" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCompleteMission}
                  disabled={uploadedFiles.length === 0}
                  className={`${getCategoryColor()} hover:bg-opacity-90`}
                >
                  Complete Mission
                </Button>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
        
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => navigate(`/student/missions/${mission.category}`)}
          >
            Back to Mission List
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MissionDetails;

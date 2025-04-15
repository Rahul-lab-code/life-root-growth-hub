
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MissionDetails from "@/components/mission/MissionDetails";
import MissionSubmission from "@/components/mission/MissionSubmission";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for a single mission
const getMockMission = (id: string, category: string) => {
  // This would normally come from an API call
  // API endpoint: GET /api/missions/{missionId}
  
  const mockMission = {
    id,
    title: category === "eco" ? "Reduce Food Waste" : 
           category === "eq" ? "Daily Mindfulness" : "Help Someone In Need",
    description: category === "eco" ? "Track your food waste for 7 days and reduce it by 20%" :
                 category === "eq" ? "Complete 5 minutes of mindfulness exercises for 10 days" :
                 "Identify someone who needs help and assist them",
    category: category as "eco" | "eq" | "values",
    difficulty: "medium" as const,
    timeEstimate: "1 week",
    points: 50,
    progress: 30,
    daysLeft: 5,
    isCompleted: false,
    steps: [
      {
        id: "1",
        title: "Step 1: Observe and track",
        description: "Document your current patterns for 3 days",
        isCompleted: true
      },
      {
        id: "2",
        title: "Step 2: Implement changes",
        description: "Apply the suggested strategies for improvement",
        isCompleted: false
      },
      {
        id: "3",
        title: "Step 3: Reflect and report",
        description: "Compare before and after, document your impact",
        isCompleted: false
      }
    ],
    reflection: {
      question: category === "eco" ? "How did tracking your waste change your awareness and behavior?" :
                category === "eq" ? "How did regular mindfulness practice affect your daily emotions?" :
                "What did you learn about yourself by helping someone else?",
      hint: "Think about both the practical changes and how your mindset shifted."
    }
  };
  
  return mockMission;
};

const MissionDetail: React.FC = () => {
  const { missionId, category } = useParams<{ missionId: string, category: string }>();
  const [mission, setMission] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  
  useEffect(() => {
    if (!missionId || !category) return;
    
    // This would normally be an API call
    // API endpoint: GET /api/missions/{missionId}
    // Replace with actual backend call
    
    const fetchMission = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockMission = getMockMission(missionId, category);
        setMission(mockMission);
        setIsLoading(false);
      }, 500);
    };
    
    fetchMission();
  }, [missionId, category]);

  const handleSubmitMission = async (data: { reflection: string, evidence: File[] }) => {
    try {
      // This would be the real API call
      // API endpoint: POST /api/missions/{missionId}/submit
      // Request body: { reflection: data.reflection, evidence: data.evidence }
      console.log("Submitting mission:", { missionId, ...data });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Mission submitted successfully!",
        description: "Your mentor will review your submission soon.",
      });
      
      // Update mission progress
      setMission(prev => ({
        ...prev,
        progress: 100,
        steps: prev.steps.map((step: any) => ({ ...step, isCompleted: true })),
      }));
      
      setActiveTab("details");
    } catch (error) {
      console.error("Error submitting mission:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your mission. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!currentUser) return null;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse">Loading mission details...</div>
      </div>
    );
  }
  
  if (!mission) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold">Mission not found</h2>
        <p className="text-muted-foreground">The mission you're looking for doesn't exist or has been archived.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Mission Details</TabsTrigger>
          <TabsTrigger value="submit">Submit Mission</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <MissionDetails mission={mission} />
        </TabsContent>
        
        <TabsContent value="submit">
          <MissionSubmission 
            missionId={mission.id}
            reflectionQuestion={mission.reflection.question}
            reflectionHint={mission.reflection.hint}
            onSubmit={handleSubmitMission}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MissionDetail;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MissionDetails from "@/components/mission/MissionDetails";
import { useToast } from "@/components/ui/use-toast";

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
  
  return <MissionDetails mission={mission} />;
};

export default MissionDetail;

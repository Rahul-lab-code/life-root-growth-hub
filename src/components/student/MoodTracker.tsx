
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Meh, Frown, ThumbsUp } from "lucide-react";

type Mood = "great" | "okay" | "bad" | null;

interface MoodTrackerProps {
  onMoodSelected: (mood: Mood) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ onMoodSelected }) => {
  const [selectedMood, setSelectedMood] = useState<Mood>(null);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    onMoodSelected(mood);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
        <CardDescription>
          Your AI mentor Roo wants to know how you're doing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <Button 
            variant={selectedMood === "great" ? "default" : "outline"}
            className={`flex-1 mx-1 ${selectedMood === "great" ? "bg-liferoot-green" : ""}`}
            onClick={() => handleMoodSelect("great")}
          >
            <Smile className="mr-2 h-5 w-5" /> Great
          </Button>
          <Button 
            variant={selectedMood === "okay" ? "default" : "outline"}
            className={`flex-1 mx-1 ${selectedMood === "okay" ? "bg-liferoot-blue" : ""}`}
            onClick={() => handleMoodSelect("okay")}
          >
            <Meh className="mr-2 h-5 w-5" /> Okay
          </Button>
          <Button 
            variant={selectedMood === "bad" ? "default" : "outline"}
            className={`flex-1 mx-1 ${selectedMood === "bad" ? "bg-liferoot-yellow" : ""}`}
            onClick={() => handleMoodSelect("bad")}
          >
            <Frown className="mr-2 h-5 w-5" /> Not Great
          </Button>
        </div>
        
        {selectedMood && (
          <div className="mt-4 flex justify-center">
            <Button 
              variant="ghost" 
              className="text-liferoot-green"
              onClick={() => onMoodSelected(selectedMood)}
            >
              <ThumbsUp className="mr-2 h-4 w-4" /> 
              Thanks for sharing how you feel!
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;

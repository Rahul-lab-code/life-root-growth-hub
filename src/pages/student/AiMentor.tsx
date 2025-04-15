
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Heart, Leaf, MessageCircle, BookOpen } from "lucide-react";
import MoodTracker from "@/components/student/MoodTracker";
import MentorChat from "@/components/student/MentorChat";

type Mood = "great" | "okay" | "bad" | null;

const AiMentor: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  
  const handleMoodSelected = (mood: Mood) => {
    setSelectedMood(mood);
    
    // TODO: Save mood to backend
    // API endpoint: POST /api/student/mood
    // Request body: { userId: currentUser.id, mood, timestamp: new Date() }
  };
  
  const getMoodBasedMessage = () => {
    switch(selectedMood) {
      case "great":
        return "That's wonderful to hear! Since you're feeling great, maybe this is a good time to take on a new challenge or help someone else who might be struggling?";
      case "okay":
        return "Thanks for sharing. It's perfectly fine to have average days. Is there anything specific you'd like to talk about to make today a bit better?";
      case "bad":
        return "I'm sorry to hear you're not feeling great. Would you like to talk about what's bothering you? Or perhaps try a quick mindfulness exercise to help you feel better?";
      default:
        return "Hi there! I'm Roo, your AI mentor. How can I support your growth journey today?";
    }
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Meet Roo, Your AI Mentor</h1>
        <p className="text-muted-foreground">
          Your personal guide for sustainability, emotional growth, and ethical living
        </p>
      </div>

      <MoodTracker onMoodSelected={handleMoodSelected} />
      
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="chat" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" /> Chat with Roo
          </TabsTrigger>
          <TabsTrigger value="mind-gym" className="flex items-center gap-1">
            <Brain className="h-4 w-4" /> Mind Gym
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> Journal
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat">
          <MentorChat initialMessage={getMoodBasedMessage()} />
        </TabsContent>
        
        <TabsContent value="mind-gym">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="bg-liferoot-blue p-2 rounded-full w-fit mb-2">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <CardTitle>Guided Meditation</CardTitle>
                <CardDescription>
                  Take a moment to center yourself with guided meditation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose a meditation length:
                </p>
                <div className="flex gap-2">
                  {[5, 10, 15, 20].map(minutes => (
                    <button
                      key={minutes}
                      className="bg-muted hover:bg-accent px-3 py-1 rounded text-sm flex-1"
                      onClick={() => {
                        // TODO: Connect to meditation API or content
                        console.log(`Starting ${minutes}-minute meditation`);
                      }}
                    >
                      {minutes} min
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="bg-liferoot-green p-2 rounded-full w-fit mb-2">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <CardTitle>Breathing Exercise</CardTitle>
                <CardDescription>
                  Practice focused breathing to reduce stress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose a technique:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="bg-muted hover:bg-accent px-3 py-2 rounded text-sm"
                    onClick={() => {
                      // TODO: Implement breathing exercise
                      console.log("Starting box breathing");
                    }}
                  >
                    Box Breathing
                  </button>
                  <button
                    className="bg-muted hover:bg-accent px-3 py-2 rounded text-sm"
                    onClick={() => {
                      // TODO: Implement breathing exercise
                      console.log("Starting 4-7-8 breathing");
                    }}
                  >
                    4-7-8 Technique
                  </button>
                  <button
                    className="bg-muted hover:bg-accent px-3 py-2 rounded text-sm"
                    onClick={() => {
                      // TODO: Implement breathing exercise
                      console.log("Starting deep breathing");
                    }}
                  >
                    Deep Breathing
                  </button>
                  <button
                    className="bg-muted hover:bg-accent px-3 py-2 rounded text-sm"
                    onClick={() => {
                      // TODO: Implement breathing exercise
                      console.log("Starting alternate nostril");
                    }}
                  >
                    Alternate Nostril
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="bg-liferoot-yellow p-2 rounded-full w-fit mb-2">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <CardTitle>Today's Wellbeing Challenge</CardTitle>
                <CardDescription>
                  A daily activity to improve your emotional wellbeing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">
                  Write down three things you're grateful for today. They can be big things or small moments that brought you joy.
                </p>
                <div className="bg-muted p-4 rounded-md text-sm italic">
                  "Gratitude turns what we have into enough, and more. It turns denial into acceptance, chaos into order, confusion into clarity...it makes sense of our past, brings peace for today, and creates a vision for tomorrow."
                  <p className="text-right mt-2">– Melody Beattie</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="journal">
          <Card>
            <CardHeader>
              <CardTitle>Reflection Journal</CardTitle>
              <CardDescription>
                Document your thoughts, feelings, and growth moments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: Implement journal functionality with backend integration
                  API endpoints:
                  - GET /api/student/journal - Get all journal entries
                  - POST /api/student/journal - Create new journal entry
                  - PUT /api/student/journal/:id - Update journal entry
                  - DELETE /api/student/journal/:id - Delete journal entry
              */}
              <p className="text-center text-muted-foreground py-12">
                Journal feature coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiMentor;

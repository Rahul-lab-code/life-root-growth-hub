# LifeRoot Backend Integration Guide

This guide provides instructions on where to add useEffect hooks for API calls when integrating the frontend with a backend API.

## Authentication

### AuthContext.tsx

The authentication context already has the structure to integrate with a backend. You'll need to:

1. Replace the mock user data with real API calls:

```typescript
// In AuthContext.tsx - login function
const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    // Replace mock implementation with real API call
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid email or password');
    }
    
    const userData = await response.json();
    setCurrentUser(userData.user);
    localStorage.setItem("liferoot_user", JSON.stringify(userData.user));
    localStorage.setItem("liferoot_token", userData.token);
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${userData.user.name}!`,
    });

    // Redirect based on role
    const navigateBasedOnRole = (role: UserRole) => {
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "mentor") {
        navigate("/mentor/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    };

    navigateBasedOnRole(userData.user.role);
  } catch (error) {
    toast({
      title: "Login Failed",
      description: error instanceof Error ? error.message : "An error occurred",
      variant: "destructive",
    });
    throw error;
  } finally {
    setIsLoading(false);
  }
};

// Similarly update the logout function
const logout = async () => {
  // In a real app, this would include an API call to invalidate the session
  localStorage.removeItem("liferoot_user");
  localStorage.removeItem("liferoot_token");
  setCurrentUser(null);
  toast({
    title: "Logged Out",
    description: "You have been successfully logged out",
  });
  navigate("/login");
};
```

2. Add token verification on initial load:

```typescript
// In AuthContext.tsx - useEffect for auth persistence
useEffect(() => {
  const verifyToken = async () => {
    const token = localStorage.getItem("liferoot_token");
    const storedUser = localStorage.getItem("liferoot_user");
    
    if (!token || !storedUser) {
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Token verification failed');
      }
      
      const userData = await response.json();
      setCurrentUser(userData);
    } catch (error) {
      console.error("Auth verification failed:", error);
      localStorage.removeItem("liferoot_token");
      localStorage.removeItem("liferoot_user");
    } finally {
      setIsLoading(false);
    }
  };
  
  verifyToken();
}, []);
```

## Dashboard Pages

### Student Dashboard

In `src/pages/student/Dashboard.tsx`, add the following useEffect hooks:

```typescript
// Import the useLiferootAPI hook at the top
import { useLiferootAPI } from "@/hooks/useLiferootAPI";

// In the StudentDashboard component
const { useFetch } = useLiferootAPI();

// Fetch active missions
const { 
  data: activeMissions, 
  isLoading: missionsLoading 
} = useFetch('/missions?status=active', []);

// Fetch user stats
const { 
  data: userStats, 
  isLoading: statsLoading 
} = useFetch('/dashboard/stats', []);

// Use the data once loaded
useEffect(() => {
  if (activeMissions) {
    // Update state with the fetched missions
    setMissions(activeMissions);
  }
}, [activeMissions]);

useEffect(() => {
  if (userStats) {
    // Update state with the fetched stats
    setStats(userStats);
  }
}, [userStats]);
```

### Mentor Dashboard

In `src/pages/mentor/Dashboard.tsx`:

```typescript
// Import the useLiferootAPI hook
import { useLiferootAPI } from "@/hooks/useLiferootAPI";

// In the MentorDashboard component
const { useFetch } = useLiferootAPI();

// Fetch the mentor's students
const { 
  data: students, 
  isLoading: studentsLoading 
} = useFetch('/mentor/students', []);

// Fetch pending approvals
const { 
  data: pendingApprovals, 
  isLoading: approvalsLoading 
} = useFetch('/missions/pending-approval', []);

// Use the data once loaded
useEffect(() => {
  if (students) {
    setMentorStudents(students);
  }
}, [students]);

useEffect(() => {
  if (pendingApprovals) {
    setPendingMissionApprovals(pendingApprovals);
  }
}, [pendingApprovals]);
```

### Admin Dashboard

In `src/pages/admin/Dashboard.tsx`:

```typescript
// Import the useLiferootAPI hook
import { useLiferootAPI } from "@/hooks/useLiferootAPI";

// In the AdminDashboard component
const { useFetch } = useLiferootAPI();

// Fetch admin statistics
const { 
  data: adminStats, 
  isLoading: statsLoading 
} = useFetch('/admin/stats', []);

// Fetch activity data
const { 
  data: activityData, 
  isLoading: activityLoading 
} = useFetch('/admin/activity', []);

// Use the data once loaded
useEffect(() => {
  if (adminStats) {
    setUserStats(adminStats);
  }
}, [adminStats]);

useEffect(() => {
  if (activityData) {
    setMockActivityData(activityData);
  }
}, [activityData]);
```

## Mission Pages

### MissionList.tsx

In `src/pages/student/MissionList.tsx`:

```typescript
// Import the useLiferootAPI hook
import { useLiferootAPI } from "@/hooks/useLiferootAPI";

// In the MissionList component
const { useFetch } = useLiferootAPI();
const { category } = useParams<{ category: string }>();

// Fetch missions based on the selected category
const { 
  data: missions, 
  isLoading: missionsLoading 
} = useFetch(`/missions?category=${category || 'eco'}`, [category]);

// Use the data once loaded
useEffect(() => {
  if (missions) {
    // You might need to transform the data to match your component's expectations
    setMockMissions({
      ...mockMissions,
      [category || 'eco']: missions
    });
  }
}, [missions, category]);
```

### MissionDetail.tsx

In `src/pages/student/MissionDetail.tsx`:

```typescript
// Import the useLiferootAPI hook
import { useLiferootAPI } from "@/hooks/useLiferootAPI";

// In the MissionDetail component
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
```

## Profile Pages

### StudentProfile.tsx

In `src/pages/student/Profile.tsx`:

```typescript
// Import the useLiferootAPI hook
import { useLiferootAPI } from "@/hooks/useLiferootAPI";

// In the StudentProfile component
const { useFetch } = useLiferootAPI();

// Fetch user profile and stats
const { 
  data: profileData, 
  isLoading: profileLoading 
} = useFetch('/student/profile', []);

const {
  data: statsData,
  isLoading: statsLoading
} = useFetch('/student/stats', []);

// Use the data once loaded
useEffect(() => {
  if (profileData && statsData) {
    setUserStats({
      ...statsData,
      ...mockUserStats // Fallback for any missing fields
    });
    setIsLoading(false);
  }
}, [profileData, statsData]);
```

## AI Mentor Page

### AiMentor.tsx

In `src/pages/student/AiMentor.tsx`:

```typescript
// Import the useLiferootAPI hook
import { useLiferootAPI } from "@/hooks/useLiferootAPI";

// In the AiMentor component
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Heart, Leaf, MessageCircle, BookOpen, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MoodTracker from "@/components/student/MoodTracker";
import MentorChat from "@/components/student/MentorChat";
import JournalEntry, { JournalEntryData } from "@/components/student/JournalEntry";

type Mood = "great" | "okay" | "bad" | null;

// Mock journal entries
const mockJournalEntries: JournalEntryData[] = [
  {
    id: "1",
    title: "First day of eco challenge",
    content: "Today I started tracking my food waste as part of the Reduce Food Waste mission. I was surprised at how much food I throw away without thinking about it. Going to be more mindful tomorrow.",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    mood: "motivated",
    tags: ["eco", "food waste"]
  },
  {
    id: "2",
    title: "Feeling stressed",
    content: "Had a tough day at school today. Tried the breathing exercises that Roo suggested, which helped a little. Still feeling overwhelmed with all the assignments due next week.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    mood: "stressed",
    tags: ["school", "eq"]
  }
];

const AiMentor: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntryData[]>(mockJournalEntries);
  const [showNewJournalEntry, setShowNewJournalEntry] = useState(false);
  const [currentJournalEntryId, setCurrentJournalEntryId] = useState<string | null>(null);
  
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

  const handleSaveJournalEntry = async (entry: JournalEntryData) => {
    try {
      // This is where we would make the API call to save the journal entry
      // API endpoint: POST /api/student/journal
      // or: PUT /api/student/journal/:id (if editing)
      // Request body: entry
      
      if (entry.id) {
        // Editing existing entry
        setJournalEntries(prev => 
          prev.map(item => item.id === entry.id ? entry : item)
        );
      } else {
        // Creating new entry
        const newEntry = {
          ...entry,
          id: `temp-${Date.now()}`, // In reality, this would come from the backend
        };
        setJournalEntries(prev => [newEntry, ...prev]);
      }
      
      setShowNewJournalEntry(false);
      setCurrentJournalEntryId(null);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error saving journal entry:", error);
      return Promise.reject(error);
    }
  };

  const handleDeleteJournalEntry = async (id: string) => {
    try {
      // This is where we would make the API call to delete the journal entry
      // API endpoint: DELETE /api/student/journal/:id
      
      setJournalEntries(prev => prev.filter(entry => entry.id !== id));
      return Promise.resolve();
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      return Promise.reject(error);
    }
  };

  const handleEditEntry = (id: string) => {
    setCurrentJournalEntryId(id);
    setShowNewJournalEntry(true);
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Reflection Journal</h2>
              <Button 
                onClick={() => {
                  setCurrentJournalEntryId(null);
                  setShowNewJournalEntry(!showNewJournalEntry);
                }}
              >
                {showNewJournalEntry ? "Cancel" : (
                  <>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Entry
                  </>
                )}
              </Button>
            </div>
            
            {showNewJournalEntry ? (
              <JournalEntry 
                initialData={
                  currentJournalEntryId 
                    ? journalEntries.find(entry => entry.id === currentJournalEntryId) 
                    : undefined
                }
                onSave={handleSaveJournalEntry}
                onDelete={handleDeleteJournalEntry}
              />
            ) : (
              journalEntries.length > 0 ? (
                <div className="space-y-4">
                  {journalEntries.map(entry => (
                    <Card key={entry.id} className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleEditEntry(entry.id as string)}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{entry.title}</CardTitle>
                          <div className="text-xs text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString()}
                          </div>
                        </div>
                        {entry.mood && (
                          <div className="text-sm text-muted-foreground">
                            Mood: {entry.mood}
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm line-clamp-3">
                          {entry.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground mb-4">No journal entries yet.</p>
                  <Button onClick={() => setShowNewJournalEntry(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Your First Entry
                  </Button>
                </div>
              )
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
```

## Soul Circles Page

### SoulCircles.tsx

In `src/pages/student/SoulCircles.tsx`:

```typescript
// Import the useLiferootAPI hook
import { useLiferootAPI } from "@/hooks/useLiferootAPI";

// In the SoulCircles component
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Send, Lock, Heart, MessageSquare, Flag } from "lucide-react";
import CreateSoulCirclePost, { SoulCirclePostData } from "@/components/community/CreateSoulCirclePost";

interface SoulCirclePost {
  id: string;
  title: string;
  content: string;
  category: "question" | "story" | "kindness" | "challenge";
  isAnonymous: boolean;
  author: {
    id: string;
    name: string;
    profileImg?: string;
  };
  createdAt: Date;
  likes: number;
  comments: {
    id: string;
    author: {
      id: string;
      name: string;
      profileImg?: string;
    };
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
  }[];
}

const mockPosts: SoulCirclePost[] = [
  {
    id: "1",
    title: "Dealing with Eco-Anxiety",
    content: "Hey everyone, I've been feeling really anxious about the state of the environment lately. Does anyone have tips for coping with eco-anxiety?",
    category: "question",
    isAnonymous: false,
    author: {
      id: "1",
      name: "Alex Johnson",
      profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 15,
    comments: [
      {
        id: "1",
        author: {
          id: "2",
          name: "Jamie Smith",
          profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie"
        },
        content: "I find that taking small, actionable steps helps a lot. Like reducing my plastic consumption or volunteering for local cleanups.",
        isAnonymous: false,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
      }
    ]
  },
  {
    id: "2",
    title: "Kindness Story",
    content: "I saw someone helping an elderly person cross the street today, it was so heartwarming!",
    category: "story",
    isAnonymous: true,
    author: {
      id: "3",
      name: "Anonymous",
    },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 8,
    comments: []
  }
];

const SoulCircles: React.FC = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<SoulCirclePost[]>(mockPosts);
  const [newComment, setNewComment] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { toast } = useToast();

  const handleSupportPost = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) {
      toast({
        title: "Missing comment",
        description: "Please enter a comment before submitting.",
        variant: "destructive"
      });
      return;
    }

    const newCommentObj = {
      id: `temp-${Date.now()}`,
      author: {
        id: currentUser?.id || "guest",
        name: currentUser?.name || "Guest",
        profileImg: currentUser?.profileImg
      },
      content: newComment,
      isAnonymous: false,
      createdAt: new Date()
    };

    setPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, newCommentObj] } : post
      )
    );

    setNewComment("");
  };

  const handleCreatePost = (newPost: SoulCirclePostData) => {
    const newPostObj: SoulCirclePost = {
      id: `temp-${Date.now()}`,
      ...newPost,
      author: {
        id: currentUser?.id || "guest",
        name: currentUser?.name || "Anonymous",
        profileImg: currentUser?.profileImg
      },
      createdAt: new Date(),
      likes: 0,
      comments: []
    };

    setPosts([newPostObj, ...posts]);
    setShowNewPostForm(false);
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Soul Circles</h1>
        <p className="text-muted-foreground">
          Connect with others, share your stories, and support each other's journeys
        </p>
      </div>

      {showNewPostForm ? (
        <CreateSoulCirclePost onSubmit={handleCreatePost} />
      ) : (
        <Card>
          <CardContent className="py-4">
            <Button onClick={() => setShowNewPostForm(true)} className="w-full">
              Share Your Thoughts
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post.id}>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {post.category === "question" && "Question"}
                    {post.category === "story" && "Story"}
                    {post.category === "kindness" && "Act of Kindness"}

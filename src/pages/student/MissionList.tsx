
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf, Brain, Heart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MissionCard from '@/components/mission/MissionCard';

// Mock data for missions
const mockMissions = {
  eco: [
    {
      id: '1',
      title: 'Reduce Food Waste',
      description: 'Track your food waste for 7 days and reduce it by 20%',
      category: 'eco' as const,
      difficulty: 'medium' as const,
      timeEstimate: '1 week',
      points: 50,
      progress: 30,
      daysLeft: 5,
    },
    {
      id: '2',
      title: 'Start Composting',
      description: 'Create a simple composting system at home',
      category: 'eco' as const,
      difficulty: 'easy' as const,
      timeEstimate: '2 days',
      points: 30,
    },
    {
      id: '3',
      title: 'Plastic Audit',
      description: 'Conduct a plastic audit of your home and identify areas for reduction',
      category: 'eco' as const,
      difficulty: 'hard' as const,
      timeEstimate: '3 days',
      points: 60,
    },
    {
      id: '4',
      title: 'Zero-Waste Week',
      description: 'Try to produce zero waste for an entire week',
      category: 'eco' as const,
      difficulty: 'hard' as const,
      timeEstimate: '1 week',
      points: 80,
    },
    {
      id: '5',
      title: 'Plant a Tree',
      description: 'Plant a native tree in your community',
      category: 'eco' as const,
      difficulty: 'medium' as const,
      timeEstimate: '1 day',
      points: 40,
      isCompleted: true,
    },
  ],
  eq: [
    {
      id: '1',
      title: 'Daily Mindfulness',
      description: 'Complete 5 minutes of mindfulness exercises for 10 days',
      category: 'eq' as const,
      difficulty: 'easy' as const,
      timeEstimate: '10 days',
      points: 40,
      progress: 60,
      daysLeft: 3,
    },
    {
      id: '2',
      title: 'Emotion Journal',
      description: 'Keep a journal of your emotions for one week',
      category: 'eq' as const,
      difficulty: 'medium' as const,
      timeEstimate: '1 week',
      points: 50,
    },
    {
      id: '3',
      title: 'Active Listening',
      description: 'Practice active listening in three different conversations',
      category: 'eq' as const,
      difficulty: 'medium' as const,
      timeEstimate: '3 days',
      points: 45,
    },
    {
      id: '4',
      title: 'Stress Management Plan',
      description: 'Create a personal stress management plan',
      category: 'eq' as const,
      difficulty: 'hard' as const,
      timeEstimate: '4 days',
      points: 70,
    },
  ],
  values: [
    {
      id: '1',
      title: 'Help Someone In Need',
      description: 'Identify someone who needs help and assist them',
      category: 'values' as const,
      difficulty: 'easy' as const,
      timeEstimate: '1 day',
      points: 30,
      isCompleted: true,
    },
    {
      id: '2',
      title: 'Gratitude Practice',
      description: 'Write down three things you are grateful for every day for a week',
      category: 'values' as const,
      difficulty: 'easy' as const,
      timeEstimate: '1 week',
      points: 35,
    },
    {
      id: '3',
      title: 'Community Service',
      description: 'Volunteer for a community service project',
      category: 'values' as const,
      difficulty: 'medium' as const,
      timeEstimate: '1 day',
      points: 50,
    },
    {
      id: '4',
      title: 'Ethical Decision Framework',
      description: 'Create a personal ethical decision-making framework',
      category: 'values' as const,
      difficulty: 'hard' as const,
      timeEstimate: '3 days',
      points: 65,
    },
  ],
};

const MissionList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = React.useState<string>(category || 'eco');
  
  if (!currentUser) return null;
  
  const getCategoryIcon = (categoryType: string) => {
    switch(categoryType) {
      case 'eco': return <Leaf className="h-5 w-5" />;
      case 'eq': return <Brain className="h-5 w-5" />;
      case 'values': return <Heart className="h-5 w-5" />;
      default: return <Leaf className="h-5 w-5" />;
    }
  };
  
  const getCategoryColor = (categoryType: string) => {
    switch(categoryType) {
      case 'eco': return 'text-liferoot-green';
      case 'eq': return 'text-liferoot-blue';
      case 'values': return 'text-liferoot-yellow-dark';
      default: return 'text-liferoot-green';
    }
  };
  
  const getCategoryTitle = (categoryType: string) => {
    switch(categoryType) {
      case 'eco': return 'Environmental Sustainability';
      case 'eq': return 'Emotional Intelligence';
      case 'values': return 'Ethical Values';
      default: return 'Missions';
    }
  };
  
  const getCategoryDescription = (categoryType: string) => {
    switch(categoryType) {
      case 'eco': return 'Take on eco-friendly challenges and make a real-world impact';
      case 'eq': return 'Develop emotional awareness and build resilience';
      case 'values': return 'Practice ethical behavior and strengthen your moral compass';
      default: return 'Complete missions to earn points and badges';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className={getCategoryColor(activeTab)}>
            {getCategoryIcon(activeTab)}
          </span>
          {getCategoryTitle(activeTab)} Missions
        </h1>
        <p className="text-muted-foreground">
          {getCategoryDescription(activeTab)}
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="eco" className="flex items-center gap-1">
              <Leaf className="h-4 w-4" /> Eco
            </TabsTrigger>
            <TabsTrigger value="eq" className="flex items-center gap-1">
              <Brain className="h-4 w-4" /> EQ
            </TabsTrigger>
            <TabsTrigger value="values" className="flex items-center gap-1">
              <Heart className="h-4 w-4" /> Values
            </TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
        
        <div className="mt-6">
          {/* Active missions section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">Active Missions</h2>
              <Badge variant="outline" className="text-muted-foreground">
                {mockMissions[activeTab as keyof typeof mockMissions]
                  .filter(m => m.progress !== undefined && !m.isCompleted).length} Active
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockMissions[activeTab as keyof typeof mockMissions]
                .filter(mission => mission.progress !== undefined && !mission.isCompleted)
                .map(mission => (
                  <MissionCard key={mission.id} mission={mission} />
                ))}
              
              {mockMissions[activeTab as keyof typeof mockMissions]
                .filter(mission => mission.progress !== undefined && !mission.isCompleted)
                .length === 0 && (
                  <div className="col-span-full text-center py-8 bg-muted rounded-lg">
                    <p className="text-muted-foreground">No active missions. Start a new one!</p>
                  </div>
                )}
            </div>
          </div>
          
          {/* Available missions section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">Available Missions</h2>
              <Badge variant="outline" className="text-muted-foreground">
                {mockMissions[activeTab as keyof typeof mockMissions]
                  .filter(m => m.progress === undefined && !m.isCompleted).length} Available
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockMissions[activeTab as keyof typeof mockMissions]
                .filter(mission => mission.progress === undefined && !m.isCompleted)
                .map((mission) => (
                  <MissionCard key={mission.id} mission={mission} />
                ))}
            </div>
          </div>
          
          {/* Completed missions section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">Completed Missions</h2>
              <Badge variant="outline" className="bg-liferoot-green/10 text-liferoot-green border-liferoot-green">
                {mockMissions[activeTab as keyof typeof mockMissions]
                  .filter(m => m.isCompleted).length} Completed
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockMissions[activeTab as keyof typeof mockMissions]
                .filter(mission => mission.isCompleted)
                .map((mission) => (
                  <MissionCard key={mission.id} mission={mission} />
                ))}
              
              {mockMissions[activeTab as keyof typeof mockMissions]
                .filter(mission => mission.isCompleted)
                .length === 0 && (
                  <div className="col-span-full text-center py-8 bg-muted rounded-lg">
                    <p className="text-muted-foreground">No completed missions yet. Start your journey!</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default MissionList;

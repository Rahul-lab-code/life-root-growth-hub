
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Leaf, Brain, Heart, Clock } from 'lucide-react';

interface MissionCardProps {
  mission: {
    id: string;
    title: string;
    description: string;
    category: 'eco' | 'eq' | 'values';
    difficulty: 'easy' | 'medium' | 'hard';
    timeEstimate: string;
    points: number;
    progress?: number;
    daysLeft?: number;
    isCompleted?: boolean;
  };
  variant?: 'default' | 'compact';
}

const MissionCard: React.FC<MissionCardProps> = ({ 
  mission, 
  variant = 'default'
}) => {
  const navigate = useNavigate();
  const isCompact = variant === 'compact';
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'eco': return <Leaf className="h-5 w-5" />;
      case 'eq': return <Brain className="h-5 w-5" />;
      case 'values': return <Heart className="h-5 w-5" />;
      default: return <Leaf className="h-5 w-5" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'eco': return 'bg-liferoot-green text-white';
      case 'eq': return 'bg-liferoot-blue text-white';
      case 'values': return 'bg-liferoot-yellow text-black';
      default: return 'bg-liferoot-green text-white';
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'border-liferoot-green text-liferoot-green';
      case 'medium': return 'border-liferoot-yellow-dark text-liferoot-yellow-dark';
      case 'hard': return 'border-destructive text-destructive';
      default: return 'border-muted-foreground text-muted-foreground';
    }
  };

  return (
    <Card className={`${mission.isCompleted ? 'border-liferoot-green border-2' : ''} transition-all duration-200 hover:shadow-hover`}>
      <CardHeader className={isCompact ? 'p-4 pb-2' : 'pb-2'}>
        <div className="flex justify-between items-start">
          <div className={`${getCategoryColor(mission.category)} p-2 rounded-full`}>
            {getCategoryIcon(mission.category)}
          </div>
          <div className="flex gap-2">
            {mission.isCompleted && (
              <Badge className="bg-liferoot-green">Completed</Badge>
            )}
            <Badge variant="outline" className={getDifficultyColor(mission.difficulty)}>
              {mission.difficulty}
            </Badge>
          </div>
        </div>
        <CardTitle className={`${isCompact ? 'text-lg' : 'text-xl'} mt-2`}>{mission.title}</CardTitle>
        <CardDescription>{mission.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{mission.timeEstimate}</span>
          </div>
          <div className="font-medium">{mission.points} pts</div>
        </div>
        
        {(mission.progress !== undefined) && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{mission.progress}%</span>
            </div>
            <Progress value={mission.progress} className="h-2" />
          </div>
        )}
        
        {(mission.daysLeft !== undefined && !mission.isCompleted) && (
          <div className="text-xs text-muted-foreground text-center">
            {mission.daysLeft > 0 ? (
              <span>{mission.daysLeft} days left to complete</span>
            ) : (
              <span className="text-destructive">Due today</span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={mission.isCompleted ? "outline" : "default"}
          onClick={() => navigate(`/student/missions/${mission.category}/${mission.id}`)}
        >
          {mission.isCompleted ? 'View Details' : 'Start Mission'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MissionCard;

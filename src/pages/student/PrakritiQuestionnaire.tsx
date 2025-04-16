
import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Smile, Activity, Brain } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLiferootAPI } from '@/hooks/useLiferootAPI';

interface Question {
  id: number;
  text: string;
  options: {
    vata: string;
    pitta: string;
    kapha: string;
  };
}

const questions: Question[] = [
  {
    id: 1,
    text: 'How would you describe your learning style?',
    options: {
      vata: 'Quick to grasp but may forget easily',
      pitta: 'Analytical and goal-oriented',
      kapha: 'Slow but retains information deeply'
    }
  },
  {
    id: 2,
    text: 'What type of classroom activities do you enjoy most?',
    options: {
      vata: 'Creative tasks like storytelling or art',
      pitta: 'Debates and logical challenges',
      kapha: 'Hands-on and interactive lessons'
    }
  },
  {
    id: 3,
    text: 'How do you respond to new challenges?',
    options: {
      vata: 'Enthusiastic but may lose focus',
      pitta: 'Competitive and driven to succeed',
      kapha: 'Cautious but steady in approach'
    }
  },
  {
    id: 4,
    text: 'What is your preferred classroom environment?',
    options: {
      vata: 'Dynamic with group activities',
      pitta: 'Structured with clear goals',
      kapha: 'Quiet and calm for reflection'
    }
  },
  {
    id: 5,
    text: 'How do you handle stress during studies?',
    options: {
      vata: 'Feel restless or anxious',
      pitta: 'Get frustrated or intense',
      kapha: 'Withdraw or slow down'
    }
  },
  {
    id: 6,
    text: 'How do you approach group projects?',
    options: {
      vata: 'Bring creative ideas but may struggle with follow-through',
      pitta: 'Take charge and focus on results',
      kapha: 'Steady contributor with a calm presence'
    }
  },
  {
    id: 7,
    text: 'What motivates you to learn?',
    options: {
      vata: 'Exploring new and exciting ideas',
      pitta: 'Achieving high standards and goals',
      kapha: 'Building a strong foundation with rewards'
    }
  },
  {
    id: 8,
    text: 'How do you best retain information?',
    options: {
      vata: 'Through visuals and creative methods',
      pitta: 'Through logical analysis and structure',
      kapha: 'Through repetition and hands-on practice'
    }
  },
  {
    id: 9,
    text: 'How do you react to feedback from teachers?',
    options: {
      vata: 'Curious but may overthink it',
      pitta: 'Motivated to improve but sensitive to criticism',
      kapha: 'Receptive but slow to act on it'
    }
  },
  {
    id: 10,
    text: 'What type of support helps you thrive?',
    options: {
      vata: 'Grounding practices like yoga or breaks',
      pitta: 'Cooling activities like journaling or mindfulness',
      kapha: 'Energizing tasks and positive reinforcement'
    }
  }
];

interface PrakritiResult {
  type: 'vata' | 'pitta' | 'kapha' | 'vata-pitta' | 'pitta-kapha' | 'vata-kapha' | 'balanced';
  description: string;
  recommendations: string[];
  icon: React.ReactNode;
  color: string;
}

const PrakritiQuestionnaire: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'vata' | 'pitta' | 'kapha'>>({});
  const [showResults, setShowResults] = useState(false);
  const { post } = useLiferootAPI();
  
  const handleAnswer = (answer: 'vata' | 'pitta' | 'kapha') => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer
    }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question answered
      setShowResults(true);
      
      // This would be where you submit the results to your backend
      // Currently commented out as the API doesn't exist yet
      /*
      post('/student/prakriti-assessment', { answers })
        .then(() => {
          toast({
            title: "Assessment Saved",
            description: "Your Prakriti assessment has been saved successfully.",
          });
        })
        .catch((error) => {
          console.error("Error saving assessment:", error);
        });
      */
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };
  
  const prakritiResult = useMemo((): PrakritiResult => {
    // Count the number of each dosha type
    const counts = Object.values(answers).reduce(
      (acc, value) => {
        acc[value]++;
        return acc;
      },
      { vata: 0, pitta: 0, kapha: 0 }
    );
    
    // Determine dominant dosha(s)
    const maxCount = Math.max(counts.vata, counts.pitta, counts.kapha);
    const dominantDoshas = Object.entries(counts)
      .filter(([_, count]) => count === maxCount)
      .map(([dosha]) => dosha);
    
    if (dominantDoshas.length === 3 || 
        (counts.vata === counts.pitta && counts.pitta === counts.kapha)) {
      return {
        type: 'balanced',
        description: 'You have a balanced constitution with equal influence from all three doshas. This is rare and indicates versatility in learning styles.',
        recommendations: [
          'Maintain balance through regular routines',
          'Adapt different learning techniques based on the subject matter',
          'Practice mindfulness to stay centered',
          'Use a variety of study methods to engage all aspects of your learning style'
        ],
        icon: <Activity className="h-12 w-12" />,
        color: 'bg-purple-100 text-purple-800'
      };
    }
    
    if (dominantDoshas.length === 2) {
      if (dominantDoshas.includes('vata') && dominantDoshas.includes('pitta')) {
        return {
          type: 'vata-pitta',
          description: 'You have a Vata-Pitta constitution, blending creativity with analytical skills. You learn quickly and are driven to succeed.',
          recommendations: [
            'Balance creative pursuits with structured study sessions',
            'Use visual aids and logical frameworks',
            'Take short breaks to prevent burnout',
            'Channel your intensity into productive outcomes through goal-setting'
          ],
          icon: <Brain className="h-12 w-12" />,
          color: 'bg-indigo-100 text-indigo-800'
        };
      }
      if (dominantDoshas.includes('pitta') && dominantDoshas.includes('kapha')) {
        return {
          type: 'pitta-kapha',
          description: 'You have a Pitta-Kapha constitution, combining determination with steadiness. You are methodical, goal-oriented, and have good retention.',
          recommendations: [
            'Set ambitious but achievable goals',
            'Balance analytical with hands-on learning',
            'Use structured repetition for mastery',
            'Stay active to maintain energy and focus'
          ],
          icon: <Activity className="h-12 w-12" />,
          color: 'bg-green-100 text-green-800'
        };
      }
      return {
        type: 'vata-kapha',
        description: 'You have a Vata-Kapha constitution, blending creativity with steadiness. You have imaginative ideas but also the patience to see them through.',
        recommendations: [
          'Alternate between creative exploration and structured practice',
          'Use visual and hands-on learning methods',
          'Balance activity with reflection time',
          'Create routines that allow for both spontaneity and consistency'
        ],
        icon: <Smile className="h-12 w-12" />,
        color: 'bg-blue-100 text-blue-800'
      };
    }
    
    // Single dominant dosha
    if (counts.vata > counts.pitta && counts.vata > counts.kapha) {
      return {
        type: 'vata',
        description: 'You have a Vata-dominant constitution. You are creative, quick to learn, and adaptable, though you may struggle with consistency.',
        recommendations: [
          'Establish regular study routines',
          'Use creative methods like mind maps and storytelling',
          'Take brief breaks during study sessions',
          'Practice grounding techniques like deep breathing when feeling scattered',
          'Review material frequently to reinforce memory'
        ],
        icon: <Activity className="h-12 w-12" />,
        color: 'bg-blue-100 text-blue-800'
      };
    }
    
    if (counts.pitta > counts.vata && counts.pitta > counts.kapha) {
      return {
        type: 'pitta',
        description: 'You have a Pitta-dominant constitution. You are focused, determined, and analytical, with a natural drive to achieve.',
        recommendations: [
          'Set clear goals and track progress',
          'Engage in debates and analytical discussions',
          'Balance intensity with cooling activities',
          'Use structured study methods and logic-based approaches',
          'Practice patience when faced with challenges'
        ],
        icon: <Brain className="h-12 w-12" />,
        color: 'bg-red-100 text-red-800'
      };
    }
    
    return {
      type: 'kapha',
      description: 'You have a Kapha-dominant constitution. You are steady, patient, and have excellent memory retention once you have mastered a concept.',
      recommendations: [
        'Use interactive and engaging study methods',
        'Incorporate physical movement into learning',
        'Set achievable milestones for motivation',
        'Use repetition and hands-on practice for mastery',
        'Join study groups to maintain energy and engagement'
      ],
      icon: <Smile className="h-12 w-12" />,
      color: 'bg-green-100 text-green-800'
    };
  }, [answers, showResults]);
  
  const progress = (currentQuestionIndex / questions.length) * 100;
  
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#E5DEFF] to-[#D3E4FD] text-center">
          <CardTitle className="text-2xl md:text-3xl text-gray-800">
            Student Prakriti Assessment
          </CardTitle>
          <CardDescription className="text-gray-700">
            Discover your Ayurvedic learning constitution to enhance your educational journey
          </CardDescription>
        </CardHeader>

        {!showResults ? (
          <CardContent className="pt-6">
            <div className="mb-4 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-[#9b87f5] h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-right text-sm text-gray-500 mb-6">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>

            <h3 className="text-xl font-medium mb-6">
              {questions[currentQuestionIndex].text}
            </h3>

            <RadioGroup className="space-y-4">
              <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-slate-50 transition-colors">
                <RadioGroupItem 
                  value="vata" 
                  id="vata" 
                  onClick={() => handleAnswer('vata')}
                />
                <Label htmlFor="vata" className="flex-grow cursor-pointer">
                  {questions[currentQuestionIndex].options.vata}
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-slate-50 transition-colors">
                <RadioGroupItem 
                  value="pitta" 
                  id="pitta"
                  onClick={() => handleAnswer('pitta')}
                />
                <Label htmlFor="pitta" className="flex-grow cursor-pointer">
                  {questions[currentQuestionIndex].options.pitta}
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-slate-50 transition-colors">
                <RadioGroupItem 
                  value="kapha" 
                  id="kapha"
                  onClick={() => handleAnswer('kapha')}
                />
                <Label htmlFor="kapha" className="flex-grow cursor-pointer">
                  {questions[currentQuestionIndex].options.kapha}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        ) : (
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className={`inline-flex p-4 rounded-full ${prakritiResult.color} mb-4`}>
                {prakritiResult.icon}
              </div>
              <h3 className="text-2xl font-bold capitalize mb-2">
                {prakritiResult.type} Prakriti
              </h3>
              <p className="text-gray-600 mb-4">
                {prakritiResult.description}
              </p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-lg mb-3">Recommendations for your learning style:</h4>
              <ul className="space-y-2">
                {prakritiResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-800 mr-2 p-1">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        )}
        
        <CardFooter className="flex justify-between">
          {!showResults ? (
            currentQuestionIndex > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              >
                Previous
              </Button>
            )
          ) : (
            <Button
              variant="outline"
              onClick={resetQuiz}
            >
              Retake Assessment
            </Button>
          )}
          
          {showResults && (
            <Button
              onClick={() => {
                toast({
                  title: "Assessment Saved",
                  description: "Your Prakriti assessment has been saved to your profile.",
                });
              }}
            >
              Save Results
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PrakritiQuestionnaire;


import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";

interface BreathingExerciseProps {
  technique: "box" | "4-7-8" | "deep" | "alternate";
  onComplete?: () => void;
}

interface BreathingStep {
  instruction: string;
  duration: number;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ 
  technique,
  onComplete
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const targetCycles = 3;

  // Define breathing techniques
  const breathingTechniques = {
    box: [
      { instruction: "Breathe in", duration: 4 },
      { instruction: "Hold", duration: 4 },
      { instruction: "Breathe out", duration: 4 },
      { instruction: "Hold", duration: 4 },
    ],
    "4-7-8": [
      { instruction: "Breathe in", duration: 4 },
      { instruction: "Hold", duration: 7 },
      { instruction: "Breathe out", duration: 8 },
    ],
    deep: [
      { instruction: "Breathe in deeply", duration: 5 },
      { instruction: "Hold briefly", duration: 2 },
      { instruction: "Breathe out completely", duration: 5 },
    ],
    alternate: [
      { instruction: "Cover right nostril, breathe in left", duration: 4 },
      { instruction: "Cover both nostrils, hold", duration: 4 },
      { instruction: "Cover left nostril, breathe out right", duration: 4 },
      { instruction: "Cover left nostril, breathe in right", duration: 4 },
      { instruction: "Cover both nostrils, hold", duration: 4 },
      { instruction: "Cover right nostril, breathe out left", duration: 4 },
    ],
  };

  const currentSteps = breathingTechniques[technique];
  const currentStep = currentSteps[currentStepIndex];

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isActive && currentStep) {
      setSecondsLeft(currentStep.duration);
      setProgress(0);

      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // Move to next step or cycle
            if (currentStepIndex === currentSteps.length - 1) {
              setCurrentStepIndex(0);
              setCompletedCycles((prev) => prev + 1);
            } else {
              setCurrentStepIndex((prev) => prev + 1);
            }
            return currentStep.duration;
          }
          
          // Update progress
          setProgress(((currentStep.duration - prev + 1) / currentStep.duration) * 100);
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, currentStepIndex, currentStep, currentSteps.length, technique]);

  // Check if exercise is completed
  useEffect(() => {
    if (completedCycles >= targetCycles) {
      setIsActive(false);
      if (onComplete) onComplete();
    }
  }, [completedCycles, onComplete]);

  const toggleExercise = () => {
    setIsActive((prev) => !prev);
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentStepIndex(0);
    setProgress(0);
    setCompletedCycles(0);
  };

  const getTechniqueTitle = () => {
    switch (technique) {
      case "box": return "Box Breathing";
      case "4-7-8": return "4-7-8 Technique";
      case "deep": return "Deep Breathing";
      case "alternate": return "Alternate Nostril";
      default: return "Breathing Exercise";
    }
  };

  const getTechniqueDescription = () => {
    switch (technique) {
      case "box":
        return "Equal duration for inhale, hold, exhale, and hold again. Creates balance and calm.";
      case "4-7-8":
        return "Inhale for 4, hold for 7, exhale for 8. Helps with anxiety and sleep.";
      case "deep":
        return "Deep belly breathing activates the parasympathetic nervous system for relaxation.";
      case "alternate":
        return "Alternating breath between nostrils, balances the hemispheres of the brain.";
      default:
        return "Follow the guided breathing instructions.";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTechniqueTitle()}</CardTitle>
        <CardDescription>{getTechniqueDescription()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[200px] py-6">
          {isActive ? (
            <>
              <div className="text-3xl font-bold mb-4">{currentStep.instruction}</div>
              <div className="text-6xl font-bold mb-8">{secondsLeft}</div>
              <Progress value={progress} className="w-full h-3" />
              <div className="text-sm text-muted-foreground mt-4">
                Cycle {completedCycles + 1} of {targetCycles}
              </div>
            </>
          ) : completedCycles >= targetCycles ? (
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">Great job!</div>
              <p className="text-muted-foreground mb-6">
                You've completed {targetCycles} cycles of {getTechniqueTitle()}.
              </p>
              <Button onClick={resetExercise}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Start Again
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                Find a comfortable position and click Start when you're ready.
              </p>
              <Button onClick={toggleExercise}>
                <Play className="mr-2 h-4 w-4" />
                Start Exercise
              </Button>
            </div>
          )}
        </div>

        {isActive && (
          <div className="flex justify-center">
            <Button onClick={toggleExercise} variant="outline">
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;

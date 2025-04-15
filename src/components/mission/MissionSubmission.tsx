
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, FilePlus, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MissionSubmissionProps {
  missionId: string;
  reflectionQuestion: string;
  reflectionHint?: string;
  onSubmit?: (data: {
    reflection: string;
    evidence: File[];
  }) => Promise<void>;
}

const MissionSubmission: React.FC<MissionSubmissionProps> = ({
  missionId,
  reflectionQuestion,
  reflectionHint,
  onSubmit,
}) => {
  const [reflection, setReflection] = useState("");
  const [evidence, setEvidence] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setEvidence((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setEvidence((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!reflection.trim()) {
      toast({
        title: "Missing reflection",
        description: "Please share your reflection before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // This is where the backend call would happen
      // API endpoint: POST /api/missions/{missionId}/submit
      // Request body: { reflection, evidence (as FormData) }
      
      if (onSubmit) {
        await onSubmit({ reflection, evidence });
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast({
          title: "Mission submitted!",
          description: "Your mentor will review your submission soon.",
        });
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error("Error submitting mission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Complete Your Mission</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reflection">Reflection</Label>
          <p className="text-sm text-muted-foreground mb-2">
            {reflectionQuestion}
          </p>
          {reflectionHint && (
            <p className="text-xs text-muted-foreground italic mb-2">
              Hint: {reflectionHint}
            </p>
          )}
          <Textarea
            id="reflection"
            placeholder="Share what you've learned..."
            className="min-h-[150px]"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="evidence">Evidence</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Upload photos or documents as evidence of your completed mission
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            {evidence.map((file, index) => (
              <div
                key={index}
                className="relative border rounded-md p-2 flex items-center"
              >
                <div className="mr-2">
                  {file.type.startsWith("image/") ? (
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  ) : (
                    <FilePlus className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 truncate">
                  <p className="text-sm truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => removeFile(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center w-full">
            <Label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                <p className="mb-1 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  Images, PDFs, or documents (Max 10MB)
                </p>
              </div>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
              />
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          className="w-full"
        >
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Submit for Review
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MissionSubmission;


import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Save, Trash2 } from "lucide-react";
import { format } from "date-fns";

export interface JournalEntryData {
  id?: string;
  title: string;
  content: string;
  date: Date;
  mood?: string;
  tags?: string[];
}

interface JournalEntryProps {
  initialData?: JournalEntryData;
  onSave?: (data: JournalEntryData) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

const JournalEntry: React.FC<JournalEntryProps> = ({
  initialData,
  onSave,
  onDelete,
}) => {
  const isNewEntry = !initialData;
  
  const [entry, setEntry] = useState<JournalEntryData>(
    initialData || {
      title: "",
      content: "",
      date: new Date(),
      mood: "neutral",
      tags: [],
    }
  );
  
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!entry.title.trim() || !entry.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your journal entry.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // This is where we would make the API call to save the journal entry
      // API endpoint: POST /api/student/journal
      // or: PUT /api/student/journal/:id
      // Request body: entry
      
      if (onSave) {
        await onSave(entry);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast({
          title: "Journal entry saved",
          description: "Your thoughts have been recorded successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to save",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error("Error saving journal entry:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!entry.id) return;
    
    try {
      // This is where we would make the API call to delete the journal entry
      // API endpoint: DELETE /api/student/journal/:id
      
      if (onDelete) {
        await onDelete(entry.id);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast({
          title: "Journal entry deleted",
          description: "Your entry has been removed.",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to delete",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error("Error deleting journal entry:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">
          {isNewEntry ? "New Journal Entry" : "Edit Journal Entry"}
        </CardTitle>
        <div className="text-sm text-muted-foreground flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {format(entry.date, "PPP")}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={entry.title}
            onChange={handleChange}
            placeholder="Give your entry a title..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">Your thoughts</Label>
          <Textarea
            id="content"
            name="content"
            value={entry.content}
            onChange={handleChange}
            placeholder="What's on your mind today?"
            className="min-h-[200px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mood">Current mood (optional)</Label>
          <Input
            id="mood"
            name="mood"
            value={entry.mood}
            onChange={handleChange}
            placeholder="How are you feeling?"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isNewEntry && (
          <Button
            variant="outline"
            onClick={handleDelete}
            className="text-destructive border-destructive hover:bg-destructive/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        )}
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className={isNewEntry ? "w-full" : ""}
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Entry"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JournalEntry;


import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Send, Lock } from "lucide-react";

export interface SoulCirclePostData {
  title: string;
  content: string;
  category: "question" | "story" | "kindness" | "challenge";
  isAnonymous: boolean;
  tags?: string[];
}

interface CreateSoulCirclePostProps {
  onSubmit?: (post: SoulCirclePostData) => Promise<void>;
}

const CreateSoulCirclePost: React.FC<CreateSoulCirclePostProps> = ({
  onSubmit
}) => {
  const [post, setPost] = useState<SoulCirclePostData>({
    title: "",
    content: "",
    category: "story",
    isAnonymous: false,
    tags: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setPost(prev => ({ ...prev, isAnonymous: checked }));
  };

  const handleSubmit = async () => {
    if (!post.title.trim() || !post.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your post.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // API endpoint: POST /api/soul-circles/posts
      // Request body: post
      
      if (onSubmit) {
        await onSubmit(post);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Reset form after successful submission
      setPost({
        title: "",
        content: "",
        category: "story",
        isAnonymous: false,
        tags: []
      });
      
      toast({
        title: "Post created!",
        description: "Your soul circle post has been shared with the community."
      });
    } catch (error) {
      toast({
        title: "Failed to create post",
        description: "Please try again later.",
        variant: "destructive"
      });
      console.error("Error creating soul circle post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share with Soul Circle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Give your post a title..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Your message</Label>
          <Textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            placeholder="Share your story, question, or act of kindness..."
            className="min-h-[150px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            value={post.category}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="story">Personal Story</option>
            <option value="question">Question</option>
            <option value="kindness">Act of Kindness</option>
            <option value="challenge">Challenge</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={post.isAnonymous}
            onCheckedChange={handleSwitchChange}
            id="anonymous-mode"
          />
          <Label htmlFor="anonymous-mode" className="flex items-center cursor-pointer">
            <Lock className="h-4 w-4 mr-2" />
            Post anonymously
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full"
        >
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? "Posting..." : "Share with Soul Circle"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateSoulCirclePost;


import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HeartHandshake, MessageSquare, Leaf, Brain, Heart, Filter } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import SoulCirclePost from "@/components/community/SoulCirclePost";

// Mock data for posts
const mockPosts = [
  {
    id: "1",
    content: "Today I completed my first eco-mission! I reduced my food waste by 30% this week and it made me realize how much I was throwing away before. Small changes can make a big difference!",
    authorId: "user1",
    authorName: "Emma T.",
    authorImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    isAnonymous: false,
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    likes: 12,
    category: "eco" as "eco" | "eq" | "values",
    comments: [
      {
        id: "c1",
        content: "That's amazing! I'm working on the same mission now. Any tips?",
        authorId: "user2",
        authorName: "Michael L.",
        authorImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        createdAt: new Date(Date.now() - 45 * 60 * 1000)
      },
      {
        id: "c2",
        content: "Try meal planning! It helped me reduce waste a lot.",
        authorId: "user1",
        authorName: "Emma T.",
        authorImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        createdAt: new Date(Date.now() - 30 * 60 * 1000)
      }
    ]
  },
  {
    id: "2",
    content: "I've been struggling with anxiety lately, especially before tests. The breathing exercises from the Mind Gym have really been helping me stay grounded. Does anyone else use these regularly?",
    authorId: "user3",
    authorName: "Anonymous",
    isAnonymous: true,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    likes: 8,
    category: "eq" as "eco" | "eq" | "values",
    comments: [
      {
        id: "c3",
        content: "You're not alone. I use them almost every day before school. The 4-7-8 technique works best for me.",
        authorId: "user4",
        authorName: "Taylor R.",
        authorImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ]
  },
  {
    id: "3",
    content: "I helped an elderly neighbor carry their groceries yesterday. It wasn't part of any mission, but it felt good to make someone's day a little easier. Sometimes the smallest acts of kindness can make the biggest difference.",
    authorId: "user5",
    authorName: "Jordan P.",
    authorImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    isAnonymous: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    likes: 15,
    category: "values" as "eco" | "eq" | "values",
    comments: [
      {
        id: "c4",
        content: "This is what LifeRoot is all about! Small acts of kindness add up to big changes.",
        authorId: "user6",
        authorName: "Alex Student",
        authorImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=student",
        createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000)
      },
      {
        id: "c5",
        content: "You've inspired me to look for opportunities to help in my neighborhood too!",
        authorId: "user7",
        authorName: "Sam K.",
        authorImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
      },
      {
        id: "c6",
        content: "This is exactly why I love our community. Keep it up!",
        authorId: "user8",
        authorName: "Mentor Smith",
        authorImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=mentor",
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ]
  }
];

const SoulCircles: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [postContent, setPostContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [posts, setPosts] = useState(mockPosts);
  const [isPostAnonymous, setIsPostAnonymous] = useState(false);
  const [postCategory, setPostCategory] = useState<"eco" | "eq" | "values" | null>(null);
  
  useEffect(() => {
    // TODO: Fetch posts from backend
    // API endpoint: GET /api/community/posts
    // Optional query params: category, page, limit
    
    // For now, just use mock data
  }, [activeTab, categoryFilter]);
  
  const handlePostSubmit = () => {
    if (!postContent.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }
    
    // TODO: Submit post to backend
    // API endpoint: POST /api/community/posts
    // Request body: { content: postContent, isAnonymous, category: postCategory }
    
    // For now, just add to local state
    const newPost = {
      id: Date.now().toString(),
      content: postContent,
      authorId: currentUser?.id || "",
      authorName: currentUser?.name || "",
      authorImg: currentUser?.profileImg,
      isAnonymous: isPostAnonymous,
      createdAt: new Date(),
      likes: 0,
      category: postCategory,
      comments: []
    };
    
    setPosts([newPost, ...posts]);
    setPostContent("");
    setIsPostAnonymous(false);
    setPostCategory(null);
    
    toast.success("Post shared with the community!");
  };
  
  const handleLikePost = (postId: string) => {
    // TODO: Submit like to backend
    // API endpoint: POST /api/community/posts/{postId}/like
    
    // For now, just update local state
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 } 
        : post
    ));
  };
  
  const filteredPosts = categoryFilter 
    ? posts.filter(post => post.category === categoryFilter)
    : posts;

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <HeartHandshake className="mr-2" /> Soul Circles
          </h1>
          <p className="text-muted-foreground">
            Share your journey and support others in our anonymous community space
          </p>
        </div>
        <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <MessageSquare className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>
      
      {/* Create post card */}
      <Card>
        <CardHeader>
          <CardTitle>Share Your Experience</CardTitle>
          <CardDescription>
            Your insights could help someone else on their journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="What's on your mind? Share your experiences, challenges, or wins..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={4}
            />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="anonymous-mode"
                  checked={isPostAnonymous}
                  onCheckedChange={setIsPostAnonymous}
                />
                <Label htmlFor="anonymous-mode">Post anonymously</Label>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={postCategory === "eco" ? "default" : "outline"}
                  size="sm"
                  className={postCategory === "eco" ? "bg-liferoot-green" : ""}
                  onClick={() => setPostCategory(postCategory === "eco" ? null : "eco")}
                >
                  <Leaf className="h-4 w-4 mr-1" /> Eco
                </Button>
                <Button
                  variant={postCategory === "eq" ? "default" : "outline"}
                  size="sm"
                  className={postCategory === "eq" ? "bg-liferoot-blue" : ""}
                  onClick={() => setPostCategory(postCategory === "eq" ? null : "eq")}
                >
                  <Brain className="h-4 w-4 mr-1" /> EQ
                </Button>
                <Button
                  variant={postCategory === "values" ? "default" : "outline"}
                  size="sm"
                  className={postCategory === "values" ? "bg-liferoot-yellow" : ""}
                  onClick={() => setPostCategory(postCategory === "values" ? null : "values")}
                >
                  <Heart className="h-4 w-4 mr-1" /> Values
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handlePostSubmit}>
            Share with Soul Circle
          </Button>
        </CardFooter>
      </Card>
      
      {/* Posts feed */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="my">My Posts</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <select 
                  className="p-2 rounded-md border text-sm"
                  onChange={(e) => setCategoryFilter(e.target.value || null)}
                  value={categoryFilter || ""}
                >
                  <option value="">All categories</option>
                  <option value="eco">Eco</option>
                  <option value="eq">EQ</option>
                  <option value="values">Values</option>
                </select>
              </div>
            </div>
          </Tabs>
        </div>
        
        {filteredPosts.length > 0 ? (
          <div className="space-y-4">
            {filteredPosts.map(post => (
              <SoulCirclePost
                key={post.id}
                id={post.id}
                content={post.content}
                authorId={post.authorId}
                authorName={post.authorName}
                authorImg={post.authorImg}
                isAnonymous={post.isAnonymous}
                createdAt={post.createdAt}
                likes={post.likes}
                comments={post.comments}
                category={post.category}
                onLike={handleLikePost}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">No posts found in this category</p>
              <Button className="mt-4" onClick={() => setCategoryFilter(null)}>
                Show all posts
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SoulCircles;

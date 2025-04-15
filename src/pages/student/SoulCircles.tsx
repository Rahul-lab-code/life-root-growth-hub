
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockCircles = [
  {
    id: "1",
    name: "Eco Warriors",
    members: 12,
    description: "A group dedicated to environmental sustainability",
    category: "eco",
  },
  {
    id: "2",
    name: "Mindfulness Masters",
    members: 8,
    description: "Daily meditation and emotional growth",
    category: "eq",
  },
  {
    id: "3",
    name: "Value Seekers",
    members: 15,
    description: "Exploring and living our core values",
    category: "values",
  },
];

const SoulCircles = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Soul Circles</h1>
          <p className="text-muted-foreground">Connect with like-minded individuals</p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Create Circle
        </Button>
      </div>

      <div className="relative w-full max-w-sm mx-auto md:mx-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search circles..." className="pl-8" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCircles.map((circle) => (
          <Card key={circle.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{circle.name}</span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {circle.members}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{circle.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${circle.id}-${i}`} />
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  Join Circle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SoulCircles;


import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { User, Edit2, Save, Lock, Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileProps {
  userProfile?: UserProfile;
  isLoading?: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImg?: string;
  bio?: string;
  school?: string;
  interests?: string[];
  joined?: Date;
}

const UserProfile: React.FC<UserProfileProps> = ({ userProfile, isLoading }) => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<UserProfile | null>(null);
  const [currentTab, setCurrentTab] = useState("info");
  
  // Use current user if no profile is passed
  const profile = userProfile || currentUser;
  
  if (isLoading || !profile) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Loading Profile...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center animate-pulse">
            <div className="w-24 h-24 rounded-full bg-muted"></div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="h-5 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleEdit = () => {
    setUpdatedProfile({ ...profile });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!updatedProfile) return;
    
    // TODO: Call API to update profile
    // API endpoint: PUT /api/user/profile
    // Request body: updatedProfile
    
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updatedProfile) return;
    
    setUpdatedProfile({
      ...updatedProfile,
      [e.target.name]: e.target.value
    });
  };
  
  const getRoleBadgeColor = () => {
    switch(profile.role) {
      case "admin": return "bg-liferoot-yellow-dark text-white";
      case "mentor": return "bg-liferoot-blue text-white";
      case "student": return "bg-liferoot-green text-white";
      default: return "bg-muted-foreground text-white";
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <CardTitle className="text-2xl">User Profile</CardTitle>
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          ) : (
            <Button variant="outline" onClick={handleEdit}>
              <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          )}
        </div>
        <CardDescription>
          Manage your account information and settings
        </CardDescription>
      </CardHeader>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <div className="px-6">
          <TabsList className="mb-4">
            <TabsTrigger value="info">
              <User className="h-4 w-4 mr-2" /> Profile Info
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" /> Security
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent>
          <TabsContent value="info" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-28 w-28 mb-2">
                  <AvatarImage src={profile.profileImg} />
                  <AvatarFallback className="text-2xl bg-liferoot-green text-white">
                    {profile.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {isEditing && (
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" /> Upload
                  </Button>
                )}
                
                <div className={`mt-2 text-xs px-3 py-1 rounded-full ${getRoleBadgeColor()}`}>
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </div>
              </div>
              
              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input 
                        id="name" 
                        name="name" 
                        value={updatedProfile?.name || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="px-3 py-2 rounded-md border bg-background">{profile.name}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="px-3 py-2 rounded-md border bg-muted text-muted-foreground">
                      {profile.email}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Input 
                      id="bio" 
                      name="bio" 
                      value={updatedProfile?.bio || ""}
                      onChange={handleChange}
                      placeholder="Tell us about yourself"
                    />
                  ) : (
                    <div className="px-3 py-2 rounded-md border bg-background">
                      {profile.bio || "No bio available"}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="school">School</Label>
                  {isEditing ? (
                    <Input 
                      id="school" 
                      name="school" 
                      value={updatedProfile?.school || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="px-3 py-2 rounded-md border bg-background">
                      {profile.school || "No school specified"}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests && profile.interests.length > 0 ? (
                      profile.interests.map((interest, index) => (
                        <div key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                          {interest}
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground">No interests specified</div>
                    )}
                    {isEditing && (
                      <Button variant="ghost" size="sm" className="rounded-full">
                        + Add
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="border-t px-6 py-4 flex justify-between">
        <div className="text-xs text-muted-foreground">
          Member since: {profile.joined ? new Date(profile.joined).toLocaleDateString() : "Unknown"}
        </div>
        
        {!isEditing && (
          <Button variant="outline" onClick={handleEdit}>
            <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UserProfile;

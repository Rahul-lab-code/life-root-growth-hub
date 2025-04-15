
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, Edit, Upload, Calendar, Award, School, Mail, Phone, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

// Mock data for the mentor profile
const mockMentorData = {
  bio: "Dedicated mentor helping students grow through sustainability education with over 5 years of experience in environmental education.",
  expertise: ["Environmental Science", "Mindfulness", "Sustainable Development", "Ethical Leadership"],
  education: [
    { degree: "M.S. Environmental Education", institution: "Green University", year: "2018" },
    { degree: "B.S. Environmental Science", institution: "State University", year: "2016" }
  ],
  experience: [
    { 
      role: "Lead Environmental Educator", 
      organization: "Nature Institute", 
      period: "2019 - Present",
      description: "Developing and delivering environmental education programs for K-12 students"
    },
    { 
      role: "Sustainability Program Coordinator", 
      organization: "City Green Initiative", 
      period: "2016 - 2019",
      description: "Coordinated sustainability programs for schools and community organizations"
    }
  ],
  phoneNumber: "+1 (555) 234-5678",
  address: "123 Green Avenue, Eco City, EC 12345",
  students: 14,
  completedMissions: 86,
  averageRating: 4.8,
  registrationDate: "February 15, 2023"
};

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully."
    });
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">View and edit your profile information</p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-28 w-28">
                    <AvatarImage src={currentUser.profileImg} />
                    <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full bg-background h-8 w-8"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Upload photo</span>
                  </Button>
                </div>
                <CardTitle className="text-xl">{currentUser.name}</CardTitle>
                <CardDescription className="capitalize">{currentUser.role} • {mockMentorData.registrationDate}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{mockMentorData.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{mockMentorData.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <School className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser.school}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Member since {mockMentorData.registrationDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{mockMentorData.students}</p>
                  <p className="text-xs text-muted-foreground mt-1">Students</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{mockMentorData.completedMissions}</p>
                  <p className="text-xs text-muted-foreground mt-1">Missions</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{mockMentorData.averageRating}</p>
                  <p className="text-xs text-muted-foreground mt-1">Rating</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {mockMentorData.expertise.map((item, index) => (
                    <Badge key={index} variant="secondary">{item}</Badge>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full mt-6">
                <Award className="h-4 w-4 mr-2" />
                View Certifications
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                  <CardDescription>This information will be displayed on your public profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea id="bio" defaultValue={mockMentorData.bio} rows={4} />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={currentUser.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={currentUser.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={mockMentorData.phoneNumber} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school">Institution</Label>
                      <Input id="school" defaultValue={currentUser.school} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue={mockMentorData.address} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Expertise & Specialization</CardTitle>
                    <CardDescription>Add areas of expertise to showcase your skills</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockMentorData.expertise.map((item, index) => (
                      <div key={index} className="flex items-center bg-muted rounded-md px-3 py-1.5">
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience" className="mt-6 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>Your professional background</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mockMentorData.experience.map((exp, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{exp.role}</h3>
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">{exp.organization}</p>
                      <p className="text-sm">{exp.description}</p>
                      {i < mockMentorData.experience.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>Your educational background</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mockMentorData.education.map((edu, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{edu.degree}</h3>
                        <span className="text-sm text-muted-foreground">{edu.year}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      {i < mockMentorData.education.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Professional certifications and credentials</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Add Certification
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Notification settings would go here */}
                  <p className="text-muted-foreground">Notification settings coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;

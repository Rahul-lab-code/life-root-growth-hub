
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Paperclip, MoreVertical, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

// Mock data for conversations
const mockConversations = [
  {
    id: "1",
    person: {
      id: "101",
      name: "Alex Johnson",
      profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      role: "student",
    },
    lastMessage: {
      text: "I've completed the recycling mission and uploaded my photos",
      timestamp: new Date("2023-04-14T14:30:00"),
      isRead: false,
      sender: "them"
    },
    unread: 2
  },
  {
    id: "2",
    person: {
      id: "102",
      name: "Jamie Smith",
      profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
      role: "student",
    },
    lastMessage: {
      text: "Thank you for the feedback on my mindfulness exercise",
      timestamp: new Date("2023-04-14T11:15:00"),
      isRead: true,
      sender: "them"
    },
    unread: 0
  },
  {
    id: "3",
    person: {
      id: "103",
      name: "Casey Wilson",
      profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
      role: "student",
    },
    lastMessage: {
      text: "I'm having trouble understanding the requirements for the eco mission",
      timestamp: new Date("2023-04-13T16:45:00"),
      isRead: true,
      sender: "them"
    },
    unread: 0
  },
  {
    id: "4",
    person: {
      id: "104",
      name: "Mentor Sarah",
      profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      role: "mentor",
    },
    lastMessage: {
      text: "Can we discuss the new student assignment process?",
      timestamp: new Date("2023-04-12T09:20:00"),
      isRead: true,
      sender: "them"
    },
    unread: 0
  },
  {
    id: "5",
    person: {
      id: "105",
      name: "Riley Brown",
      profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
      role: "student",
    },
    lastMessage: {
      text: "I'll work on implementing those changes to my mission",
      timestamp: new Date("2023-04-11T15:30:00"),
      isRead: true,
      sender: "them"
    },
    unread: 0
  }
];

// Mock messages for the selected conversation
const mockMessages = [
  {
    id: "msg1",
    text: "Hi Ms. Smith, I've completed the recycling mission and uploaded my photos",
    timestamp: new Date("2023-04-14T14:30:00"),
    sender: "them",
    senderName: "Alex Johnson",
    senderImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: "msg2",
    text: "Great job Alex! I'll take a look at your submission",
    timestamp: new Date("2023-04-14T14:32:00"),
    sender: "me",
    senderName: "Mentor Smith",
    senderImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=mentor"
  },
  {
    id: "msg3",
    text: "I noticed you separated plastics by type - that's excellent attention to detail",
    timestamp: new Date("2023-04-14T14:35:00"),
    sender: "me",
    senderName: "Mentor Smith",
    senderImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=mentor"
  },
  {
    id: "msg4",
    text: "Thank you! I learned that different types of plastic need different recycling processes",
    timestamp: new Date("2023-04-14T14:38:00"),
    sender: "them",
    senderName: "Alex Johnson",
    senderImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: "msg5",
    text: "That's exactly right. What was the most challenging part of the mission?",
    timestamp: new Date("2023-04-14T14:40:00"),
    sender: "me",
    senderName: "Mentor Smith",
    senderImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=mentor"
  },
  {
    id: "msg6",
    text: "Identifying the recycling symbols on some items was tricky. Some were hard to find or read",
    timestamp: new Date("2023-04-14T14:42:00"),
    sender: "them",
    senderName: "Alex Johnson",
    senderImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: "msg7",
    text: "That's a common challenge. For your next eco mission, try tracking how much waste your household produces in a week",
    timestamp: new Date("2023-04-14T14:45:00"),
    sender: "me",
    senderName: "Mentor Smith",
    senderImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=mentor"
  },
];

const Messages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = mockConversations.filter(convo => 
    convo.person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      console.log("Sending message:", newMessage);
      // In a real app, this would send the message to the API
      setNewMessage("");
    }
  };

  const formatMessageDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return format(date, "h:mm a");
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
  };

  return (
    <div className="h-[calc(100vh-140px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-0">
        {/* Conversation list */}
        <Card className="rounded-r-none md:col-span-1 border-r-0 h-full">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Messages</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-96px)]">
            <ScrollArea className="h-full">
              {filteredConversations.map((convo) => (
                <div key={convo.id}>
                  <button
                    className={`w-full text-left px-4 py-3 hover:bg-muted/50 flex items-center space-x-3 ${
                      selectedConversation.id === convo.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedConversation(convo)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={convo.person.profileImg} />
                        <AvatarFallback>{convo.person.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {convo.unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-liferoot-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {convo.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className={`font-medium ${convo.unread > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {convo.person.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatMessageDate(convo.lastMessage.timestamp)}
                        </p>
                      </div>
                      <p className="text-sm truncate w-11/12 text-muted-foreground">
                        {convo.lastMessage.sender === "me" ? "You: " : ""}
                        {convo.lastMessage.text}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <Separator />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message detail */}
        <Card className="rounded-l-none md:col-span-2 h-full">
          <CardHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={selectedConversation?.person.profileImg} />
                  <AvatarFallback>
                    {selectedConversation?.person.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">
                    {selectedConversation?.person.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground capitalize">
                    {selectedConversation?.person.role}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                  <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-176px)]">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${message.sender === "me" ? "flex-row-reverse" : ""}`}>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.senderImg} />
                        <AvatarFallback>{message.senderName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div 
                          className={`px-3 py-2 rounded-lg ${
                            message.sender === "me" 
                              ? "bg-liferoot-green text-white" 
                              : "bg-muted"
                          }`}
                        >
                          <p>{message.text}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-center">
                          {format(message.timestamp, "h:mm a")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <Input
                  placeholder="Type a message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
              </div>
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;

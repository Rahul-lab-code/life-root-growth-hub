
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Leaf } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MentorChatProps {
  initialMessage?: string;
}

const MentorChat: React.FC<MentorChatProps> = ({ initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessage ? [
    {
      id: "initial",
      content: initialMessage,
      sender: "ai",
      timestamp: new Date(),
    }
  ] : []);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    // TODO: Replace with actual backend call to AI service
    // API endpoint: POST /api/mentor/chat
    // Request body: { message: input, userId: currentUser.id }
    // Response: { message: string }
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Temporary function to simulate AI responses - replace with actual API call
  const getAIResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi")) {
      return "Hi there! I'm Roo, your AI mentor. How can I help you today with your sustainability journey or personal growth?";
    } else if (lowercaseInput.includes("mission") || lowercaseInput.includes("task")) {
      return "Looking for a new mission? I recommend trying the 'Reduce Food Waste' mission. It's a great way to make an immediate impact on your carbon footprint. Would you like to know more about it?";
    } else if (lowercaseInput.includes("sad") || lowercaseInput.includes("unhappy") || lowercaseInput.includes("stress")) {
      return "I'm sorry to hear you're feeling that way. Would you like to try a quick breathing exercise? Or perhaps I can suggest a mindfulness activity that might help?";
    } else if (lowercaseInput.includes("advice") || lowercaseInput.includes("help")) {
      return "I'd be happy to offer advice. For better emotional wellbeing, try our Mind Gym tools. For sustainability tips, consider completing one small eco-action each day. What specific area would you like advice on?";
    } else {
      return "That's interesting! Remember, I'm here to support your growth in sustainability, emotional intelligence, and ethical values. Is there a specific area you'd like to discuss or work on today?";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <CardContent className="flex flex-col h-full p-4">
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/roo-avatar.png" alt="Roo" />
                  <AvatarFallback className="bg-liferoot-green text-white">
                    <Leaf className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-liferoot-blue text-white"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-liferoot-green text-white">
                  <Leaf className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                <span className="flex gap-1">
                  <span className="animate-pulse">.</span>
                  <span className="animate-pulse delay-300">.</span>
                  <span className="animate-pulse delay-500">.</span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message to Roo..."
            className="resize-none"
            rows={2}
          />
          <Button 
            onClick={handleSendMessage} 
            className="shrink-0"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorChat;

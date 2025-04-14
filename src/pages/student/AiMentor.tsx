
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, ChevronDown, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AiMentor: React.FC = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting message on component mount
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      text: "Hi there! I'm Roo, your AI mentor. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  // Scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Process AI response
  const getAiResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let response = '';
    
    // Simple rule-based responses for demo purposes
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
      response = "Hello! It's great to chat with you. How are you doing today?";
    } 
    else if (lowercaseMessage.includes('how are you')) {
      response = "I'm here to support you! What's on your mind today?";
    }
    else if (
      lowercaseMessage.includes('sad') || 
      lowercaseMessage.includes('depressed') || 
      lowercaseMessage.includes('unhappy')
    ) {
      response = "I'm sorry to hear you're feeling down. Remember that it's okay to have these feelings. Would you like to talk about what's causing this feeling, or perhaps try a simple breathing exercise to help you feel better?";
    }
    else if (
      lowercaseMessage.includes('happy') || 
      lowercaseMessage.includes('great') || 
      lowercaseMessage.includes('good')
    ) {
      response = "That's wonderful to hear! What's something positive that happened today that you'd like to share?";
    }
    else if (lowercaseMessage.includes('mission')) {
      response = "Missions are a great way to grow! Would you like me to suggest a new mission based on your interests? I can recommend something in sustainability, emotional intelligence, or ethical values.";
    }
    else if (
      lowercaseMessage.includes('advice') || 
      lowercaseMessage.includes('help') ||
      lowercaseMessage.includes('suggest')
    ) {
      response = "I'd be happy to help! Could you tell me more about what specific area you'd like advice on? Is it about school, relationships, sustainability, or something else?";
    }
    else {
      response = "Thank you for sharing that with me. How does this make you feel? Remember that your emotions are valid, and I'm here to support your growth journey.";
    }
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: response,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setIsTyping(false);
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    
    // Get AI response
    getAiResponse(inputText);
    
    // Focus input after sending
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Format timestamp for messages
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-144px)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-liferoot-blue p-2 rounded-full">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src="/placeholder.svg" alt="Roo" />
              <AvatarFallback className="bg-liferoot-blue-light text-liferoot-blue-dark">Roo</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Roo - Your AI Mentor</h1>
            <p className="text-muted-foreground">Chat with Roo about anything on your mind</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-liferoot-blue/10 text-liferoot-blue border-liferoot-blue">
          AI Powered
        </Badge>
      </div>

      {/* Chat container */}
      <Card className="flex-1 flex flex-col overflow-hidden mb-4">
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-liferoot-green text-white rounded-br-none'
                      : 'bg-muted rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 rounded-bl-none">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-liferoot-blue animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-liferoot-blue animate-pulse delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-liferoot-blue animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Input area */}
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Type your message here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-24 py-6"
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-3">
          <Button
            onClick={handleSendMessage}
            disabled={inputText.trim() === '' || isTyping}
            variant="ghost"
            size="icon"
            className="text-primary"
          >
            {isTyping ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Quick response buttons */}
      <div className="flex flex-wrap gap-2 mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full"
          onClick={() => setInputText("I'm feeling stressed about school")}
        >
          I'm feeling stressed about school
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full"
          onClick={() => setInputText("Can you suggest an eco-mission?")}
        >
          Suggest an eco-mission
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full"
          onClick={() => setInputText("I need some motivation today")}
        >
          I need some motivation
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full"
          onClick={() => setInputText("How can I improve my emotional intelligence?")}
        >
          Improve my emotional intelligence
        </Button>
      </div>
    </div>
  );
};

export default AiMentor;

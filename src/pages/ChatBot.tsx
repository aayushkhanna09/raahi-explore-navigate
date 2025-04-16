
import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Image, MapPin, Compass } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock bot responses - in a real app, these would come from an API
const botResponses: Record<string, string[]> = {
  greeting: [
    "Hello! I'm your RAही assistant. How can I help with your journey today?",
    "नमस्ते! मैं आपका RAही सहायक हूँ। आज मैं आपकी यात्रा में कैसे मदद कर सकता हूँ?",
  ],
  directions: [
    "I can help you find directions. Where would you like to go?",
    "You can take the metro from Rajiv Chowk to Chandni Chowk, it's about a 15-minute ride.",
    "The nearest bus stop is about 200 meters to the north. Bus numbers 234 and 500 will take you to City Center."
  ],
  food: [
    "Looking for food recommendations? Here are some popular options nearby:",
    "Sharma's Dhaba is famous for its Punjabi cuisine, just 0.5 km away.",
    "For authentic South Indian, try Dosa Paradise which is highly rated by locals."
  ],
  weather: [
    "The current weather in Delhi is 28°C with clear skies. Perfect day for sightseeing!",
    "There's a light drizzle expected in Mumbai this evening. You might want to carry an umbrella."
  ],
  safety: [
    "This area is generally safe for tourists, but please keep your belongings secure.",
    "I'd recommend using pre-paid taxis from the airport rather than accepting rides from strangers."
  ],
  translation: [
    "Sure, 'Where is the nearest restroom?' in Hindi is 'नज़दीकी शौचालय कहाँ है?'",
    "To say 'How much does this cost?' in Hindi, say 'यह कितने का है?'"
  ],
  emergency: [
    "For any emergency, dial 112. It's the unified emergency number in India.",
    "The nearest hospital is Apollo Hospital, about 2 km from your current location."
  ],
};

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Mock suggested queries
const suggestedQueries = [
  { id: 1, text: "Best street food nearby", icon: <Compass size={14} /> },
  { id: 2, text: "How to reach Taj Mahal", icon: <MapPin size={14} /> },
  { id: 3, text: "Weather forecast", icon: <Image size={14} /> },
];

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: botResponses.greeting[0],
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    
    // Simulate bot typing
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    }, 1000);
  };

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Simple keyword-based response system
  const getBotResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return botResponses.greeting[0];
    } else if (lowerMsg.includes('direction') || lowerMsg.includes('how to reach') || lowerMsg.includes('go to')) {
      return botResponses.directions[Math.floor(Math.random() * botResponses.directions.length)];
    } else if (lowerMsg.includes('food') || lowerMsg.includes('restaurant') || lowerMsg.includes('eat')) {
      return botResponses.food[Math.floor(Math.random() * botResponses.food.length)];
    } else if (lowerMsg.includes('weather')) {
      return botResponses.weather[Math.floor(Math.random() * botResponses.weather.length)];
    } else if (lowerMsg.includes('safe') || lowerMsg.includes('danger')) {
      return botResponses.safety[Math.floor(Math.random() * botResponses.safety.length)];
    } else if (lowerMsg.includes('translate') || lowerMsg.includes('hindi')) {
      return botResponses.translation[Math.floor(Math.random() * botResponses.translation.length)];
    } else if (lowerMsg.includes('emergency') || lowerMsg.includes('help') || lowerMsg.includes('hospital')) {
      return botResponses.emergency[Math.floor(Math.random() * botResponses.emergency.length)];
    } else {
      return "I'm still learning about Indian tourism. Could you ask in a different way?";
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="p-4 bg-white shadow-sm">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="RAही" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h2 className="font-bold font-heading">Digital Buddy</h2>
              <p className="text-xs text-gray-500">Always here to help</p>
            </div>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              {message.sender === 'bot' && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarFallback>RA</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[75%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}
              >
                {message.content}
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8 ml-2 mt-1">
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <Card className="p-2 m-2 rounded-xl bg-white shadow-lg">
          <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
            {suggestedQueries.map((query) => (
              <Button
                key={query.id}
                variant="outline"
                size="sm"
                className="flex-shrink-0"
                onClick={() => handleSuggestedQuery(query.text)}
              >
                {query.icon}
                <span className="ml-1">{query.text}</span>
              </Button>
            ))}
          </div>
          
          <Separator className="mb-2" />
          
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Mic size={20} />
            </Button>
            <Input
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              className="flex-grow mx-2"
            />
            <Button
              size="icon"
              className="bg-primary text-white rounded-full h-9 w-9"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <Send size={18} />
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default ChatBot;

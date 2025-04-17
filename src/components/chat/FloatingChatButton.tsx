
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  isMe: boolean;
  timestamp: Date;
}

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your RAही assistant. How can I help with your journey today?",
      isMe: false,
      timestamp: new Date(),
    }
  ]);
  const navigate = useNavigate();

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isMe: true,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const quickResponse = getQuickResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 100).toString(),
        content: quickResponse,
        isMe: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const getQuickResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return "Hi there! What can I help you with today?";
    } else if (lowerMsg.includes('help') || lowerMsg.includes('assist')) {
      return "I can help with travel recommendations, directions, or answer questions about destinations!";
    } else if (lowerMsg.includes('thanks') || lowerMsg.includes('thank you')) {
      return "You're welcome! Anything else I can help with?";
    } else {
      return "For more detailed assistance, would you like to open the full chat interface?";
    }
  };

  const openFullChat = () => {
    navigate('/chat');
  };

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 z-50 shadow-lg overflow-hidden">
          <div className="bg-primary text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>RA</AvatarFallback>
              </Avatar>
              <span className="font-medium">RAही Assistant</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-primary/90"
              onClick={handleToggleChat}
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className="h-80 overflow-y-auto p-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${
                  message.isMe ? 'justify-end' : 'justify-start'
                }`}
              >
                {!message.isMe && (
                  <Avatar className="h-6 w-6 mr-2 mt-1">
                    <AvatarFallback>RA</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.isMe
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex">
              <Input
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                className="flex-1 mr-2"
              />
              <Button onClick={handleSendMessage} size="sm">
                Send
              </Button>
            </div>
            <div className="mt-2 text-center">
              <Button 
                variant="link" 
                size="sm" 
                className="text-xs text-gray-500"
                onClick={openFullChat}
              >
                Open full chat
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      <Button
        className="fixed bottom-20 right-4 rounded-full h-14 w-14 shadow-lg z-50"
        size="icon"
        onClick={handleToggleChat}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageCircle size={24} />
      </Button>
    </>
  );
};

export default FloatingChatButton;

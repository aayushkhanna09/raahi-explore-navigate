
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Image, Paperclip, Mic, Smile } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isMe: boolean;
}

interface ConversationViewProps {
  title: string;
  subtitle?: string;
  avatar?: string;
  avatarFallback: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({
  title,
  subtitle,
  avatar,
  avatarFallback,
  messages,
  onSendMessage
}) => {
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
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={title} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h2 className="font-bold font-heading">{title}</h2>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isMe ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            {!message.isMe && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[75%] p-3 rounded-lg ${
                message.isMe
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              {!message.isMe && (
                <div className="text-xs font-semibold text-gray-600 mb-1">
                  {message.sender}
                </div>
              )}
              {message.content}
              <div
                className={`text-xs mt-1 ${
                  message.isMe ? 'text-white/70' : 'text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {message.isMe && (
              <Avatar className="h-8 w-8 ml-2 mt-1">
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <Card className="p-2 m-2 rounded-xl bg-white shadow-lg">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Paperclip size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Image size={20} />
          </Button>
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="flex-grow mx-2"
          />
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Smile size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Mic size={20} />
          </Button>
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
  );
};

export default ConversationView;

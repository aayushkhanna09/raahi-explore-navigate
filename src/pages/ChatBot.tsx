
import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Image, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import ChatSection from '@/components/chat/ChatSection';
import FriendsChat from '@/components/chat/FriendsChat';
import GroupsChat from '@/components/chat/GroupsChat';
import ConversationView from '@/components/chat/ConversationView';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isMe: boolean;
}

// Interface for friend/group selection
interface ChatTarget {
  id: string;
  name: string;
  avatar?: string;
  type: 'friend' | 'group';
  subtitle?: string;
}

const ChatBot: React.FC = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [inputValue, setInputValue] = useState('');
  const [selectedChat, setSelectedChat] = useState<ChatTarget | null>(null);
  
  // Mock conversations for friends/groups
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  
  const handleSendMessage = () => {
    if (!inputValue.trim() || !selectedChat) return;
    
    // Handle sending message to friend or group
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'Me',
      timestamp: new Date(),
      isMe: true,
    };
    
    const chatId = selectedChat.id;
    const currentConversation = conversations[chatId] || [];
    const updatedConversation = [...currentConversation, newMessage];
    
    setConversations({
      ...conversations,
      [chatId]: updatedConversation
    });
    
    setInputValue('');
    
    // Simulate reply for demo purposes
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `This is a simulated reply to "${inputValue}"`,
          sender: selectedChat.name,
          timestamp: new Date(),
          isMe: false,
        };
        
        setConversations(prevConversations => ({
          ...prevConversations,
          [chatId]: [...(prevConversations[chatId] || []), replyMessage]
        }));
      }, 2000);
    }
  };

  const handleSelectFriend = (friend: any) => {
    setSelectedChat({
      id: friend.id,
      name: friend.name,
      avatar: friend.avatar,
      type: 'friend',
      subtitle: friend.status === 'online' ? 'Online' : 'Offline'
    });
    
    // Initialize conversation if it doesn't exist
    if (!conversations[friend.id]) {
      setConversations({
        ...conversations,
        [friend.id]: []
      });
    }
  };

  const handleSelectGroup = (group: any) => {
    setSelectedChat({
      id: group.id,
      name: group.name,
      avatar: group.avatar,
      type: 'group',
      subtitle: `${group.members} members`
    });
    
    // Initialize conversation if it doesn't exist
    if (!conversations[group.id]) {
      setConversations({
        ...conversations,
        [group.id]: []
      });
    }
  };

  const handleSendToChat = (message: string) => {
    if (!selectedChat) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'Me',
      timestamp: new Date(),
      isMe: true,
    };
    
    const chatId = selectedChat.id;
    const currentConversation = conversations[chatId] || [];
    
    setConversations({
      ...conversations,
      [chatId]: [...currentConversation, newMessage]
    });
    
    // Simulate reply
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Reply to "${message}"`,
        sender: selectedChat.name,
        timestamp: new Date(),
        isMe: false,
      };
      
      setConversations(prevConversations => ({
        ...prevConversations,
        [chatId]: [...(prevConversations[chatId] || []), replyMessage]
      }));
    }, 1500);
  };

  const handleClearSelectedChat = () => {
    setSelectedChat(null);
  };

  return (
    <Layout>
      <ChatSection activeTab={activeTab} onTabChange={setActiveTab}>
        <TabsContent value="friends" className="flex h-full">
          {!selectedChat ? (
            <div className="w-full">
              <FriendsChat onSelectFriend={handleSelectFriend} />
            </div>
          ) : (
            <div className="flex w-full relative">
              <div className="w-1/3 border-r border-gray-200 h-full">
                <FriendsChat onSelectFriend={handleSelectFriend} />
              </div>
              <div className="w-2/3 h-full">
                <div className="absolute top-4 right-4 z-10">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleClearSelectedChat}
                  >
                    <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                  </Button>
                </div>
                <ConversationView
                  title={selectedChat.name}
                  subtitle={selectedChat.subtitle}
                  avatar={selectedChat.avatar}
                  avatarFallback={selectedChat.name.charAt(0)}
                  messages={conversations[selectedChat.id] || []}
                  onSendMessage={handleSendToChat}
                />
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="groups" className="flex h-full">
          {!selectedChat ? (
            <div className="w-full">
              <GroupsChat onSelectGroup={handleSelectGroup} />
            </div>
          ) : (
            <div className="flex w-full relative">
              <div className="w-1/3 border-r border-gray-200 h-full">
                <GroupsChat onSelectGroup={handleSelectGroup} />
              </div>
              <div className="w-2/3 h-full">
                <div className="absolute top-4 right-4 z-10">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleClearSelectedChat}
                  >
                    <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                  </Button>
                </div>
                <ConversationView
                  title={selectedChat.name}
                  subtitle={selectedChat.subtitle}
                  avatar={selectedChat.avatar}
                  avatarFallback={selectedChat.name.charAt(0)}
                  messages={conversations[selectedChat.id] || []}
                  onSendMessage={handleSendToChat}
                />
              </div>
            </div>
          )}
        </TabsContent>
      </ChatSection>
    </Layout>
  );
};

export default ChatBot;

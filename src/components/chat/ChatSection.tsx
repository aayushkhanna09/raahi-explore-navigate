
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users } from 'lucide-react';

interface ChatSectionProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const ChatSection: React.FC<ChatSectionProps> = ({ 
  activeTab, 
  onTabChange,
  children 
}) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-white shadow-sm">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <User size={16} />
              <span>Friends</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users size={16} />
              <span>Groups</span>
            </TabsTrigger>
          </TabsList>
          {children}
        </Tabs>
      </div>
    </div>
  );
};

export default ChatSection;

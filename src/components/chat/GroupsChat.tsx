
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Users } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Group {
  id: string;
  name: string;
  avatar?: string;
  members: number;
  lastMessage?: string;
  lastMessageSender?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

const groups: Group[] = [
  {
    id: '1',
    name: 'Delhi Backpackers',
    members: 42,
    lastMessage: 'Anyone visiting Humayun\'s Tomb this weekend?',
    lastMessageSender: 'Rohan',
    lastMessageTime: '11:20 AM',
    unreadCount: 5
  },
  {
    id: '2',
    name: 'Mumbai Food Explorers',
    members: 128,
    lastMessage: 'I found this amazing vada pav place near the station!',
    lastMessageSender: 'Ananya',
    lastMessageTime: 'Yesterday'
  },
  {
    id: '3',
    name: 'Himalayan Trekkers',
    members: 86,
    lastMessage: 'Weather update: Snowfall expected in Manali next week',
    lastMessageSender: 'Trip Admin',
    lastMessageTime: '2 days ago',
    unreadCount: 3
  },
  {
    id: '4',
    name: 'Solo Women Travelers',
    members: 156,
    lastMessage: 'Has anyone stayed at this hostel in Rishikesh?',
    lastMessageSender: 'Meera',
    lastMessageTime: 'Last week'
  },
  {
    id: '5',
    name: 'Budget Travel India',
    members: 210,
    lastMessage: 'Sharing my 2-week South India itinerary under ₹15,000',
    lastMessageSender: 'Budget Guru',
    lastMessageTime: '3 days ago'
  }
];

interface GroupsChatProps {
  onSelectGroup: (group: Group) => void;
}

const GroupsChat: React.FC<GroupsChatProps> = ({ onSelectGroup }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search groups..." 
            className="pl-10" 
          />
        </div>
      </div>
      
      <ScrollArea className="flex-grow">
        <div className="space-y-1 p-2">
          {groups.map((group) => (
            <div 
              key={group.id}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectGroup(group)}
            >
              <Avatar className="h-10 w-10 mr-3 bg-primary/10">
                <AvatarImage src={group.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Users size={18} />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <p className="font-medium truncate">{group.name}</p>
                    <span className="text-xs text-gray-500 ml-2">({group.members})</span>
                  </div>
                  <span className="text-xs text-gray-500">{group.lastMessageTime}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 truncate">
                    <span className="font-medium">{group.lastMessageSender}: </span>
                    {group.lastMessage}
                  </p>
                  {group.unreadCount && (
                    <Badge className="ml-1 bg-primary">{group.unreadCount}</Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default GroupsChat;


import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

const friends: Friend[] = [
  {
    id: '1',
    name: 'Akshay Sharma',
    status: 'online',
    lastMessage: 'When are you reaching Delhi?',
    lastMessageTime: '10:30 AM',
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Priya Patel',
    status: 'offline',
    lastMessage: 'The Taj was amazing! Check out these photos',
    lastMessageTime: 'Yesterday'
  },
  {
    id: '3',
    name: 'Rahul Singh',
    status: 'online',
    lastMessage: 'Let\'s plan for Rajasthan next month',
    lastMessageTime: '2 days ago'
  },
  {
    id: '4',
    name: 'Neha Gupta',
    status: 'offline',
    lastMessage: 'Thanks for the restaurant recommendation',
    lastMessageTime: 'Last week'
  },
  {
    id: '5',
    name: 'Vikram Mehta',
    status: 'online',
    lastMessage: 'Did you check the train timings?',
    lastMessageTime: '3 days ago',
    unreadCount: 1
  }
];

interface FriendsChatProps {
  onSelectFriend: (friend: Friend) => void;
}

const FriendsChat: React.FC<FriendsChatProps> = ({ onSelectFriend }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search friends..." 
            className="pl-10" 
          />
        </div>
      </div>
      
      <ScrollArea className="flex-grow">
        <div className="space-y-1 p-2">
          {friends.map((friend) => (
            <div 
              key={friend.id}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectFriend(friend)}
            >
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium truncate">{friend.name}</p>
                  <span className="text-xs text-gray-500">{friend.lastMessageTime}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 truncate">{friend.lastMessage}</p>
                  {friend.unreadCount && (
                    <Badge className="ml-1 bg-primary">{friend.unreadCount}</Badge>
                  )}
                </div>
              </div>
              
              <div className="ml-2 h-2 w-2 rounded-full bg-green-500" 
                style={{ visibility: friend.status === 'online' ? 'visible' : 'hidden' }}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendsChat;

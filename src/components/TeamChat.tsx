import { useState, useRef, useEffect } from 'react';
import { Send, Pin, Hash, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  role: 'owner' | 'admin' | 'member';
  status: 'online' | 'offline' | 'in-game' | 'voice';
}

interface TeamMessage {
  id: string;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: number;
  isPinned?: boolean;
  mentions?: number[];
}

interface TeamChannel {
  id: string;
  name: string;
  description: string;
  type: 'text' | 'voice';
  memberCount?: number;
}

interface TeamChatProps {
  teamId: string;
  teamName: string;
  members: TeamMember[];
  channels: TeamChannel[];
  currentChannelId: string;
  onChannelChange: (channelId: string) => void;
  onSendMessage: (channelId: string, message: string) => void;
}

export default function TeamChat({
  teamId,
  teamName,
  members,
  channels,
  currentChannelId,
  onChannelChange,
  onSendMessage,
}: TeamChatProps) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<TeamMessage[]>([]);
  const [inVoiceChat, setInVoiceChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChannel = channels.find((c) => c.id === currentChannelId);
  const onlineMembers = members.filter((m) => m.status !== 'offline');
  const voiceMembers = members.filter((m) => m.status === 'voice');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const mockMessages: TeamMessage[] = [
      {
        id: '1',
        senderId: 2,
        senderName: 'ProGamer2024',
        senderAvatar: '/placeholder-avatar.jpg',
        content: 'Кто готов на турнир?',
        timestamp: Date.now() - 3600000,
        isPinned: true,
      },
      {
        id: '2',
        senderId: 3,
        senderName: 'SnipeKing',
        senderAvatar: '/placeholder-avatar.jpg',
        content: 'Я готов! Когда начинаем?',
        timestamp: Date.now() - 3000000,
      },
      {
        id: '3',
        senderId: 4,
        senderName: 'TankMaster',
        senderAvatar: '/placeholder-avatar.jpg',
        content: 'Через час. Всем быть в голосовом!',
        timestamp: Date.now() - 1800000,
      },
    ];
    setMessages(mockMessages);
  }, [currentChannelId]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: TeamMessage = {
      id: Date.now().toString(),
      senderId: 1,
      senderName: 'Вы',
      senderAvatar: '/placeholder-avatar.jpg',
      content: messageInput,
      timestamp: Date.now(),
    };

    setMessages([...messages, newMessage]);
    onSendMessage(currentChannelId, messageInput);
    setMessageInput('');
  };

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'только что';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ч`;
    return new Date(timestamp).toLocaleDateString();
  };

  const roleColors = {
    owner: 'text-yellow-500',
    admin: 'text-purple-500',
    member: 'text-gray-500',
  };

  const roleBadges = {
    owner: 'Владелец',
    admin: 'Админ',
    member: '',
  };

  return (
    <div className="flex h-[700px] border rounded-lg overflow-hidden">
      <div className="w-60 border-r flex flex-col bg-background">
        <div className="p-4 border-b">
          <h3 className="font-bold truncate">{teamName}</h3>
          <p className="text-xs text-muted-foreground">
            {onlineMembers.length}/{members.length} онлайн
          </p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            <p className="text-xs font-semibold text-muted-foreground px-2 mb-2">
              ТЕКСТОВЫЕ КАНАЛЫ
            </p>
            {channels
              .filter((c) => c.type === 'text')
              .map((channel) => (
                <Button
                  key={channel.id}
                  variant={currentChannelId === channel.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start gap-2 mb-1"
                  onClick={() => onChannelChange(channel.id)}
                >
                  <Icon name="Hash" size={16} className="text-muted-foreground" />
                  <span className="truncate">{channel.name}</span>
                </Button>
              ))}

            <p className="text-xs font-semibold text-muted-foreground px-2 mt-4 mb-2">
              ГОЛОСОВЫЕ КАНАЛЫ
            </p>
            {channels
              .filter((c) => c.type === 'voice')
              .map((channel) => (
                <div key={channel.id} className="mb-1">
                  <Button
                    variant={inVoiceChat ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-2"
                    onClick={() => setInVoiceChat(!inVoiceChat)}
                  >
                    <Icon name="Volume2" size={16} className="text-muted-foreground" />
                    <span className="truncate">{channel.name}</span>
                  </Button>
                  {inVoiceChat && voiceMembers.length > 0 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {voiceMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-2 px-2 py-1"
                        >
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs truncate">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </ScrollArea>

        {inVoiceChat && (
          <div className="p-3 border-t bg-accent/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">Голосовой чат</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setInVoiceChat(false)}
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Mic" size={14} />
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Headphones" size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col bg-background">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              name={currentChannel?.type === 'voice' ? 'Volume2' : 'Hash'}
              size={20}
              className="text-muted-foreground"
            />
            <div>
              <h3 className="font-semibold">{currentChannel?.name}</h3>
              <p className="text-xs text-muted-foreground">
                {currentChannel?.description}
              </p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.filter((m) => m.isPinned).length > 0 && (
              <div className="bg-accent/50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Pin" size={14} className="text-primary" />
                  <span className="text-xs font-semibold">ЗАКРЕПЛЁННЫЕ</span>
                </div>
                {messages
                  .filter((m) => m.isPinned)
                  .map((message) => (
                    <div key={message.id} className="text-sm">
                      <span className="font-semibold">{message.senderName}:</span>{' '}
                      {message.content}
                    </div>
                  ))}
              </div>
            )}

            {messages.map((message, index) => {
              const member = members.find((m) => m.id === message.senderId);
              const showAvatar =
                index === 0 || messages[index - 1].senderId !== message.senderId;

              return (
                <div key={message.id} className="flex gap-3 group">
                  {showAvatar ? (
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                      <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString('ru', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    {showAvatar && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold ${member ? roleColors[member.role] : ''}`}>
                          {message.senderName}
                        </span>
                        {member && roleBadges[member.role] && (
                          <Badge variant="secondary" className="text-xs h-4 px-1">
                            {roleBadges[member.role]}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {getTimeAgo(message.timestamp)}
                        </span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder={`Сообщение в #${currentChannel?.name}`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
              <Icon name="Send" size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-60 border-l bg-background">
        <Tabs defaultValue="members" className="h-full flex flex-col">
          <TabsList className="w-full rounded-none">
            <TabsTrigger value="members" className="flex-1">
              Участники
            </TabsTrigger>
          </TabsList>
          <TabsContent value="members" className="flex-1 mt-0">
            <ScrollArea className="h-full">
              <div className="p-2">
                <p className="text-xs font-semibold text-muted-foreground px-2 mb-2">
                  ОНЛАЙН — {onlineMembers.length}
                </p>
                {onlineMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${roleColors[member.role]}`}>
                        {member.name}
                      </p>
                      {member.status === 'in-game' && (
                        <p className="text-xs text-muted-foreground truncate">
                          В игре
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

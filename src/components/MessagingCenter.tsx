import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Image as ImageIcon, Search, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChatConversation, ChatMessage } from '@/types/notifications';
import Icon from '@/components/ui/icon';

interface MessagingCenterProps {
  conversations: ChatConversation[];
  currentConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
  onSendMessage: (conversationId: string, message: string) => void;
}

export default function MessagingCenter({
  conversations,
  currentConversationId,
  onSelectConversation,
  onSendMessage,
}: MessagingCenterProps) {
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations.find((c) => c.id === currentConversationId);

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentConversationId) {
      const mockMessages: ChatMessage[] = [
        {
          id: '1',
          senderId: currentConversation?.participantId || 0,
          senderName: currentConversation?.participantName || '',
          senderAvatar: currentConversation?.participantAvatar || '',
          recipientId: 1,
          content: 'Привет! Как дела?',
          timestamp: Date.now() - 3600000,
          read: true,
          type: 'text',
        },
        {
          id: '2',
          senderId: 1,
          senderName: 'Вы',
          senderAvatar: '/placeholder-avatar.jpg',
          recipientId: currentConversation?.participantId || 0,
          content: 'Всё отлично! Поиграем?',
          timestamp: Date.now() - 3000000,
          read: true,
          type: 'text',
        },
        {
          id: '3',
          senderId: currentConversation?.participantId || 0,
          senderName: currentConversation?.participantName || '',
          senderAvatar: currentConversation?.participantAvatar || '',
          recipientId: 1,
          content: 'Конечно! Запускаю игру 🎮',
          timestamp: Date.now() - 1800000,
          read: true,
          type: 'text',
        },
      ];
      setMessages(mockMessages);
    }
  }, [currentConversationId]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentConversationId) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 1,
      senderName: 'Вы',
      senderAvatar: '/placeholder-avatar.jpg',
      recipientId: currentConversation?.participantId || 0,
      content: messageInput,
      timestamp: Date.now(),
      read: false,
      type: 'text',
    };

    setMessages([...messages, newMessage]);
    onSendMessage(currentConversationId, messageInput);
    setMessageInput('');
  };

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'только что';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ч`;
    return `${Math.floor(seconds / 86400)} дн`;
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    'in-game': 'bg-blue-500',
    away: 'bg-yellow-500',
  };

  return (
    <div className="flex h-[700px] border rounded-lg overflow-hidden">
      <div className="w-80 border-r flex flex-col bg-background">
        <div className="p-4 border-b">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск чатов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer transition-colors hover:bg-accent/50 ${
                  currentConversationId === conversation.id ? 'bg-accent' : ''
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />
                      <AvatarFallback>{conversation.participantName[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${statusColors[conversation.participantStatus]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm truncate">
                        {conversation.participantName}
                      </h4>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {getTimeAgo(conversation.lastMessageTime)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-1 bg-primary">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col bg-background">
        {currentConversation ? (
          <>
            <div className="p-4 border-b flex items-center justify-between bg-background">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={currentConversation.participantAvatar} alt={currentConversation.participantName} />
                    <AvatarFallback>{currentConversation.participantName[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${statusColors[currentConversation.participantStatus]}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{currentConversation.participantName}</h3>
                  <p className="text-xs text-muted-foreground capitalize">
                    {currentConversation.participantStatus === 'in-game' ? 'В игре' : currentConversation.participantStatus}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Icon name="Phone" size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Video" size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="MoreVertical" size={18} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => {
                  const isOwn = message.senderId === 1;
                  const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;

                  return (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                    >
                      {showAvatar ? (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                          <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8" />
                      )}
                      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                        {showAvatar && (
                          <span className="text-xs text-muted-foreground mb-1">
                            {message.senderName}
                          </span>
                        )}
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-accent'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {getTimeAgo(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Icon name="Paperclip" size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Image" size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Smile" size={18} />
                </Button>
                <Input
                  placeholder="Введите сообщение..."
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-30" />
              <p>Выберите чат, чтобы начать общение</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

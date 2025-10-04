import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

interface ChatSession {
  id: number;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  status: string;
  created_at: string;
  updated_at: string;
  lastMessage?: string;
}

interface ChatMessage {
  id: number;
  session_id: number;
  sender: string;
  message_text: string;
  created_at: string;
}

export default function Manager() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyText, setReplyText] = useState('');

  const MANAGER_PASSWORD = 'god2024store';

  useEffect(() => {
    const authStatus = sessionStorage.getItem('manager_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadSessions();
    }
  }, []);

  const handleLogin = () => {
    if (password === MANAGER_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('manager_auth', 'true');
      loadSessions();
    } else {
      alert('Неверный пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('manager_auth');
    navigate('/');
  };

  const loadSessions = async () => {
    setSessions([
      {
        id: 1,
        user_email: 'demo@example.com',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        lastMessage: 'Привет! Есть ли скидки на Cyberpunk?',
      },
    ]);
  };

  const loadMessages = (sessionId: number) => {
    setMessages([
      {
        id: 1,
        session_id: sessionId,
        sender: 'user',
        message_text: 'Привет! Есть ли скидки на Cyberpunk?',
        created_at: new Date().toISOString(),
      },
    ]);
  };

  const handleSelectSession = (session: ChatSession) => {
    setSelectedSession(session);
    loadMessages(session.id);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedSession) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      session_id: selectedSession.id,
      sender: 'manager',
      message_text: replyText,
      created_at: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setReplyText('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-neon-purple/30">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                <Icon name="Shield" size={40} className="mx-auto mb-4 text-neon-purple" />
                Вход для менеджера
              </CardTitle>
              <CardDescription className="text-center">
                Введите пароль для доступа к панели управления
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-neon-purple to-neon-pink">
                  Войти
                </Button>
                <Button onClick={() => navigate('/')} variant="outline" className="w-full">
                  Назад на сайт
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="LayoutDashboard" size={24} className="text-neon-purple" />
            <h1 className="text-xl font-bold">Панель менеджера</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate('/')} variant="outline">
              <Icon name="Home" size={16} className="mr-2" />
              На сайт
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="chats" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="chats">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Чаты
            </TabsTrigger>
            <TabsTrigger value="stats">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chats">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 border-neon-purple/30">
                <CardHeader>
                  <CardTitle className="text-lg">Активные чаты ({sessions.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => handleSelectSession(session)}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedSession?.id === session.id ? 'bg-neon-purple/10' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon name="User" size={16} className="text-muted-foreground" />
                            <span className="font-medium text-sm">
                              {session.user_email || 'Гость'}
                            </span>
                          </div>
                          <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                            {session.status === 'active' ? 'Активен' : 'Закрыт'}
                          </Badge>
                        </div>
                        {session.lastMessage && (
                          <p className="text-xs text-muted-foreground truncate">
                            {session.lastMessage}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(session.created_at).toLocaleString('ru-RU')}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 border-neon-purple/30">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedSession ? (
                      <div className="flex items-center gap-2">
                        <Icon name="MessageSquare" size={20} />
                        Чат с {selectedSession.user_email || 'гостем'}
                      </div>
                    ) : (
                      'Выберите чат'
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedSession ? (
                    <>
                      <ScrollArea className="h-[450px] mb-4 border rounded-lg p-4">
                        <div className="space-y-4">
                          {messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === 'manager' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                  msg.sender === 'manager'
                                    ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
                                    : 'bg-muted'
                                }`}
                              >
                                <p className="text-sm">{msg.message_text}</p>
                                <p className={`text-xs mt-1 ${msg.sender === 'manager' ? 'text-white/70' : 'text-muted-foreground'}`}>
                                  {new Date(msg.created_at).toLocaleTimeString('ru-RU')}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Введите ответ..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                        />
                        <Button onClick={handleSendReply} className="bg-gradient-to-r from-neon-purple to-neon-pink">
                          <Icon name="Send" size={16} />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="h-[500px] flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Выберите чат из списка слева</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-neon-purple/30">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Всего чатов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-neon-purple">1</p>
                  <p className="text-xs text-muted-foreground mt-1">За всё время</p>
                </CardContent>
              </Card>

              <Card className="border-neon-green/30">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Активных чатов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-neon-green">1</p>
                  <p className="text-xs text-muted-foreground mt-1">Требуют ответа</p>
                </CardContent>
              </Card>

              <Card className="border-neon-pink/30">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Среднее время ответа
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-neon-pink">2м</p>
                  <p className="text-xs text-muted-foreground mt-1">За последние 7 дней</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

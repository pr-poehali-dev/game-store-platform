import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const QUICK_REPLIES = [
  { id: '1', text: '🎮 Посоветуй игру для PlayStation', icon: 'Gamepad2' },
  { id: '2', text: '🎯 Посоветуй игру для Xbox', icon: 'Target' },
  { id: '3', text: '💰 Какие игры со скидками?', icon: 'Tag' },
  { id: '4', text: '🔥 Что сейчас популярно?', icon: 'TrendingUp' },
  { id: '5', text: '⭐ Лучшие эксклюзивы PS5', icon: 'Star' },
  { id: '6', text: '🎖️ Лучшие шутеры', icon: 'Crosshair' },
];

const GROK_API_URL = 'https://functions.poehali.dev/c25a9f0d-aae2-47db-ab57-9583c8539c3d';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: 'Привет! 👋 Я AI-консультант магазина консольных игр. Помогу выбрать игру для PlayStation или Xbox! Спрашивайте что угодно 🎮',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setShowQuickReplies(false);

    try {
      const response = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: text,
          game_title: ''
        })
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer || 'Извините, произошла ошибка. Попробуйте позже.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Не удалось получить ответ. Проверьте соединение с интернетом.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleBackToQuestions = () => {
    setShowQuickReplies(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-8 w-[95vw] md:w-96 h-[600px] z-50"
          >
            <Card className="h-full flex flex-col bg-background/95 backdrop-blur-xl border-neon-purple/30 shadow-2xl shadow-neon-purple/20">
              <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-neon-purple/20 to-neon-pink/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
                      <Icon name="Bot" size={20} className="text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">AI-Менеджер</h3>
                    <p className="text-xs text-muted-foreground">Онлайн • Отвечает мгновенно</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <Icon name="X" size={18} />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {showQuickReplies && (
                <div className="px-4 pb-3">
                  <p className="text-xs text-muted-foreground mb-2">Быстрые ответы:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_REPLIES.map((reply) => (
                      <Button
                        key={reply.id}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-2 justify-start border-neon-purple/30 hover:bg-neon-purple/10"
                        onClick={() => handleSendMessage(reply.text)}
                      >
                        <span className="truncate">{reply.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {!showQuickReplies && messages.length > 2 && (
                <div className="px-4 pb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-neon-purple/30 hover:bg-neon-purple/10"
                    onClick={handleBackToQuestions}
                  >
                    <Icon name="RotateCcw" size={14} className="mr-2" />
                    Вернуться к вопросам
                  </Button>
                </div>
              )}

              <div className="p-4 border-t border-border">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Напишите сообщение..."
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90"
                  >
                    <Icon name="Send" size={18} />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 md:right-8 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink shadow-lg shadow-neon-purple/50 hover:shadow-neon-purple/70 hover:scale-110 transition-all"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <Icon name="X" size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Icon name="MessageCircle" size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
          >
            1
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
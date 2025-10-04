import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  isTyping?: boolean;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! 👋 Я онлайн-помощник GodStoreGame. Чем могу помочь?',
      sender: 'support',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen && !hasInteracted) {
      const timer = setTimeout(() => {
        setUnreadCount(1);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasInteracted]);

  const quickReplies = [
    { text: 'Как оплатить?', icon: 'CreditCard' },
    { text: 'Сроки доставки', icon: 'Clock' },
    { text: 'Возврат средств', icon: 'RefreshCw' },
    { text: 'Активация ключа', icon: 'Key' },
  ];

  const getAutoResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('оплат') || msg.includes('платить') || msg.includes('цена')) {
      return 'Мы принимаем банковские карты, СБП, Qiwi, ЮMoney и криптовалюту. Оплата полностью безопасна! 💳';
    }
    
    if (msg.includes('доставк') || msg.includes('получ') || msg.includes('когда')) {
      return 'Цифровые ключи доставляются моментально после оплаты! ⚡ Проверьте email или личный кабинет.';
    }
    
    if (msg.includes('возврат') || msg.includes('вернуть') || msg.includes('отмен')) {
      return 'Возврат возможен в течение 14 дней, если товар не был активирован. Напишите в поддержку! 🔄';
    }
    
    if (msg.includes('актив') || msg.includes('ключ') || msg.includes('код')) {
      return 'Для активации ключа: откройте магазин на консоли → Погасить код → введите ключ из письма. Готово! 🎮';
    }
    
    if (msg.includes('скидк') || msg.includes('акци') || msg.includes('промо')) {
      return 'Подпишитесь на рассылку, чтобы первыми узнавать о скидках до 70%! Промокод GAME10 даст -10% на первую покупку! 🎁';
    }

    if (msg.includes('проблем') || msg.includes('не работ') || msg.includes('ошибк')) {
      return 'Опишите проблему подробнее, и я постараюсь помочь! Или свяжитесь с поддержкой: support@godstore.game 📧';
    }

    if (msg.includes('привет') || msg.includes('здравств')) {
      return 'Привет! 👋 Готов ответить на любые вопросы о нашем магазине!';
    }

    if (msg.includes('спасибо') || msg.includes('благодар')) {
      return 'Всегда рад помочь! Обращайтесь! 😊';
    }
    
    return 'Спасибо за вопрос! Для детальной консультации свяжитесь с поддержкой: support@godstore.game или в Telegram @godstoregame 💬';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setHasInteracted(true);
    setUnreadCount(0);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getAutoResponse(inputValue);
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'support',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, supportMessage]);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (text: string) => {
    setInputValue(text);
    handleSendMessage();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      setHasInteracted(true);
    }
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
            className="fixed bottom-24 right-4 z-50 w-[380px] max-h-[600px]"
          >
            <Card className="border-2 border-neon-purple/50 shadow-2xl shadow-neon-purple/20">
              <CardHeader className="bg-gradient-to-r from-neon-purple to-neon-pink p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <Icon name="Headphones" size={20} className="text-neon-purple" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <CardTitle className="text-white text-base">Поддержка</CardTitle>
                      <p className="text-xs text-white/80">Онлайн • Обычно отвечаем за минуту</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={toggleChat}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    <Icon name="X" size={18} />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[380px] p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                            {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
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
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>

                {!hasInteracted && (
                  <div className="px-4 pb-3">
                    <p className="text-xs text-muted-foreground mb-2">Популярные вопросы:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickReplies.map((reply) => (
                        <Button
                          key={reply.text}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickReply(reply.text)}
                          className="text-xs justify-start h-auto py-2"
                        >
                          <Icon name={reply.icon as any} size={12} className="mr-1" />
                          {reply.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Напишите сообщение..."
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90"
                      size="icon"
                    >
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={toggleChat}
          size="lg"
          className="h-16 w-16 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink shadow-lg shadow-neon-purple/50 hover:shadow-neon-purple/70 transition-all relative"
        >
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white px-2 py-1 text-xs">
              {unreadCount}
            </Badge>
          )}
          {isOpen ? (
            <Icon name="X" size={24} />
          ) : (
            <Icon name="MessageCircle" size={24} />
          )}
        </Button>
      </motion.div>
    </>
  );
}

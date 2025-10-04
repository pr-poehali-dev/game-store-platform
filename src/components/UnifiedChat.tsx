import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWidget from '@/components/ChatWidget';
import LiveChat from '@/components/LiveChat';

export default function UnifiedChat() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<'none' | 'ai' | 'live'>('none');

  const handleChatSelect = (type: 'ai' | 'live') => {
    setActiveChat(type);
    setIsMenuOpen(false);
  };

  return (
    <>
      {activeChat === 'ai' && <ChatWidget />}
      {activeChat === 'live' && <LiveChat />}
      
      <AnimatePresence>
        {isMenuOpen && activeChat === 'none' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-4 z-50"
          >
            <Card className="p-4 bg-card/95 backdrop-blur-xl border-2 border-primary/30 shadow-2xl w-80">
              <div className="space-y-3">
                <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Выберите тип чата
                </h3>
                
                <Button
                  onClick={() => handleChatSelect('ai')}
                  className="w-full h-auto py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Icon name="Bot" size={24} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold">🤖 AI-Консультант</div>
                      <div className="text-xs opacity-90">Мгновенные ответы • Круглосуточно</div>
                    </div>
                    <Badge className="bg-green-500">Онлайн</Badge>
                  </div>
                </Button>

                <Button
                  onClick={() => handleChatSelect('live')}
                  variant="outline"
                  className="w-full h-auto py-4 border-2 hover:bg-primary/10 transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Icon name="MessageCircle" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold">👨‍💼 Живой оператор</div>
                      <div className="text-xs text-muted-foreground">Персональная помощь</div>
                    </div>
                    <Badge variant="secondary">Доступен</Badge>
                  </div>
                </Button>

                <div className="pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>💡 <strong>AI-консультант:</strong> быстрые ответы на вопросы об играх</p>
                    <p>👤 <strong>Оператор:</strong> помощь с заказами и оплатой</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 left-4 z-40"
      >
        {activeChat === 'none' ? (
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            size="icon"
            className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-110 transition-all relative"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <Icon name="X" size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="relative"
                >
                  <Icon name="MessageCircle" size={28} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        ) : (
          <Button
            onClick={() => {
              setActiveChat('none');
              setIsMenuOpen(false);
            }}
            size="icon"
            className="h-16 w-16 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg hover:scale-110 transition-all"
          >
            <Icon name="X" size={28} />
          </Button>
        )}
      </motion.div>
    </>
  );
}

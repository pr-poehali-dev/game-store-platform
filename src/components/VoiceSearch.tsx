import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export default function VoiceSearch() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Проверяем поддержку Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ru-RU';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);

      if (event.results[current].isFinal) {
        handleVoiceCommand(transcriptText);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed') {
        toast({
          title: '🎤 Нет доступа к микрофону',
          description: 'Разрешите доступ к микрофону в настройках браузера',
          variant: 'destructive'
        });
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript('');
    };

    const startListening = () => {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    };

    const stopListening = () => {
      recognition.stop();
    };

    // Сохраняем функции в глобальный объект для доступа из компонента
    (window as any).voiceSearchStart = startListening;
    (window as any).voiceSearchStop = stopListening;

    return () => {
      recognition.stop();
    };
  }, [toast]);

  const toggleListening = () => {
    if (isListening) {
      (window as any).voiceSearchStop?.();
    } else {
      (window as any).voiceSearchStart?.();
    }
  };

  // Сделаем функцию доступной глобально
  useEffect(() => {
    (window as any).toggleVoiceSearch = toggleListening;
  }, [isListening]);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();

    // Поиск игр
    if (lowerCommand.includes('найди') || lowerCommand.includes('покажи') || lowerCommand.includes('ищу')) {
      const searchTerm = command
        .replace(/найди|покажи|ищу|игру|игры/gi, '')
        .trim();
      
      if (searchTerm) {
        const searchInput = document.querySelector('input[placeholder*="Поиск"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.value = searchTerm;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        toast({
          title: '🔍 Поиск запущен',
          description: `Ищу: ${searchTerm}`
        });
      }
    }
    // Навигация
    else if (lowerCommand.includes('профиль') || lowerCommand.includes('аккаунт')) {
      window.location.href = '/profile';
      toast({ title: '👤 Открываю профиль' });
    }
    else if (lowerCommand.includes('избранное') || lowerCommand.includes('желания')) {
      window.location.href = '/wishlist';
      toast({ title: '⭐ Открываю избранное' });
    }
    else if (lowerCommand.includes('турнир')) {
      window.location.href = '/tournaments';
      toast({ title: '🏆 Открываю турниры' });
    }
    else if (lowerCommand.includes('рейтинг') || lowerCommand.includes('лидер')) {
      const leaderboard = document.querySelector('[data-section="leaderboard"]');
      leaderboard?.scrollIntoView({ behavior: 'smooth' });
      toast({ title: '🏆 Перехожу к рейтингу' });
    }
    else if (lowerCommand.includes('новост')) {
      const news = document.querySelector('[data-section="news"]');
      news?.scrollIntoView({ behavior: 'smooth' });
      toast({ title: '📰 Перехожу к новостям' });
    }
    else if (lowerCommand.includes('акци') || lowerCommand.includes('скидк')) {
      const lootbox = document.querySelector('[data-section="lootbox"]');
      lootbox?.scrollIntoView({ behavior: 'smooth' });
      toast({ title: '🎁 Перехожу к акциям' });
    }
    // Фильтры
    else if (lowerCommand.includes('playstation') || lowerCommand.includes('плейстейшн')) {
      toast({ title: '🎮 Фильтр: PlayStation' });
      // Здесь можно добавить логику фильтрации
    }
    else if (lowerCommand.includes('xbox') || lowerCommand.includes('иксбокс')) {
      toast({ title: '🎮 Фильтр: Xbox' });
    }
    else {
      toast({
        title: '❓ Команда не распознана',
        description: `Вы сказали: "${command}"`,
        variant: 'destructive'
      });
    }
  };

  // Проверяем поддержку API
  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  if (!isSupported) {
    return null; // Не показываем кнопку если браузер не поддерживает
  }

  return (
    <>
      <div className="fixed top-36 right-4 z-50">
        <Button
          onClick={toggleListening}
          className={`relative shadow-lg hover:scale-110 transition-all duration-300 ${
            isListening
              ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
              : 'bg-gradient-to-r from-purple-500 to-violet-500'
          }`}
          size="lg"
        >
          <Icon name={isListening ? 'MicOff' : 'Mic'} size={20} />
          {isListening && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-52 right-4 z-50 w-80"
          >
            <Card className="bg-card/95 backdrop-blur-xl border-2 border-purple-500/50 shadow-2xl">
              {/* Визуализация звука */}
              <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse" />
                <div className="flex items-center justify-center h-16 gap-1 mt-2">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
                      animate={{
                        height: [4, Math.random() * 40 + 10, 4],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold">Слушаю...</span>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-3 min-h-[60px]">
                  {transcript ? (
                    <p className="text-sm">{transcript}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      Скажите команду...
                    </p>
                  )}
                </div>

                <div className="mt-3 text-xs text-muted-foreground space-y-1">
                  <p>💡 Примеры команд:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li>"Найди GTA"</li>
                    <li>"Открой профиль"</li>
                    <li>"Покажи рейтинг"</li>
                    <li>"Перейди к акциям"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
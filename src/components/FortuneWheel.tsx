import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Prize {
  id: number;
  label: string;
  value: string;
  color: string;
  icon: string;
  probability: number;
}

const prizes: Prize[] = [
  { id: 1, label: '100₽', value: '100₽ кешбэка', color: '#4CAF50', icon: 'Coins', probability: 30 },
  { id: 2, label: '5%', value: '5% скидка на следующую покупку', color: '#2196F3', icon: 'Percent', probability: 25 },
  { id: 3, label: '500₽', value: '500₽ кешбэка', color: '#9C27B0', icon: 'Gem', probability: 15 },
  { id: 4, label: '10%', value: '10% скидка на следующую покупку', color: '#FF9800', icon: 'Tag', probability: 15 },
  { id: 5, label: 'Игра', value: 'Бесплатная игра до 1000₽', color: '#F44336', icon: 'Gift', probability: 5 },
  { id: 6, label: '1000₽', value: '1000₽ кешбэка', color: '#FFD700', icon: 'Trophy', probability: 3 },
  { id: 7, label: '50₽', value: '50₽ кешбэка', color: '#00BCD4', icon: 'DollarSign', probability: 7 }
];

interface FortuneWheelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FortuneWheel({ isOpen, onClose }: FortuneWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [canSpin, setCanSpin] = useState(true);
  const [nextSpinTime, setNextSpinTime] = useState<string | null>(null);
  const { toast } = useToast();

  const checkCanSpin = () => {
    const lastSpin = localStorage.getItem('lastWheelSpin');
    if (!lastSpin) return true;

    const lastSpinTime = new Date(lastSpin);
    const now = new Date();
    const diff = now.getTime() - lastSpinTime.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 24) {
      const nextSpin = new Date(lastSpinTime.getTime() + 24 * 60 * 60 * 1000);
      setNextSpinTime(nextSpin.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
      return false;
    }
    return true;
  };

  const selectPrize = (): Prize => {
    const random = Math.random() * 100;
    let accumulated = 0;

    for (const prize of prizes) {
      accumulated += prize.probability;
      if (random <= accumulated) {
        return prize;
      }
    }
    return prizes[0];
  };

  const spinWheel = () => {
    if (!checkCanSpin()) {
      toast({
        title: '⏰ Слишком рано!',
        description: `Следующий спин доступен в ${nextSpinTime}`,
        variant: 'destructive'
      });
      return;
    }

    if (isSpinning) return;

    setIsSpinning(true);
    setWonPrize(null);

    const selectedPrize = selectPrize();
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id);
    const segmentAngle = 360 / prizes.length;
    const targetAngle = prizeIndex * segmentAngle;
    
    const spins = 5;
    const randomOffset = Math.random() * (segmentAngle * 0.8) + (segmentAngle * 0.1);
    const finalRotation = rotation + (360 * spins) + (360 - targetAngle) + randomOffset;

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize);
      setCanSpin(false);
      localStorage.setItem('lastWheelSpin', new Date().toISOString());
      
      const nextSpin = new Date();
      nextSpin.setHours(nextSpin.getHours() + 24);
      setNextSpinTime(nextSpin.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));

      toast({
        title: '🎉 Поздравляем!',
        description: `Вы выиграли: ${selectedPrize.value}`,
      });
    }, 4000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-card via-card/95 to-primary/10">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="CircleDot" size={24} className="text-primary animate-spin" style={{ animationDuration: '3s' }} />
            Колесо фортуны
          </DialogTitle>
          <DialogDescription>
            {canSpin && !wonPrize 
              ? 'Вращайте колесо и выигрывайте призы! Один спин раз в 24 часа.'
              : nextSpinTime 
                ? `Следующий спин доступен в ${nextSpinTime}`
                : 'Вращайте колесо и выигрывайте призы!'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-8 space-y-6">
          <div className="relative mx-auto w-80 h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"></div>
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
              <Icon name="ChevronDown" size={40} className="text-primary drop-shadow-lg" />
            </div>

            <motion.div
              className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
              style={{
                rotate: rotation,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
              }}
              transition={{ 
                duration: 4, 
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
            >
              {prizes.map((prize, index) => {
                const segmentAngle = 360 / prizes.length;
                const startAngle = index * segmentAngle;
                
                return (
                  <div
                    key={prize.id}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${startAngle}deg)`,
                      transformOrigin: 'center'
                    }}
                  >
                    <div
                      className="absolute w-full h-1/2 origin-bottom flex items-start justify-center pt-6"
                      style={{
                        clipPath: `polygon(50% 100%, ${50 - Math.tan((segmentAngle / 2) * Math.PI / 180) * 100}% 0, ${50 + Math.tan((segmentAngle / 2) * Math.PI / 180) * 100}% 0)`,
                        background: prize.color
                      }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Icon name={prize.icon as any} size={20} className="text-white drop-shadow" />
                        <span className="text-white font-bold text-sm drop-shadow">{prize.label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-card border-4 border-primary shadow-lg flex items-center justify-center">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center space-y-4">
            {!wonPrize && (
              <Button
                onClick={spinWheel}
                disabled={isSpinning}
                size="lg"
                className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-lg px-8 py-6"
              >
                {isSpinning ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Вращается...
                  </>
                ) : (
                  <>
                    <Icon name="Play" size={20} className="mr-2" />
                    Крутить колесо!
                  </>
                )}
              </Button>
            )}

            {wonPrize && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-3"
              >
                <div className="p-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl border-2 border-primary">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Icon name={wonPrize.icon as any} size={32} className="text-primary" />
                    <h3 className="text-2xl font-bold">Вы выиграли!</h3>
                  </div>
                  <p className="text-xl font-semibold text-primary">{wonPrize.value}</p>
                </div>
                <Button
                  onClick={onClose}
                  variant="outline"
                  size="lg"
                >
                  Забрать приз
                </Button>
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {prizes.map(prize => (
              <div key={prize.id} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-4 h-4 rounded" 
                  style={{ backgroundColor: prize.color }}
                />
                <span className="text-muted-foreground">{prize.value}</span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

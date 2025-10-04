import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuickAccessPanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    { 
      icon: 'Zap', 
      label: 'Быстрая покупка', 
      color: 'from-yellow-500 to-orange-500',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    { 
      icon: 'TrendingUp', 
      label: 'Топ продаж', 
      color: 'from-green-500 to-emerald-500',
      action: () => {
        const element = document.querySelector('[data-section="catalog"]');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      icon: 'Star', 
      label: 'Избранное', 
      color: 'from-pink-500 to-rose-500',
      action: () => window.location.href = '/wishlist'
    },
    { 
      icon: 'Gift', 
      label: 'Акции', 
      color: 'from-purple-500 to-violet-500',
      action: () => {
        const element = document.querySelector('[data-section="lootbox"]');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      icon: 'Trophy', 
      label: 'Рейтинг', 
      color: 'from-blue-500 to-cyan-500',
      action: () => {
        const element = document.querySelector('[data-section="leaderboard"]');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="mb-3"
          >
            <Card className="bg-card/95 backdrop-blur-xl border-2 border-primary/20 shadow-2xl p-2">
              <div className="flex flex-col gap-2">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      onClick={action.action}
                      className={`w-full justify-start bg-gradient-to-r ${action.color} hover:scale-105 transition-transform`}
                      size="sm"
                    >
                      <Icon name={action.icon} size={16} className="mr-2" />
                      {action.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-gradient-to-r from-primary to-secondary shadow-2xl hover:scale-110 transition-all duration-300 ${
          isExpanded ? 'rotate-180' : ''
        }`}
        size="lg"
      >
        <Icon name={isExpanded ? 'ChevronLeft' : 'Menu'} size={24} />
      </Button>
    </div>
  );
}

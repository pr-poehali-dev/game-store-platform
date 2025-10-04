import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { 
  requestNotificationPermission, 
  subscribeToPushNotifications,
  checkNotificationPermission,
  isSubscribedToPush 
} from '@/utils/pushNotifications';

export default function NotificationPermissionBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      const permission = await checkNotificationPermission();
      const subscribed = await isSubscribedToPush();
      
      const hasSeenBanner = localStorage.getItem('notification_banner_seen');
      
      if (permission === 'default' && !subscribed && !hasSeenBanner) {
        setTimeout(() => setShowBanner(true), 5000);
      }
    };

    checkPermission();
  }, []);

  const handleEnable = async () => {
    setIsSubscribing(true);
    
    try {
      const subscription = await subscribeToPushNotifications();
      
      if (subscription) {
        setShowBanner(false);
        localStorage.setItem('notification_banner_seen', 'true');
      }
    } catch (error) {
      console.error('Failed to subscribe:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('notification_banner_seen', 'true');
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <div className="bg-gradient-to-br from-primary/90 to-primary/80 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-primary/50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-white/20 rounded-full p-3">
                <Icon name="Bell" size={24} className="text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">
                  Не пропустите скидки!
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Получайте уведомления о новых скидках и акциях на любимые игры
                </p>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleEnable}
                    disabled={isSubscribing}
                    className="bg-white text-primary hover:bg-white/90 font-semibold"
                  >
                    {isSubscribing ? (
                      <>
                        <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                        Включаем...
                      </>
                    ) : (
                      <>
                        <Icon name="BellRing" size={16} className="mr-2" />
                        Включить
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={handleDismiss}
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    Позже
                  </Button>
                </div>
              </div>
              
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

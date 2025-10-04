import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/icon';
import { checkOnlineStatus, addOnlineListener, addOfflineListener } from '@/utils/registerServiceWorker';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(checkOnlineStatus());
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    const removeOnlineListener = addOnlineListener(handleOnline);
    const removeOfflineListener = addOfflineListener(handleOffline);

    return () => {
      removeOnlineListener();
      removeOfflineListener();
    };
  }, []);

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl backdrop-blur-xl border-2 ${
              isOnline
                ? 'bg-green-500/90 border-green-400 text-white'
                : 'bg-orange-500/90 border-orange-400 text-white'
            }`}
          >
            <Icon
              name={isOnline ? 'Wifi' : 'WifiOff'}
              size={20}
              className="animate-pulse"
            />
            <span className="font-semibold text-sm">
              {isOnline ? 'Подключение восстановлено' : 'Офлайн режим'}
            </span>
          </div>
        </motion.div>
      )}
      
      {!isOnline && !showNotification && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/80 backdrop-blur-lg rounded-full border border-orange-400 text-white text-xs shadow-lg">
            <Icon name="WifiOff" size={14} />
            <span>Офлайн</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

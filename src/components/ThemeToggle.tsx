import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="rounded-full bg-background/50 backdrop-blur-sm border-2 hover:scale-110 transition-transform"
        aria-label="Переключить тему"
      >
        {theme === 'dark' ? (
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon name="Sun" size={20} className="text-yellow-500" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon name="Moon" size={20} className="text-blue-500" />
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
}

import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      className="h-9 w-9 p-0"
      aria-label="Переключить тему"
    >
      {theme === 'dark' ? (
        <Icon name="Sun" size={18} className="text-yellow-500" />
      ) : (
        <Icon name="Moon" size={18} className="text-blue-500" />
      )}
    </Button>
  );
}
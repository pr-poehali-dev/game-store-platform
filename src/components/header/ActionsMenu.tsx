import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

export const ActionsMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
          <Icon name="MoreVertical" size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Быстрые действия</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <a href="/tournaments" className="flex items-center gap-2 cursor-pointer">
            <Icon name="Trophy" size={16} className="text-yellow-500" />
            <span>Турниры</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => {
            const element = document.querySelector('[data-section="leaderboard"]');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Icon name="Award" size={16} className="text-orange-500" />
          <span>Рейтинг игроков</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => {
            const element = document.querySelector('[data-section="comparison"]');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            } else {
              (window as any).showGameComparison?.();
            }
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Icon name="Scale" size={16} className="text-cyan-500" />
          <span>Сравнить игры</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => (window as any).showFortuneWheel?.()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Icon name="CircleDot" size={16} className="text-purple-500" />
          <span>Колесо фортуны</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => (window as any).toggleVoiceSearch?.()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Icon name="Mic" size={16} className="text-pink-500" />
          <span>Голосовой поиск</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <a href="/wishlist" className="flex items-center gap-2 cursor-pointer">
            <Icon name="Heart" size={16} className="text-red-500" />
            <span>Избранное</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
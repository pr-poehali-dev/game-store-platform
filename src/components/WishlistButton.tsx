import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface WishlistButtonProps {
  gameId: number;
  userId: number;
  isInWishlist: boolean;
  onToggle: () => void;
}

export default function WishlistButton({ gameId, userId, isInWishlist, onToggle }: WishlistButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);

    try {
      if (isInWishlist) {
        await fetch(`https://functions.poehali.dev/085014ea-8c98-4ea8-918e-7882a51b287c?game_id=${gameId}`, {
          method: 'DELETE',
          headers: { 'X-User-Id': userId.toString() }
        });
        toast.success('Удалено из списка желаний');
      } else {
        await fetch('https://functions.poehali.dev/085014ea-8c98-4ea8-918e-7882a51b287c', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': userId.toString()
          },
          body: JSON.stringify({ game_id: gameId, notify_on_sale: true })
        });
        toast.success('Добавлено в список желаний! Уведомим о скидках');
      }
      onToggle();
    } catch (error) {
      toast.error('Ошибка при обновлении списка желаний');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled={loading}
      className={isInWishlist ? 'border-neon-purple text-neon-purple' : ''}
    >
      <Icon name={isInWishlist ? "Heart" : "Heart"} size={16} className={isInWishlist ? "fill-current" : ""} />
      {isInWishlist ? 'В желаниях' : 'В список желаний'}
    </Button>
  );
}

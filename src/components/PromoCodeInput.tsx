import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface PromoCodeInputProps {
  purchaseAmount: number;
  onPromoApplied: (discount: number, code: string) => void;
  userIdentifier?: string;
}

export default function PromoCodeInput({ purchaseAmount, onPromoApplied, userIdentifier = 'anonymous' }: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; description: string } | null>(null);
  const { toast } = useToast();

  const validatePromoCode = async () => {
    if (!code.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите промокод',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/937dbb3b-6c25-4f23-b3e2-27bca4627638', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.toUpperCase(),
          userIdentifier,
          purchaseAmount,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAppliedPromo({
          code: data.code,
          discount: data.discount,
          description: data.description,
        });
        onPromoApplied(data.discount, data.code);
        toast({
          title: '🎉 Промокод применён!',
          description: `Скидка ${data.discount}% - ${data.description}`,
        });
        setCode('');
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Промокод недействителен',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось проверить промокод',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    onPromoApplied(0, '');
    toast({
      title: 'Промокод удалён',
      description: 'Скидка отменена',
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon name="Tag" size={20} className="text-primary" />
        <span className="font-semibold">Промокод</span>
      </div>
      
      {appliedPromo ? (
        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600 text-white">
              {appliedPromo.code}
            </Badge>
            <span className="text-sm text-green-600 font-semibold">
              -{appliedPromo.discount}%
            </span>
            <span className="text-xs text-muted-foreground">
              {appliedPromo.description}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removePromo}
            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Введите промокод"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && validatePromoCode()}
            className="flex-1"
          />
          <Button
            onClick={validatePromoCode}
            disabled={isLoading || !code.trim()}
            className="bg-gradient-to-r from-neon-purple to-neon-pink"
          >
            {isLoading ? (
              <Icon name="Loader2" size={20} className="animate-spin" />
            ) : (
              <>
                <Icon name="Check" size={20} className="mr-1" />
                Применить
              </>
            )}
          </Button>
        </div>
      )}
      
      {!appliedPromo && (
        <div className="text-xs text-muted-foreground">
          <Icon name="Sparkles" size={14} className="inline mr-1" />
          Скидка до 50%! Используйте промокоды при оформлении заказа
        </div>
      )}
    </div>
  );
}

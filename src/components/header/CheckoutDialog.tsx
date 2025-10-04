import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CartItem {
  id: string;
  type: 'game' | 'subscription';
  item: {
    id: number;
    price: number;
    [key: string]: any;
  };
  quantity: number;
}

interface CheckoutDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cart: CartItem[];
  discountedTotal: number;
  handleCheckout: () => void;
}

export default function CheckoutDialog({
  isOpen,
  setIsOpen,
  cart,
  discountedTotal,
  handleCheckout,
}: CheckoutDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-neon-pink text-white hover:bg-neon-pink/90 glow-pink">
          Оформить заказ
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle>Оформление заказа</DialogTitle>
          <DialogDescription>Заполните данные для доставки</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Имя</Label>
            <Input placeholder="Ваше имя" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="email@example.com" />
          </div>
          <div>
            <Label>Телефон</Label>
            <Input type="tel" placeholder="+7 (999) 123-45-67" />
          </div>
          
          {cart.some(item => item.type === 'game') && (
            <>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium mb-2 text-neon-purple">Данные аккаунта для покупки игр</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Укажите логин и пароль от вашего аккаунта PlayStation/Xbox для активации игр. 
                  Если хотите новый аккаунт - оставьте поля пустыми.
                </p>
              </div>
              <div>
                <Label>Логин аккаунта (опционально)</Label>
                <Input placeholder="Логин PlayStation/Xbox" />
              </div>
              <div>
                <Label>Пароль аккаунта (опционально)</Label>
                <Input type="password" placeholder="Пароль от аккаунта" />
              </div>
            </>
          )}

          <div>
            <Label>Способ оплаты</Label>
            <Select defaultValue="card">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Банковская карта</SelectItem>
                <SelectItem value="qr">QR-код (СБП)</SelectItem>
                <SelectItem value="crypto">Криптовалюта</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCheckout} className="w-full bg-neon-green text-background hover:bg-neon-green/90">
            Оплатить {discountedTotal}₽
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

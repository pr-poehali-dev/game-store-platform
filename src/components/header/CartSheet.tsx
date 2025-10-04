import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import PromoCodeInput from '@/components/PromoCodeInput';
import CheckoutDialog from './CheckoutDialog';

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

interface CartSheetProps {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  handleCheckout: () => void;
  promoDiscount: number;
  appliedPromoCode: string;
  onPromoApplied: (discount: number, code: string) => void;
  discountedTotal: number;
}

export default function CartSheet({
  cart,
  cartCount,
  cartTotal,
  isCartOpen,
  setIsCartOpen,
  isCheckoutOpen,
  setIsCheckoutOpen,
  updateQuantity,
  removeFromCart,
  handleCheckout,
  promoDiscount,
  appliedPromoCode,
  onPromoApplied,
  discountedTotal,
}: CartSheetProps) {
  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative border-neon-green text-neon-green hover:bg-neon-green/10">
          <Icon name="ShoppingCart" size={18} />
          {cartCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-neon-pink text-white px-1.5 py-0.5 text-xs">
              {cartCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-card border-border w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
          <SheetDescription>
            {cartCount} {cartCount === 1 ? 'товар' : 'товаров'} на сумму {cartTotal}₽
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-250px)] mt-6">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Корзина пустая</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((cartItem) => {
                const item = cartItem.item;
                const name = 'title' in item ? item.title : item.name;
                const price = item.price;
                return (
                  <Card key={cartItem.id} className="bg-muted/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{name}</CardTitle>
                      <CardDescription>{price}₽</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(cartItem.id, -1)}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center">{cartItem.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(cartItem.id, 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeFromCart(cartItem.id)}
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </ScrollArea>
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-card border-t border-border space-y-4">
            <PromoCodeInput
              purchaseAmount={cartTotal}
              onPromoApplied={onPromoApplied}
              userIdentifier={`user-${Date.now()}`}
            />
            
            {promoDiscount > 0 && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Сумма:</span>
                  <span className="line-through">{cartTotal}₽</span>
                </div>
                <div className="flex items-center justify-between text-green-600 font-semibold">
                  <span>Скидка ({appliedPromoCode}):</span>
                  <span>-{Math.round(cartTotal * promoDiscount / 100)}₽</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold">Итого:</span>
              <span className="text-2xl font-bold text-neon-green">{discountedTotal}₽</span>
            </div>
            
            <CheckoutDialog
              isOpen={isCheckoutOpen}
              setIsOpen={setIsCheckoutOpen}
              cart={cart}
              discountedTotal={discountedTotal}
              handleCheckout={handleCheckout}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

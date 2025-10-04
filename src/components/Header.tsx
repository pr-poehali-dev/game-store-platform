import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import AdminPanel from '@/components/AdminPanel';
import PromoCodeInput from '@/components/PromoCodeInput';
import ThemeToggle from '@/components/ThemeToggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import NotificationBadge from '@/components/NotificationBadge';
import PendingPurchasesBadge from '@/components/PendingPurchasesBadge';
import SyncStatusIndicator from '@/components/SyncStatusIndicator';

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

interface HeaderProps {
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
  adminPassword: string;
  setAdminPassword: (password: string) => void;
  isAdminAuth: boolean;
  handleAdminLogin: () => void;
  games: any[];
  subscriptions: any[];
  editingGame: any;
  setEditingGame: (game: any) => void;
  editingSubscription: any;
  setEditingSubscription: (sub: any) => void;
  handleSaveGame: (game: any) => void;
  handleDeleteGame: (id: number) => void;
  handleSaveSubscription: (sub: any) => void;
  handleDeleteSubscription: (id: number) => void;
}

export default function Header({
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
  adminPassword,
  setAdminPassword,
  isAdminAuth,
  handleAdminLogin,
  games,
  subscriptions,
  editingGame,
  setEditingGame,
  editingSubscription,
  setEditingSubscription,
  handleSaveGame,
  handleDeleteGame,
  handleSaveSubscription,
  handleDeleteSubscription,
}: HeaderProps) {
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePromoApplied = (discount: number, code: string) => {
    setPromoDiscount(discount);
    setAppliedPromoCode(code);
  };

  const discountedTotal = Math.round(cartTotal * (1 - promoDiscount / 100));

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-purple rounded-full blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-br from-neon-green via-neon-pink to-neon-purple p-1.5 sm:p-2 rounded-xl">
                <Icon name="Gamepad2" className="h-6 w-6 sm:h-8 sm:w-8 text-background" />
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-neon-green via-neon-pink to-neon-purple bg-clip-text text-transparent">
                GodStoreGame
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Магазин консольных игр</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-1 sm:gap-2 md:gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden h-8 w-8 p-0">
                  <Icon name="Menu" size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Icon name="Gamepad2" className="h-6 w-6 text-primary" />
                    Навигация
                  </SheetTitle>
                  <SheetDescription>
                    Выберите раздел
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-3 mt-6">
                  <a 
                    href="/#games" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <Icon name="Gamepad2" size={20} className="text-primary" />
                    <span className="font-medium">Игры</span>
                  </a>
                  <a 
                    href="/#subscriptions" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/10 transition-colors"
                  >
                    <Icon name="Star" size={20} className="text-secondary" />
                    <span className="font-medium">Подписки</span>
                  </a>
                  <a 
                    href="/tournaments" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <Icon name="Trophy" size={20} className="text-accent" />
                    <span className="font-medium">Турниры</span>
                  </a>
                  <a 
                    href="/wishlist" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-500/10 transition-colors"
                  >
                    <Icon name="Heart" size={20} className="text-pink-500" />
                    <span className="font-medium">Избранное</span>
                  </a>
                  <a 
                    href="/profile" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-500/10 transition-colors"
                  >
                    <Icon name="User" size={20} className="text-purple-500" />
                    <span className="font-medium">Профиль</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>

            <a href="/#games" className="text-sm md:text-base text-foreground hover:text-primary transition-colors hidden md:block">
              Игры
            </a>
            <a href="/#subscriptions" className="text-sm md:text-base text-foreground hover:text-secondary transition-colors hidden md:block">
              Подписки
            </a>
            <a href="/tournaments" className="text-sm md:text-base text-foreground hover:text-accent transition-colors hidden md:block">
              🏆 Турниры
            </a>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => (window as any).toggleVoiceSearch?.()}
                  variant="ghost" 
                  size="sm" 
                  className="relative border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 h-8 w-8 sm:h-9 sm:w-9 p-0"
                >
                  <Icon name="Mic" size={16} className="text-purple-500 sm:w-[18px] sm:h-[18px]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Голосовой поиск</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <NotificationBadge />
              </TooltipTrigger>
              <TooltipContent>
                <p>Уведомления (4 новых)</p>
              </TooltipContent>
            </Tooltip>

            <PendingPurchasesBadge />

            <Tooltip>
              <TooltipTrigger asChild>
                <SyncStatusIndicator />
              </TooltipTrigger>
              <TooltipContent>
                <p>Статус синхронизации</p>
              </TooltipContent>
            </Tooltip>

            <ThemeToggle />
            
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="/wishlist">
                  <Button variant="ghost" size="sm" className="text-neon-pink hover:text-neon-pink/80 h-8 w-8 sm:h-9 sm:w-9 p-0">
                    <Icon name="Heart" size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Избранное</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="/profile">
                  <Button variant="ghost" size="sm" className="text-neon-purple hover:text-neon-purple/80">
                    <Icon name="User" size={18} />
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Личный кабинет</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => {
                    const element = document.querySelector('[data-section="leaderboard"]');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="ghost" 
                  size="sm" 
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  <Icon name="Trophy" size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Рейтинг игроков</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => {
                    const element = document.querySelector('[data-section="comparison"]');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      (window as any).showGameComparison?.();
                    }
                  }}
                  variant="ghost" 
                  size="sm" 
                  className="text-cyan-500 hover:text-cyan-400"
                >
                  <Icon name="Scale" size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Сравнить игры</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => (window as any).showFortuneWheel?.()}
                  variant="ghost" 
                  size="sm" 
                  className="text-orange-500 hover:text-orange-400"
                >
                  <Icon name="CircleDot" size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Колесо фортуны</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
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
                      onPromoApplied={handlePromoApplied}
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
                    <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
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
                  </div>
                )}
              </SheetContent>
                </Sheet>
              </TooltipTrigger>
              <TooltipContent>
                <p>Корзина</p>
              </TooltipContent>
            </Tooltip>

            <div className="flex items-center gap-2">
              <a href="/manager">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-neon-purple">
                  <Icon name="Users" size={18} />
                </Button>
              </a>
              
              <AdminPanel
                adminPassword={adminPassword}
                setAdminPassword={setAdminPassword}
                isAdminAuth={isAdminAuth}
                handleAdminLogin={handleAdminLogin}
                games={games}
                subscriptions={subscriptions}
                editingGame={editingGame}
                setEditingGame={setEditingGame}
                editingSubscription={editingSubscription}
                setEditingSubscription={setEditingSubscription}
                handleSaveGame={handleSaveGame}
                handleDeleteGame={handleDeleteGame}
                handleSaveSubscription={handleSaveSubscription}
                handleDeleteSubscription={handleDeleteSubscription}
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
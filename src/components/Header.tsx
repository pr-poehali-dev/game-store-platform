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
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-purple rounded-full blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-br from-neon-green via-neon-pink to-neon-purple p-2 rounded-xl">
                <Icon name="Gamepad2" className="h-8 w-8 text-background" />
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-neon-green via-neon-pink to-neon-purple bg-clip-text text-transparent">
                GodStoreGame
              </h1>
              <p className="text-xs text-muted-foreground hidden md:block">Магазин игр премиум класса</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-3 md:gap-6">
            <a href="#games" className="text-sm md:text-base text-foreground hover:text-neon-green transition-colors hidden md:block">
              Игры
            </a>
            <a href="#subscriptions" className="text-sm md:text-base text-foreground hover:text-neon-pink transition-colors hidden md:block">
              Подписки
            </a>
            
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-card border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold">Итого:</span>
                      <span className="text-2xl font-bold text-neon-green">{cartTotal}₽</span>
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
                            Оплатить {cartTotal}₽
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </SheetContent>
            </Sheet>

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
          </nav>
        </div>
      </div>
    </header>
  );
}
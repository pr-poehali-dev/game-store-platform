import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Icon from '@/components/ui/icon';
import ThemeToggle from '@/components/ThemeToggle';
import NotificationBadge from '@/components/NotificationBadge';
import PendingPurchasesBadge from '@/components/PendingPurchasesBadge';
import SyncStatusIndicator from '@/components/SyncStatusIndicator';
import AdminPanel from '@/components/AdminPanel';
import MobileMenu from './MobileMenu';
import CartSheet from './CartSheet';

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

interface NavigationBarProps {
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
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  promoDiscount: number;
  appliedPromoCode: string;
  onPromoApplied: (discount: number, code: string) => void;
  discountedTotal: number;
}

export default function NavigationBar({
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
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  promoDiscount,
  appliedPromoCode,
  onPromoApplied,
  discountedTotal,
}: NavigationBarProps) {
  return (
    <nav className="flex items-center gap-1 sm:gap-2 md:gap-4">
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

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
          <CartSheet
            cart={cart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            isCheckoutOpen={isCheckoutOpen}
            setIsCheckoutOpen={setIsCheckoutOpen}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            handleCheckout={handleCheckout}
            promoDiscount={promoDiscount}
            appliedPromoCode={appliedPromoCode}
            onPromoApplied={onPromoApplied}
            discountedTotal={discountedTotal}
          />
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
  );
}

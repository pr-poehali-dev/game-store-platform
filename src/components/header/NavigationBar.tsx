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
import { ActionsMenu } from './ActionsMenu';

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
    <nav className="flex items-center gap-2 md:gap-3">
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      <a href="/#games" className="text-sm md:text-base text-foreground hover:text-primary transition-colors hidden md:block">
        Каталог
      </a>
      <a href="/console-catalog" className="text-sm md:text-base text-foreground hover:text-secondary transition-colors hidden md:block">
        PS/Xbox
      </a>
      <a href="/dashboard" className="text-sm md:text-base text-foreground hover:text-accent transition-colors hidden md:block">
        Личный кабинет
      </a>

      <Tooltip>
        <TooltipTrigger asChild>
          <NotificationBadge />
        </TooltipTrigger>
        <TooltipContent>
          <p>Уведомления</p>
        </TooltipContent>
      </Tooltip>

      <ThemeToggle />
      
      <Tooltip>
        <TooltipTrigger asChild>
          <a href="/profile">
            <Button variant="ghost" size="sm" className="text-neon-purple hover:text-neon-purple/80 h-9 w-9 p-0">
              <Icon name="User" size={18} />
            </Button>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Профиль</p>
        </TooltipContent>
      </Tooltip>

      <ActionsMenu />
      
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

      <Tooltip>
        <TooltipTrigger asChild>
          <a href="/manager">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-neon-purple h-9 w-9 p-0">
              <Icon name="Users" size={18} />
            </Button>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Менеджер команд</p>
        </TooltipContent>
      </Tooltip>

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
  );
}
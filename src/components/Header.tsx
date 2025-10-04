import { useState } from 'react';
import HeaderLogo from './header/HeaderLogo';
import NavigationBar from './header/NavigationBar';

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
          <HeaderLogo />
          
          <NavigationBar
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
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            promoDiscount={promoDiscount}
            appliedPromoCode={appliedPromoCode}
            onPromoApplied={handlePromoApplied}
            discountedTotal={discountedTotal}
          />
        </div>
      </div>
    </header>
  );
}

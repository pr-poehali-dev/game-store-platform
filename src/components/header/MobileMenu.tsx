import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <Icon name="Gamepad2" size={20} className="text-primary" />
            <span className="font-medium">Каталог PC игр</span>
          </a>
          <a 
            href="/console-catalog" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/10 transition-colors"
          >
            <Icon name="Joystick" size={20} className="text-secondary" />
            <span className="font-medium">PS / Xbox</span>
          </a>
          <a 
            href="/dashboard" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors"
          >
            <Icon name="LayoutDashboard" size={20} className="text-accent" />
            <span className="font-medium">Личный кабинет</span>
          </a>
          <a 
            href="/tournaments" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-500/10 transition-colors"
          >
            <Icon name="Trophy" size={20} className="text-yellow-500" />
            <span className="font-medium">Турниры</span>
          </a>
          <a 
            href="/wishlist" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-500/10 transition-colors"
          >
            <Icon name="Heart" size={20} className="text-pink-500" />
            <span className="font-medium">Избранное</span>
          </a>
          <a 
            href="/profile" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-500/10 transition-colors"
          >
            <Icon name="User" size={20} className="text-purple-500" />
            <span className="font-medium">Профиль</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
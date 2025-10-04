import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/img/7c012c19-01a6-4326-8859-ccbee27e9f29.jpg" 
              alt="PixelVault" 
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <span className="font-bold bg-gradient-to-r from-neon-green to-neon-pink bg-clip-text text-transparent">
                PIXELVAULT
              </span>
              <p className="text-xs text-muted-foreground">Твоё игровое хранилище</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 PixelVault. Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-neon-green transition-colors">
              <Icon name="Mail" size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-neon-pink transition-colors">
              <Icon name="MessageCircle" size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors">
              <Icon name="Send" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

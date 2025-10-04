import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-r from-card/80 to-card/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img 
                src="/img/7c012c19-01a6-4326-8859-ccbee27e9f29.jpg" 
                alt="GodStoreGame" 
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <span className="font-bold text-lg bg-gradient-to-r from-neon-green via-neon-pink to-neon-purple bg-clip-text text-transparent">
                  GodStoreGame
                </span>
                <p className="text-xs text-muted-foreground">Лучшие цены на игры</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Официальный магазин консольных игр. 72 игры для PlayStation и Xbox, моментальная доставка, гарантия качества.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-neon-green">Полезные ссылки</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#games" className="hover:text-neon-green transition-colors">Каталог игр</a></li>
              <li><a href="#subscriptions" className="hover:text-neon-green transition-colors">Подписки</a></li>
              <li><a href="#" className="hover:text-neon-green transition-colors">Способы оплаты</a></li>
              <li><a href="#" className="hover:text-neon-green transition-colors">Гарантии</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-neon-pink">Связь с нами</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:godstoregame@yandex.ru" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-pink transition-colors">
                <Icon name="Mail" size={16} />
                godstoregame@yandex.ru
              </a>
              <a href="https://t.me/GodStoreGame" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#0088cc] transition-colors">
                <Icon name="Send" size={16} />
                @GodStoreGame
              </a>
              <div className="flex flex-col gap-1 mt-1">
                <p className="text-xs text-muted-foreground/70">Поддержка и консультации</p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-neon-green/30 text-neon-green text-xs">24/7</Badge>
                  <Badge variant="outline" className="border-neon-purple/30 text-neon-purple text-xs">Быстрый ответ</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 GodStoreGame. Все права защищены.</p>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-neon-green transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-neon-pink transition-colors">Условия использования</a>
            <a href="/manager" className="flex items-center gap-1 text-xs text-muted-foreground/50 hover:text-neon-purple transition-colors">
              <Icon name="Lock" size={12} />
              Для менеджеров
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
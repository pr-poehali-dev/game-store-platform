import Icon from '@/components/ui/icon';

export default function HeaderLogo() {
  return (
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
  );
}

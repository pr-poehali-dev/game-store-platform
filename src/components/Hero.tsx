import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative overflow-hidden py-32 bg-gradient-to-br from-background via-neon-purple/10 to-neon-pink/10">
      <motion.div style={{ y: y3, opacity }} className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></motion.div>
      <motion.div style={{ y: y1 }} className="absolute top-20 left-10 w-80 h-80 bg-neon-purple/30 rounded-full blur-3xl animate-pulse"></motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-20 right-10 w-96 h-96 bg-neon-pink/30 rounded-full blur-3xl animate-pulse delay-1000"></motion.div>
      <motion.div style={{ y: y3 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/20 rounded-full blur-3xl animate-pulse delay-2000"></motion.div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-purple rounded-full blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-neon-green via-neon-pink to-neon-purple p-3 rounded-2xl">
                <Icon name="Gamepad2" className="h-12 w-12 text-background" />
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-white border-neon-purple/40 px-4 py-2 text-sm font-semibold shadow-lg shadow-neon-purple/30 animate-pulse-glow">
              🎮 Лучшие цены на игры и подписки
            </Badge>
          </motion.div>
          <motion.h2 
            className="text-6xl md:text-8xl font-bold leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5eea8f] via-[#ff66c4] to-[#a855f7]" style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              GodStoreGame
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            50+ хитов 2024-2025 для PlayStation и Xbox 🎮
          </motion.p>
          <motion.p 
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Elden Ring • Cyberpunk 2077 • Baldur's Gate 3 • Spider-Man 2 • Hogwarts Legacy • Silent Hill 2 и многое другое
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-3 py-1">
              <Icon name="Zap" size={14} className="mr-1.5" />
              Моментальная покупка
            </Badge>
            <Badge variant="outline" className="border-secondary/30 text-secondary bg-secondary/5 px-3 py-1">
              <Icon name="TrendingDown" size={14} className="mr-1.5" />
              Скидки до 80%
            </Badge>
            <Badge variant="outline" className="border-accent/30 text-accent bg-accent/5 px-3 py-1">
              <Icon name="Globe" size={14} className="mr-1.5" />
              Регионы: TR/IN/UA
            </Badge>
          </motion.div>
          <motion.div 
            className="flex flex-wrap gap-3 justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Button size="lg" className="bg-neon-green text-background hover:bg-neon-green/90 glow-green" onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="GamepadIcon" size={20} className="mr-2" />
              Каталог игр
            </Button>
            <Button size="lg" variant="outline" className="border-[#66c0f4] text-[#66c0f4] hover:bg-[#66c0f4]/10" onClick={() => document.getElementById('steam-topup')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Wallet" size={20} className="mr-2" />
              Пополнить Steam
            </Button>
            <Button size="lg" variant="outline" className="border-neon-pink text-neon-pink hover:bg-neon-pink/10" onClick={() => document.getElementById('subscriptions')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Star" size={20} className="mr-2" />
              Подписки
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
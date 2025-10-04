import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-background via-neon-purple/5 to-neon-pink/5">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
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
          >
            <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple px-4 py-2 text-sm animate-pulse-glow">
              🎮 Лучшие цены на игры и подписки
            </Badge>
          </motion.div>
          <motion.h2 
            className="text-5xl md:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-neon-green via-neon-pink to-neon-purple bg-clip-text text-transparent">
              GodStoreGame
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            150+ игр, подписки, пополнение Steam. Покупка на свой или новый аккаунт.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Badge variant="outline" className="border-blue-500/30 text-blue-400">
              PlayStation: Турция/Индия/Украина
            </Badge>
            <Badge variant="outline" className="border-neon-green/30 text-neon-green">
              Скидки до 90%
            </Badge>
            <Badge variant="outline" className="border-neon-pink/30 text-neon-pink">
              Моментальная доставка
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
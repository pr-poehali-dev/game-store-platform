import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';

export default function StatsSection() {
  const stats = [
    { icon: 'Users', value: '15,000+', label: 'Довольных клиентов', color: 'text-neon-green' },
    { icon: 'Gamepad2', value: '50+', label: 'Топовых игр 2024-2025', color: 'text-neon-pink' },
    { icon: 'Star', value: '4.9/5', label: 'Средний рейтинг', color: 'text-yellow-400' },
    { icon: 'Clock', value: '< 5 мин', label: 'Средняя доставка', color: 'text-neon-purple' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-neon-purple/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-bold mb-4">Статистика магазина</h3>
          <p className="text-muted-foreground text-lg">Цифры, которые говорят сами за себя</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-neon-green/50 transition-all duration-300 group">
                <CardContent className="pt-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                    index === 0 ? 'bg-neon-green/20' : 
                    index === 1 ? 'bg-neon-pink/20' : 
                    index === 2 ? 'bg-yellow-500/20' : 
                    'bg-neon-purple/20'
                  }`}>
                    <Icon name={stat.icon as any} size={32} className={stat.color} />
                  </div>
                  <p className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
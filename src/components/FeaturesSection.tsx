import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-neon-green/10 via-neon-pink/10 to-neon-purple/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-4xl font-bold">Почему PixelVault?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-card/50 backdrop-blur border-neon-green/30">
              <CardHeader>
                <Icon name="Shield" size={40} className="mx-auto text-neon-green mb-2" />
                <CardTitle className="text-lg">100% лицензия</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Только официальные ключи и подписки</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur border-neon-pink/30">
              <CardHeader>
                <Icon name="Zap" size={40} className="mx-auto text-neon-pink mb-2" />
                <CardTitle className="text-lg">Мгновенная доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Ключи приходят на почту за секунды</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur border-neon-purple/30">
              <CardHeader>
                <Icon name="HeadphonesIcon" size={40} className="mx-auto text-neon-purple mb-2" />
                <CardTitle className="text-lg">Поддержка 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Всегда на связи и готовы помочь</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

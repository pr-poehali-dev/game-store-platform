import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function MainDashboard() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestType, setRequestType] = useState<'game' | 'subscription' | null>(null);
  const [formData, setFormData] = useState({
    gameName: '',
    email: '',
    message: '',
  });

  const features = [
    {
      icon: 'Gamepad2',
      title: 'Каталог игр',
      description: 'Найди свою игру среди тысяч вариантов',
      link: '/catalog',
    },
    {
      icon: 'Users',
      title: 'Соцсеть геймеров',
      description: 'Общайся с друзьями и находи новых',
      link: '/social',
    },
    {
      icon: 'Trophy',
      title: 'Турниры',
      description: 'Участвуй в турнирах и выигрывай призы',
      link: '/tournaments',
    },
    {
      icon: 'Video',
      title: 'Стриминг',
      description: 'Смотри и стримь игры',
      link: '/streams',
    },
    {
      icon: 'ShoppingBag',
      title: 'Маркетплейс',
      description: 'Покупай и продавай игровые предметы',
      link: '/marketplace',
    },
    {
      icon: 'Package',
      title: 'Лутбоксы',
      description: 'Открывай кейсы и получай награды',
      link: '/lootbox',
    },
    {
      icon: 'Target',
      title: 'Battle Pass',
      description: '100 уровней эксклюзивных наград',
      link: '/battlepass',
    },
    {
      icon: 'Gift',
      title: 'Ежедневные награды',
      description: 'Заходи каждый день и получай бонусы',
      link: '/rewards',
    },
    {
      icon: 'Dices',
      title: 'Казино',
      description: 'Испытай удачу в рулетке и слотах',
      link: '/casino',
    },
    {
      icon: 'Star',
      title: 'Достижения',
      description: 'Собирай трофеи и получай очки',
      link: '/achievements',
    },
    {
      icon: 'BarChart3',
      title: 'Статистика',
      description: 'Отслеживай свой прогресс',
      link: '/stats',
    },
    {
      icon: 'Shield',
      title: 'Кланы',
      description: 'Создавай кланы и воюй с другими',
      link: '/clans',
    },
    {
      icon: 'Brain',
      title: 'ИИ Прогнозы',
      description: 'Нейросеть предсказывает матчи',
      link: '/predictions',
    },
  ];

  const handleSubmitRequest = () => {
    alert(`Заявка на ${requestType === 'game' ? 'игру' : 'подписку'} "${formData.gameName}" отправлена!`);
    setShowRequestForm(false);
    setFormData({ gameName: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            🎮 Игровая платформа
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up animation-delay-200">
            Всё для геймеров в одном месте: игры, турниры, соцсеть, маркетплейс и многое другое!
          </p>
          


          <div className="flex flex-wrap gap-3 justify-center animate-fade-in-up animation-delay-400">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => {
                setRequestType('game');
                setShowRequestForm(true);
              }}
              className="hover:scale-105 transition-transform"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Заявка на игру
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => {
                setRequestType('subscription');
                setShowRequestForm(true);
              }}
              className="hover:scale-105 transition-transform"
            >
              <Icon name="Sparkles" size={20} className="mr-2" />
              Заявка на подписку
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in-up">🎯 Все возможности платформы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => feature.link ? window.location.href = feature.link : feature.action?.()}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Icon name={feature.icon as any} size={24} className="text-primary" />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>


      </div>

      {showRequestForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <Card className="w-full max-w-lg p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                {requestType === 'game' ? '🎮 Заявка на игру' : '✨ Заявка на подписку'}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setShowRequestForm(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Название {requestType === 'game' ? 'игры' : 'подписки'}
                </label>
                <Input
                  value={formData.gameName}
                  onChange={(e) => setFormData({ ...formData, gameName: e.target.value })}
                  placeholder={`Например: ${requestType === 'game' ? 'Minecraft' : 'Xbox Game Pass'}`}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email для связи</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Дополнительная информация</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Опишите почему вам нужна эта игра/подписка..."
                  rows={4}
                />
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleSubmitRequest}
                disabled={!formData.gameName || !formData.email}
              >
                <Icon name="Send" size={20} className="mr-2" />
                Отправить заявку
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
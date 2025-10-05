import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  name: string;
  image?: string;
}

export default function MainDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestType, setRequestType] = useState<'game' | 'subscription' | null>(null);
  const [formData, setFormData] = useState({
    gameName: '',
    email: '',
    message: '',
  });

  const games: Game[] = [
    { id: 1, name: 'Cyberpunk 2077' },
    { id: 2, name: 'Valorant' },
    { id: 3, name: 'CS:GO' },
    { id: 4, name: 'Elden Ring' },
    { id: 5, name: 'The Witcher 3' },
    { id: 6, name: 'GTA V' },
  ];

  const features = [
    {
      icon: 'Gamepad2',
      title: 'Каталог игр',
      description: 'Найди свою игру среди тысяч вариантов',
      action: () => document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' }),
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
  ];

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitRequest = () => {
    alert(`Заявка на ${requestType === 'game' ? 'игру' : 'подписку'} "${formData.gameName}" отправлена!`);
    setShowRequestForm(false);
    setFormData({ gameName: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            🎮 Игровая платформа
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Всё для геймеров в одном месте: игры, турниры, соцсеть, маркетплейс и многое другое!
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Найти игру или функцию..."
                className="pl-12 h-14 text-lg bg-white text-black"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => {
                setRequestType('game');
                setShowRequestForm(true);
              }}
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
            >
              <Icon name="Sparkles" size={20} className="mr-2" />
              Заявка на подписку
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">🎯 Все возможности платформы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => feature.link ? window.location.href = feature.link : feature.action?.()}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={feature.icon as any} size={24} className="text-primary" />
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div id="games-section" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">🎮 Каталог игр</h2>
            <Badge className="text-lg px-4 py-2">{games.length} игр</Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredGames.map((game) => (
              <Card
                key={game.id}
                className="p-4 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  {game.image ? (
                    <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                  ) : (
                    <Icon name="Gamepad2" size={48} className="text-gray-400" />
                  )}
                </div>
                <h3 className="font-bold text-sm text-center group-hover:text-primary transition-colors">
                  {game.name}
                </h3>
              </Card>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <Card className="p-12 text-center">
              <Icon name="Search" size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground mb-4">Игра не найдена</p>
              <Button onClick={() => {
                setRequestType('game');
                setShowRequestForm(true);
              }}>
                <Icon name="Plus" size={16} className="mr-2" />
                Оставить заявку на игру
              </Button>
            </Card>
          )}
        </div>
      </div>

      {showRequestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg p-6">
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

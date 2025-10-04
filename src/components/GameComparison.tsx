import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Game } from '@/types';
import { motion } from 'framer-motion';

interface GameComparisonProps {
  games: Game[];
  isOpen: boolean;
  onClose: () => void;
}

export default function GameComparison({ games, isOpen, onClose }: GameComparisonProps) {
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedGames.find(g => g.id === game.id)
  );

  const addGame = (game: Game) => {
    if (selectedGames.length < 3) {
      setSelectedGames([...selectedGames, game]);
      setSearchQuery('');
    }
  };

  const removeGame = (gameId: number) => {
    setSelectedGames(selectedGames.filter(g => g.id !== gameId));
  };

  const compareFeatures = [
    { key: 'price', label: '💰 Цена', format: (val: number) => `${val}₽` },
    { key: 'rating', label: '⭐ Рейтинг', format: (val: number) => `${val}/10` },
    { key: 'release_year', label: '📅 Год выпуска', format: (val: number) => val },
    { key: 'category', label: '🎮 Жанр', format: (val: string) => val },
    { key: 'platform', label: '🎯 Платформа', format: (val: string) => val },
    { key: 'developer', label: '👨‍💻 Разработчик', format: (val: string) => val },
    { key: 'publisher', label: '🏢 Издатель', format: (val: string) => val }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                🔍 Сравнение игр
              </h1>
              <p className="text-muted-foreground mt-1">
                Выберите до 3 игр для сравнения
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {selectedGames.length < 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Добавить игру</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Искать игры..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                {searchQuery && filteredGames.length > 0 && (
                  <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                    {filteredGames.slice(0, 5).map(game => (
                      <div
                        key={game.id}
                        onClick={() => addGame(game)}
                        className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={game.image_url} 
                            alt={game.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold">{game.title}</p>
                            <p className="text-sm text-muted-foreground">{game.category}</p>
                          </div>
                        </div>
                        <Icon name="Plus" size={20} className="text-primary" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {selectedGames.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left bg-card border border-border">
                      <span className="text-muted-foreground font-semibold">Характеристики</span>
                    </th>
                    {selectedGames.map(game => (
                      <th key={game.id} className="p-4 bg-card border border-border min-w-[250px]">
                        <div className="space-y-3">
                          <div className="relative">
                            <img 
                              src={game.image_url} 
                              alt={game.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              size="icon"
                              variant="destructive"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => removeGame(game.id)}
                            >
                              <Icon name="X" size={12} />
                            </Button>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{game.title}</h3>
                            {game.discount && game.discount > 0 && (
                              <Badge className="bg-red-600 text-white mt-2">
                                -{game.discount}% скидка
                              </Badge>
                            )}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareFeatures.map((feature, index) => (
                    <motion.tr
                      key={feature.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 bg-card/50 border border-border font-semibold">
                        {feature.label}
                      </td>
                      {selectedGames.map(game => {
                        const value = game[feature.key as keyof Game];
                        const formattedValue = feature.format(value as any);
                        
                        let isBest = false;
                        if (feature.key === 'price') {
                          const prices = selectedGames.map(g => g.price);
                          isBest = game.price === Math.min(...prices);
                        } else if (feature.key === 'rating') {
                          const ratings = selectedGames.map(g => g.rating);
                          isBest = game.rating === Math.max(...ratings);
                        }

                        return (
                          <td 
                            key={game.id} 
                            className={`p-4 border border-border text-center ${isBest ? 'bg-primary/10 font-bold text-primary' : ''}`}
                          >
                            {isBest && <Icon name="Crown" size={14} className="inline mr-1 text-yellow-500" />}
                            {formattedValue}
                          </td>
                        );
                      })}
                    </motion.tr>
                  ))}
                  
                  <tr>
                    <td className="p-4 bg-card/50 border border-border font-semibold">
                      📝 Описание
                    </td>
                    {selectedGames.map(game => (
                      <td key={game.id} className="p-4 border border-border text-sm text-muted-foreground">
                        {game.description}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 bg-card/50 border border-border font-semibold">
                      🛒 Действие
                    </td>
                    {selectedGames.map(game => (
                      <td key={game.id} className="p-4 border border-border">
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Купить {game.price}₽
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {selectedGames.length === 0 && (
            <Card className="text-center py-20">
              <CardContent>
                <Icon name="Scale" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">Начните сравнение</h3>
                <p className="text-muted-foreground">
                  Добавьте игры с помощью поиска выше
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

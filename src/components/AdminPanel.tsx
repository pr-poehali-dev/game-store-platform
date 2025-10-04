import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import GameForm from '@/components/GameForm';
import SubscriptionForm from '@/components/SubscriptionForm';
import PromoCodesManager from '@/components/PromoCodesManager';
import QuickReplies from '@/components/QuickReplies';

interface Game {
  id: number;
  title: string;
  platform: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  rating: number;
  release_year: number;
}

interface Subscription {
  id: number;
  name: string;
  platform: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
}

interface AdminPanelProps {
  adminPassword: string;
  setAdminPassword: (password: string) => void;
  isAdminAuth: boolean;
  handleAdminLogin: () => void;
  games: Game[];
  subscriptions: Subscription[];
  editingGame: Game | null;
  setEditingGame: (game: Game | null) => void;
  editingSubscription: Subscription | null;
  setEditingSubscription: (sub: Subscription | null) => void;
  handleSaveGame: (game: Partial<Game>) => void;
  handleDeleteGame: (id: number) => void;
  handleSaveSubscription: (sub: Partial<Subscription>) => void;
  handleDeleteSubscription: (id: number) => void;
}

export default function AdminPanel({
  adminPassword,
  setAdminPassword,
  isAdminAuth,
  handleAdminLogin,
  games,
  subscriptions,
  editingGame,
  setEditingGame,
  editingSubscription,
  setEditingSubscription,
  handleSaveGame,
  handleDeleteGame,
  handleSaveSubscription,
  handleDeleteSubscription
}: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-neon-purple">
          <Icon name="Settings" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border max-w-4xl max-h-[90vh]">
        {!isAdminAuth ? (
          <>
            <DialogHeader>
              <DialogTitle>Вход в админ-панель</DialogTitle>
              <DialogDescription>Введите пароль для доступа</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Пароль</Label>
                <Input 
                  type="password" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="godstore2024"
                  onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
              </div>
              <Button onClick={handleAdminLogin} className="w-full bg-neon-green text-background hover:bg-neon-green/90">
                Войти
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">🛠️ Админ-панель GodStoreGame</DialogTitle>
              <DialogDescription>Управление играми и подписками</DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="games" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="games">
                  <Icon name="Gamepad2" size={16} className="mr-2" />
                  Игры ({games.length})
                </TabsTrigger>
                <TabsTrigger value="subscriptions">
                  <Icon name="Star" size={16} className="mr-2" />
                  Подписки ({subscriptions.length})
                </TabsTrigger>
                <TabsTrigger value="promo">
                  <Icon name="Tag" size={16} className="mr-2" />
                  Промокоды
                </TabsTrigger>
                <TabsTrigger value="replies">
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Ответы
                </TabsTrigger>
                <TabsTrigger value="stats">
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  Статистика
                </TabsTrigger>
              </TabsList>

              <TabsContent value="games" className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-neon-green text-background" onClick={() => setEditingGame(null)}>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить новую игру
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card max-w-2xl">
                    <GameForm game={editingGame} onSave={handleSaveGame} />
                  </DialogContent>
                </Dialog>

                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {games.map(game => (
                      <Card key={game.id} className="bg-muted/50 hover:bg-muted/70 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-sm flex items-center gap-2">
                                {game.title}
                                <span className="text-xs font-normal text-muted-foreground">
                                  #{game.id}
                                </span>
                              </CardTitle>
                              <CardDescription className="mt-1">
                                {game.platform} • {game.category} • {game.price}₽
                              </CardDescription>
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <Icon name="Star" size={12} className="text-yellow-500" />
                                <span>{game.rating}/10</span>
                                <span>•</span>
                                <span>{game.release_year}</span>
                              </div>
                            </div>
                            {game.image_url && (
                              <img 
                                src={game.image_url} 
                                alt={game.title}
                                className="w-20 h-12 object-cover rounded"
                              />
                            )}
                          </div>
                        </CardHeader>
                        <CardFooter className="gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setEditingGame(game)} className="flex-1">
                                <Icon name="Edit" size={14} className="mr-1" />
                                Редактировать
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-card max-w-2xl">
                              <GameForm game={game} onSave={handleSaveGame} />
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => {
                              if (confirm(`Удалить игру "${game.title}"?`)) {
                                handleDeleteGame(game.id);
                              }
                            }}
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="subscriptions" className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-neon-pink text-white" onClick={() => setEditingSubscription(null)}>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить подписку
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card max-w-2xl">
                    <SubscriptionForm subscription={editingSubscription} onSave={handleSaveSubscription} />
                  </DialogContent>
                </Dialog>

                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {subscriptions.map(sub => (
                      <Card key={sub.id} className="bg-muted/50 hover:bg-muted/70 transition-colors">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            {sub.name}
                            <span className="text-xs font-normal text-muted-foreground">
                              #{sub.id}
                            </span>
                          </CardTitle>
                          <CardDescription>
                            {sub.platform} • {sub.duration} • {sub.price}₽
                          </CardDescription>
                          <div className="text-xs text-muted-foreground mt-2">
                            {sub.features.length} функций
                          </div>
                        </CardHeader>
                        <CardFooter className="gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setEditingSubscription(sub)} className="flex-1">
                                <Icon name="Edit" size={14} className="mr-1" />
                                Редактировать
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-card max-w-2xl">
                              <SubscriptionForm subscription={sub} onSave={handleSaveSubscription} />
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => {
                              if (confirm(`Удалить подписку "${sub.name}"?`)) {
                                handleDeleteSubscription(sub.id);
                              }
                            }}
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="promo" className="space-y-4">
                <PromoCodesManager />
              </TabsContent>

              <TabsContent value="replies" className="space-y-4">
                <QuickReplies />
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-neon-green/20 to-transparent border-neon-green/50">
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold text-neon-green flex items-center gap-2">
                        <Icon name="Gamepad2" size={32} />
                        {games.length}
                      </CardTitle>
                      <CardDescription>Всего игр в каталоге</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="bg-gradient-to-br from-neon-pink/20 to-transparent border-neon-pink/50">
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold text-neon-pink flex items-center gap-2">
                        <Icon name="Star" size={32} />
                        {subscriptions.length}
                      </CardTitle>
                      <CardDescription>Активных подписок</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="bg-gradient-to-br from-neon-purple/20 to-transparent border-neon-purple/50">
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold text-neon-purple">
                        {new Set(games.map(g => g.category)).size}
                      </CardTitle>
                      <CardDescription>Категорий игр</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="bg-gradient-to-br from-yellow-500/20 to-transparent border-yellow-500/50">
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold text-yellow-500">
                        {(games.reduce((sum, g) => sum + g.rating, 0) / games.length).toFixed(1)}
                      </CardTitle>
                      <CardDescription>Средний рейтинг</CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle>По платформам</CardTitle>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-2">
                    <div className="w-full flex items-center justify-between">
                      <span>Xbox:</span>
                      <span className="font-bold text-neon-green">
                        {games.filter(g => g.platform === 'Xbox' || g.platform === 'Both').length} игр
                      </span>
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <span>PlayStation:</span>
                      <span className="font-bold text-neon-pink">
                        {games.filter(g => g.platform === 'PlayStation' || g.platform === 'Both').length} игр
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
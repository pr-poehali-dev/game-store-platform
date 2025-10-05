import { useState } from 'react';
import { Video, Eye, Users, DollarSign, TrendingUp, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StreamSettings, StreamStats } from '@/types/streaming';
import Icon from '@/components/ui/icon';

interface StreamerDashboardProps {
  stats: StreamStats;
  settings: StreamSettings;
  onUpdateSettings: (settings: Partial<StreamSettings>) => void;
  onStartStream?: () => void;
  onStopStream?: () => void;
  isLive?: boolean;
}

export default function StreamerDashboard({
  stats,
  settings,
  onUpdateSettings,
  onStartStream,
  onStopStream,
  isLive = false,
}: StreamerDashboardProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleUpdateSetting = (key: keyof StreamSettings, value: any) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onUpdateSettings({ [key]: value });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Панель стримера</h2>
        {isLive ? (
          <Button variant="destructive" size="lg" onClick={onStopStream}>
            <Icon name="Video" size={18} className="mr-2" />
            Остановить стрим
          </Button>
        ) : (
          <Button size="lg" onClick={onStartStream}>
            <Icon name="Video" size={18} className="mr-2" />
            Начать трансляцию
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Зрители сейчас</p>
              <p className="text-2xl font-bold">{formatNumber(stats.averageViewers)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="TrendingUp" size={14} className="text-green-500" />
            <span>Пик: {formatNumber(stats.peakViewers)}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Icon name="Users" size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Подписчики</p>
              <p className="text-2xl font-bold">{formatNumber(stats.followers)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Star" size={14} className="text-yellow-500" />
            <span>Донаты: {stats.subscribers}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Icon name="Play" size={20} className="text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Всего просмотров</p>
              <p className="text-2xl font-bold">{formatNumber(stats.totalViews)}</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Среднее: {formatNumber(stats.averageViewers)}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Донаты</p>
              <p className="text-2xl font-bold">${formatNumber(stats.donations)}</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">За этот месяц</div>
        </Card>
      </div>

      <Tabs defaultValue="settings">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="settings">Настройки</TabsTrigger>
          <TabsTrigger value="schedule">Расписание</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Настройки трансляции</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Название стрима</Label>
                <Input
                  id="title"
                  value={localSettings.title}
                  onChange={(e) => handleUpdateSetting('title', e.target.value)}
                  placeholder="Введите название..."
                  maxLength={140}
                />
                <p className="text-xs text-muted-foreground">
                  {localSettings.title.length}/140 символов
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="game">Игра</Label>
                <Select
                  value={localSettings.gameName}
                  onValueChange={(value) => handleUpdateSetting('gameName', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите игру" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="valorant">Valorant</SelectItem>
                    <SelectItem value="csgo">CS:GO</SelectItem>
                    <SelectItem value="dota2">Dota 2</SelectItem>
                    <SelectItem value="minecraft">Minecraft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select
                  value={localSettings.category}
                  onValueChange={(value) => handleUpdateSetting('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gaming">Игры</SelectItem>
                    <SelectItem value="esports">Киберспорт</SelectItem>
                    <SelectItem value="justchatting">Разговоры</SelectItem>
                    <SelectItem value="music">Музыка</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Теги</Label>
                <Input
                  id="tags"
                  value={localSettings.tags.join(', ')}
                  onChange={(e) =>
                    handleUpdateSetting(
                      'tags',
                      e.target.value.split(',').map((t) => t.trim())
                    )
                  }
                  placeholder="Введите теги через запятую"
                />
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableChat">Чат включён</Label>
                    <p className="text-sm text-muted-foreground">
                      Зрители смогут писать в чат
                    </p>
                  </div>
                  <Switch
                    id="enableChat"
                    checked={localSettings.enableChat}
                    onCheckedChange={(checked) => handleUpdateSetting('enableChat', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableDonations">Донаты включены</Label>
                    <p className="text-sm text-muted-foreground">
                      Зрители смогут отправлять донаты
                    </p>
                  </div>
                  <Switch
                    id="enableDonations"
                    checked={localSettings.enableDonations}
                    onCheckedChange={(checked) =>
                      handleUpdateSetting('enableDonations', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="subscribersOnly">Только для подписчиков</Label>
                    <p className="text-sm text-muted-foreground">
                      Ограничить доступ к стриму
                    </p>
                  </div>
                  <Switch
                    id="subscribersOnly"
                    checked={localSettings.isForSubscribersOnly}
                    onCheckedChange={(checked) =>
                      handleUpdateSetting('isForSubscribersOnly', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ageRestricted">18+</Label>
                    <p className="text-sm text-muted-foreground">
                      Контент для взрослых
                    </p>
                  </div>
                  <Switch
                    id="ageRestricted"
                    checked={localSettings.isAgeRestricted}
                    onCheckedChange={(checked) =>
                      handleUpdateSetting('isAgeRestricted', checked)
                    }
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Расписание стримов</h3>
            <p className="text-muted-foreground">
              Здесь будет расписание ваших стримов
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Аналитика</h3>
            <p className="text-muted-foreground">Здесь будет детальная аналитика стримов</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

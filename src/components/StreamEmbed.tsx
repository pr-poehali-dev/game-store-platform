import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function StreamEmbed() {
  const [twitchChannel, setTwitchChannel] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [activeEmbed, setActiveEmbed] = useState<'twitch' | 'youtube' | null>(null);

  const handleTwitchEmbed = () => {
    if (twitchChannel.trim()) {
      setActiveEmbed('twitch');
    }
  };

  const handleYoutubeEmbed = () => {
    if (youtubeVideoId.trim()) {
      setActiveEmbed('youtube');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">
          🎮 Смотреть стримы
        </h2>
        <p className="text-muted-foreground">
          Встройте ваш любимый стрим или канал прямо на сайт
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Settings" size={20} />
              Настройки плеера
            </CardTitle>
            <CardDescription>
              Выберите платформу и введите данные канала
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="twitch" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="twitch">
                  <Icon name="Radio" size={16} className="mr-2" />
                  Twitch
                </TabsTrigger>
                <TabsTrigger value="youtube">
                  <Icon name="Video" size={16} className="mr-2" />
                  YouTube
                </TabsTrigger>
              </TabsList>

              <TabsContent value="twitch" className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="twitch-channel">Имя канала Twitch</Label>
                  <Input
                    id="twitch-channel"
                    placeholder="например: shroud"
                    value={twitchChannel}
                    onChange={(e) => setTwitchChannel(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Введите имя канала без twitch.tv/
                  </p>
                </div>
                <Button 
                  onClick={handleTwitchEmbed} 
                  className="w-full"
                  disabled={!twitchChannel.trim()}
                >
                  <Icon name="Play" size={16} className="mr-2" />
                  Загрузить стрим
                </Button>
              </TabsContent>

              <TabsContent value="youtube" className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="youtube-id">ID видео YouTube</Label>
                  <Input
                    id="youtube-id"
                    placeholder="например: dQw4w9WgXcQ"
                    value={youtubeVideoId}
                    onChange={(e) => setYoutubeVideoId(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    ID из ссылки youtube.com/watch?v=ID
                  </p>
                </div>
                <Button 
                  onClick={handleYoutubeEmbed}
                  className="w-full"
                  disabled={!youtubeVideoId.trim()}
                >
                  <Icon name="Play" size={16} className="mr-2" />
                  Загрузить видео
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Icon name="Info" size={14} />
                Популярные каналы
              </h4>
              <div className="space-y-2 text-xs">
                <p className="text-muted-foreground">
                  <strong>Twitch:</strong> shroud, xqc, pokimane, summit1g
                </p>
                <p className="text-muted-foreground">
                  <strong>YouTube:</strong> используйте Gaming раздел
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Monitor" size={20} />
              Плеер
            </CardTitle>
            <CardDescription>
              {activeEmbed === 'twitch' && `Стрим: ${twitchChannel}`}
              {activeEmbed === 'youtube' && `Видео ID: ${youtubeVideoId}`}
              {!activeEmbed && 'Выберите канал для просмотра'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black/90 rounded-lg overflow-hidden relative">
              {activeEmbed === 'twitch' && twitchChannel && (
                <iframe
                  src={`https://player.twitch.tv/?channel=${twitchChannel}&parent=${window.location.hostname}`}
                  height="100%"
                  width="100%"
                  className="absolute inset-0"
                  allowFullScreen
                ></iframe>
              )}

              {activeEmbed === 'youtube' && youtubeVideoId && (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                  className="absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}

              {!activeEmbed && (
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-muted-foreground">
                  <Icon name="PlayCircle" size={64} className="opacity-50" />
                  <p className="text-lg">Введите данные канала для просмотра</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Icon name="Wifi" size={20} />
              Live стримы
            </CardTitle>
            <CardDescription>
              Смотрите стримы с Twitch в реальном времени
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Введите имя канала стримера и смотрите прямой эфир прямо на сайте
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Icon name="HelpCircle" size={16} className="mr-2" />
                  Как найти канал?
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Как найти канал Twitch</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm">
                    1. Откройте <a href="https://www.twitch.tv" target="_blank" rel="noopener noreferrer" className="text-primary underline">twitch.tv</a>
                  </p>
                  <p className="text-sm">
                    2. Найдите канал стримера (например, shroud)
                  </p>
                  <p className="text-sm">
                    3. Скопируйте имя из URL: twitch.tv/<strong>shroud</strong>
                  </p>
                  <p className="text-sm">
                    4. Вставьте имя в поле "Имя канала Twitch"
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Icon name="Video" size={20} />
              YouTube Gaming
            </CardTitle>
            <CardDescription>
              Встраивайте видео и стримы с YouTube
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Вставьте ID видео из ссылки YouTube для просмотра
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Icon name="HelpCircle" size={16} className="mr-2" />
                  Как найти ID видео?
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Как найти ID видео YouTube</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm">
                    1. Откройте видео на YouTube
                  </p>
                  <p className="text-sm">
                    2. Посмотрите на URL: youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong>
                  </p>
                  <p className="text-sm">
                    3. Скопируйте ID после "v=" (11 символов)
                  </p>
                  <p className="text-sm">
                    4. Вставьте ID в поле "ID видео YouTube"
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Icon name="Tv" size={20} />
              Вести свои стримы
            </CardTitle>
            <CardDescription>
              Начните стримить для своей аудитории
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Для стриминга нужна платформа Twitch или YouTube с OBS Studio
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.open('https://obsproject.com/', '_blank')}
            >
              <Icon name="Download" size={16} className="mr-2" />
              Скачать OBS Studio
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { VoiceChannel, VoiceUser, VoiceSettings } from '@/types/voicechat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

// Mock data
const mockVoiceChannels: VoiceChannel[] = [
  {
    id: '1',
    name: 'General Voice',
    type: 'public',
    maxUsers: 10,
    users: [
      {
        userId: '1',
        username: 'ShadowNinja',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShadowNinja',
        isMuted: false,
        isDeafened: false,
        isSpeaking: true,
        volume: 80,
      },
      {
        userId: '2',
        username: 'DragonSlayer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DragonSlayer',
        isMuted: true,
        isDeafened: false,
        isSpeaking: false,
        volume: 100,
      },
    ],
    createdBy: '1',
    createdAt: Date.now() - 3600000,
  },
  {
    id: '2',
    name: 'Squad Chat',
    type: 'party',
    maxUsers: 5,
    users: [
      {
        userId: '3',
        username: 'ProGamer123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer123',
        isMuted: false,
        isDeafened: false,
        isSpeaking: false,
        volume: 90,
      },
    ],
    createdBy: '3',
    createdAt: Date.now() - 7200000,
  },
  {
    id: '3',
    name: 'Elite Clan',
    type: 'clan',
    maxUsers: 20,
    users: [
      {
        userId: '4',
        username: 'MasterChief',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MasterChief',
        isMuted: false,
        isDeafened: true,
        isSpeaking: false,
        volume: 85,
      },
      {
        userId: '5',
        username: 'PhantomStrike',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhantomStrike',
        isMuted: false,
        isDeafened: false,
        isSpeaking: true,
        volume: 95,
      },
    ],
    createdBy: '4',
    createdAt: Date.now() - 86400000,
  },
];

const VoiceChat = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>(mockVoiceChannels[0].id);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    inputDevice: 'default',
    outputDevice: 'default',
    inputVolume: 80,
    outputVolume: 75,
    noiseSuppression: true,
    echoCancellation: true,
    pushToTalk: false,
    pushToTalkKey: 'V',
  });
  const [showSettings, setShowSettings] = useState(false);

  const currentChannel = mockVoiceChannels.find((c) => c.id === selectedChannel);

  const getChannelIcon = (type: VoiceChannel['type']) => {
    switch (type) {
      case 'public':
        return 'Users';
      case 'clan':
        return 'Shield';
      case 'party':
        return 'UserPlus';
      case 'private':
        return 'Lock';
      default:
        return 'Volume2';
    }
  };

  const getChannelBadgeVariant = (type: VoiceChannel['type']) => {
    switch (type) {
      case 'public':
        return 'default';
      case 'clan':
        return 'secondary';
      case 'party':
        return 'outline';
      case 'private':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Voice Chat</h2>
          <p className="text-sm text-muted-foreground">Connect with your team</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
          <Icon name="Settings" className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Channels List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Voice Channels</CardTitle>
            <CardDescription>Select a channel to join</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {mockVoiceChannels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={cn(
                      'w-full text-left p-3 rounded-lg border transition-colors',
                      selectedChannel === channel.id
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:bg-muted border-border'
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon name={getChannelIcon(channel.type)} className="h-4 w-4" />
                        <span className="font-medium">{channel.name}</span>
                      </div>
                      <Badge variant={getChannelBadgeVariant(channel.type)} className="text-xs">
                        {channel.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Users" className="h-3 w-3" />
                      <span>
                        {channel.users.length}/{channel.maxUsers}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Current Channel Users */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name={getChannelIcon(currentChannel?.type || 'public')} className="h-5 w-5" />
              {currentChannel?.name}
            </CardTitle>
            <CardDescription>
              {currentChannel?.users.length} of {currentChannel?.maxUsers} users connected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {currentChannel?.users.map((user) => (
                  <div
                    key={user.userId}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border',
                      user.isSpeaking && 'border-green-500 bg-green-500/5'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.username} />
                          <AvatarFallback>{user.username[0]}</AvatarFallback>
                        </Avatar>
                        {user.isSpeaking && (
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
                            <Icon name="Mic" className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {user.isSpeaking && (
                            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">
                              <Icon name="Radio" className="h-2.5 w-2.5 mr-1" />
                              Speaking
                            </Badge>
                          )}
                          {user.isMuted && (
                            <Badge variant="outline" className="text-xs bg-red-500/10 text-red-500 border-red-500/20">
                              <Icon name="MicOff" className="h-2.5 w-2.5 mr-1" />
                              Muted
                            </Badge>
                          )}
                          {user.isDeafened && (
                            <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-500 border-orange-500/20">
                              <Icon name="VolumeX" className="h-2.5 w-2.5 mr-1" />
                              Deafened
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Volume2" className="h-4 w-4" />
                        <span>{user.volume}%</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreVertical" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            {/* Voice Controls */}
            <div className="flex items-center justify-center gap-2">
              <Button variant={voiceSettings.pushToTalk ? 'default' : 'outline'} size="lg">
                <Icon name="Mic" className="h-5 w-5 mr-2" />
                {voiceSettings.pushToTalk ? 'Push to Talk' : 'Voice Active'}
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="PhoneOff" className="h-5 w-5 mr-2" />
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Voice Settings Panel */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Settings" className="h-5 w-5" />
              Voice Settings
            </CardTitle>
            <CardDescription>Configure your voice chat preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Volume */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Icon name="Mic" className="h-4 w-4" />
                    Input Volume
                  </Label>
                  <span className="text-sm font-medium">{voiceSettings.inputVolume}%</span>
                </div>
                <Slider
                  value={[voiceSettings.inputVolume]}
                  onValueChange={([value]) => setVoiceSettings({ ...voiceSettings, inputVolume: value })}
                  max={100}
                  step={1}
                />
              </div>

              {/* Output Volume */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Icon name="Volume2" className="h-4 w-4" />
                    Output Volume
                  </Label>
                  <span className="text-sm font-medium">{voiceSettings.outputVolume}%</span>
                </div>
                <Slider
                  value={[voiceSettings.outputVolume]}
                  onValueChange={([value]) => setVoiceSettings({ ...voiceSettings, outputVolume: value })}
                  max={100}
                  step={1}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Push to Talk */}
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-1">
                  <Label htmlFor="pushToTalk" className="flex items-center gap-2">
                    <Icon name="Radio" className="h-4 w-4" />
                    Push to Talk
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Press {voiceSettings.pushToTalkKey} to speak
                  </p>
                </div>
                <Switch
                  id="pushToTalk"
                  checked={voiceSettings.pushToTalk}
                  onCheckedChange={(checked) => setVoiceSettings({ ...voiceSettings, pushToTalk: checked })}
                />
              </div>

              {/* Noise Suppression */}
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-1">
                  <Label htmlFor="noiseSuppression" className="flex items-center gap-2">
                    <Icon name="AudioWaveform" className="h-4 w-4" />
                    Noise Suppression
                  </Label>
                  <p className="text-sm text-muted-foreground">Reduce background noise</p>
                </div>
                <Switch
                  id="noiseSuppression"
                  checked={voiceSettings.noiseSuppression}
                  onCheckedChange={(checked) => setVoiceSettings({ ...voiceSettings, noiseSuppression: checked })}
                />
              </div>

              {/* Echo Cancellation */}
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-1">
                  <Label htmlFor="echoCancellation" className="flex items-center gap-2">
                    <Icon name="AudioLines" className="h-4 w-4" />
                    Echo Cancellation
                  </Label>
                  <p className="text-sm text-muted-foreground">Remove echo feedback</p>
                </div>
                <Switch
                  id="echoCancellation"
                  checked={voiceSettings.echoCancellation}
                  onCheckedChange={(checked) => setVoiceSettings({ ...voiceSettings, echoCancellation: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VoiceChat;

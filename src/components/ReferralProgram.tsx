import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ReferralData {
  user: {
    referral_code: string;
    loyalty_points: number;
  };
  stats: {
    total_referrals: number;
    completed_referrals: number;
    pending_referrals: number;
    total_earned: number;
  };
  referrals: Array<{
    id: number;
    code: string;
    email: string;
    name: string | null;
    status: string;
    bonus: number;
    paid: boolean;
    created_at: string;
    completed_at: string | null;
  }>;
  bonuses: Array<{
    type: string;
    amount: number;
    description: string;
    date: string;
  }>;
  program_info: {
    signup_bonus: number;
    first_purchase_bonus: number;
    referral_discount: number;
    description: string;
  };
}

interface ReferralProgramProps {
  userId: number;
}

export default function ReferralProgram({ userId }: ReferralProgramProps) {
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchReferralData();
  }, [userId]);

  const fetchReferralData = async () => {
    try {
      const response = await fetch(`https://functions.poehali.dev/9b31b64f-ac2e-470f-b1a3-623931cb83ca?user_id=${userId}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить данные реферальной программы',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail) {
      toast({
        title: 'Ошибка',
        description: 'Введите email друга',
        variant: 'destructive'
      });
      return;
    }

    setSending(true);
    try {
      const response = await fetch('https://functions.poehali.dev/9b31b64f-ac2e-470f-b1a3-623931cb83ca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          action: 'invite',
          email: inviteEmail
        })
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Успешно!',
          description: result.message
        });
        setInviteEmail('');
        await fetchReferralData();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить приглашение',
        variant: 'destructive'
      });
    } finally {
      setSending(false);
    }
  };

  const copyReferralLink = () => {
    if (data) {
      const link = `https://godstore.game/register?ref=${data.user.referral_code}`;
      navigator.clipboard.writeText(link);
      toast({
        title: 'Скопировано!',
        description: 'Реферальная ссылка скопирована в буфер обмена'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-green"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-neon-purple/10 via-neon-pink/10 to-neon-green/10 border-neon-purple/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Gift" size={24} className="text-neon-pink" />
            Реферальная программа
          </CardTitle>
          <CardDescription className="text-base">
            {data.program_info.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-background/60 border-neon-green/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">За регистрацию</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-neon-green">{data.program_info.signup_bonus}₽</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background/60 border-neon-pink/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">За первую покупку</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-neon-pink">{data.program_info.first_purchase_bonus}₽</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 border-neon-purple/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Скидка другу</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-neon-purple">{data.program_info.referral_discount}%</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <Label>Ваша реферальная ссылка</Label>
            <div className="flex gap-2">
              <Input 
                readOnly 
                value={`https://godstore.game/register?ref=${data.user.referral_code}`}
                className="font-mono text-sm"
              />
              <Button onClick={copyReferralLink} variant="outline" size="icon">
                <Icon name="Copy" size={18} />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Пригласить друга по email</Label>
            <div className="flex gap-2">
              <Input 
                type="email"
                placeholder="friend@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <Button 
                onClick={handleInvite} 
                disabled={sending}
                className="bg-gradient-to-r from-neon-green to-neon-pink"
              >
                {sending ? 'Отправка...' : 'Пригласить'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-neon-green/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="Users" size={16} />
              Всего рефералов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-neon-green">{data.stats.total_referrals}</p>
          </CardContent>
        </Card>

        <Card className="border-neon-pink/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="CheckCircle" size={16} />
              Активных
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-neon-pink">{data.stats.completed_referrals}</p>
          </CardContent>
        </Card>

        <Card className="border-neon-purple/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="Clock" size={16} />
              Ожидают
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-neon-purple">{data.stats.pending_referrals}</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="Coins" size={16} />
              Заработано
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-500">{data.stats.total_earned}₽</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Users" size={20} />
              Ваши рефералы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.referrals.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">Пока нет приглашённых друзей</p>
            ) : (
              data.referrals.map((ref) => (
                <div key={ref.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                  <div className="flex-1">
                    <p className="font-medium">{ref.name || ref.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(ref.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {ref.status === 'completed' ? (
                      <>
                        <Badge className="bg-green-600">Активен</Badge>
                        <span className="text-sm font-bold text-neon-green">+{ref.bonus}₽</span>
                      </>
                    ) : (
                      <Badge variant="outline">Ожидает</Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={20} />
              История бонусов
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.bonuses.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">Пока нет начисленных бонусов</p>
            ) : (
              data.bonuses.map((bonus, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                  <div className="flex-1">
                    <p className="font-medium">{bonus.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(bonus.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-neon-green">+{bonus.amount}₽</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

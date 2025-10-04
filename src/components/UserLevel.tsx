import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { UserLevel as UserLevelType } from '@/types';

interface UserLevelProps {
  userId: number;
}

export default function UserLevel({ userId }: UserLevelProps) {
  const [levelData, setLevelData] = useState<UserLevelType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const res = await fetch('https://functions.poehali.dev/e313e3be-3b5d-486e-8d3e-c6a811dc3b96', {
          headers: { 'X-User-Id': userId.toString() }
        });
        const data = await res.json();
        setLevelData(data);
      } catch (error) {
        console.error('Failed to fetch user level:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, [userId]);

  if (loading || !levelData) {
    return (
      <Card className="bg-gradient-to-br from-card/80 to-card/60 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Award" className="text-neon-purple" />
            Загрузка...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const levelColors = {
    bronze: 'from-orange-800 to-orange-600',
    silver: 'from-gray-400 to-gray-300',
    gold: 'from-yellow-500 to-yellow-400',
    platinum: 'from-purple-500 to-pink-500'
  };

  const levelIcons = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎'
  };

  const progress = levelData.level_info.max > 0 
    ? ((levelData.total_spent - levelData.level_info.min) / (levelData.level_info.max - levelData.level_info.min)) * 100
    : 0;

  return (
    <div className="space-y-4">
      <Card className={`bg-gradient-to-br ${levelColors[levelData.level]} text-white border-0 shadow-xl`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{levelIcons[levelData.level]}</span>
              <div>
                <div className="text-2xl font-bold capitalize">{levelData.level}</div>
                <div className="text-sm opacity-90">Скидка {levelData.level_info.discount}%</div>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-0">
              {levelData.purchases_count} покупок
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2 opacity-90">
              <span>Потрачено: {levelData.total_spent.toLocaleString()} ₽</span>
              {levelData.level_info.next && (
                <span>До {levelData.level_info.next}: {(levelData.level_info.max - levelData.total_spent).toLocaleString()} ₽</span>
              )}
            </div>
            <Progress value={Math.min(progress, 100)} className="h-2 bg-white/30" />
          </div>
        </CardContent>
      </Card>

      {levelData.achievements.length > 0 && (
        <Card className="bg-card/80 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Trophy" className="text-yellow-500" />
              Последние достижения
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {levelData.achievements.slice(0, 5).map((achievement, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-background/50 rounded-lg">
                  <Icon name="Award" size={20} className="text-neon-purple" />
                  <div className="flex-1">
                    <div className="font-medium">{achievement.type}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(achievement.achieved_at).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

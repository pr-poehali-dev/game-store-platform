import { useState } from 'react';
import { Quest, QuestCategory } from '@/types/quests';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import QuestCard from '@/components/quests/QuestCard';
import Icon from '@/components/ui/icon';

const mockQuests: QuestCategory[] = [
  {
    type: 'daily',
    title: 'Daily Quests',
    description: 'Complete before midnight to earn rewards',
    icon: 'Calendar',
    quests: [
      {
        id: 'd1',
        title: 'Daily Login',
        description: 'Log in to the platform',
        type: 'daily',
        difficulty: 'easy',
        status: 'completed',
        progress: 1,
        target: 1,
        rewards: [
          { type: 'currency', amount: 100 },
          { type: 'xp', amount: 50 }
        ],
        expiresAt: Date.now() + 86400000
      },
      {
        id: 'd2',
        title: 'Purchase a Game',
        description: 'Buy any game from the store',
        type: 'daily',
        difficulty: 'medium',
        status: 'active',
        progress: 0,
        target: 1,
        rewards: [
          { type: 'currency', amount: 250 },
          { type: 'xp', amount: 100 }
        ],
        expiresAt: Date.now() + 86400000
      },
      {
        id: 'd3',
        title: 'Add to Wishlist',
        description: 'Add 3 games to your wishlist',
        type: 'daily',
        difficulty: 'easy',
        status: 'active',
        progress: 1,
        target: 3,
        rewards: [
          { type: 'currency', amount: 150 },
          { type: 'xp', amount: 75 }
        ],
        expiresAt: Date.now() + 86400000
      }
    ]
  },
  {
    type: 'weekly',
    title: 'Weekly Quests',
    description: 'Complete within the week for bigger rewards',
    icon: 'CalendarDays',
    quests: [
      {
        id: 'w1',
        title: 'Spend $50',
        description: 'Make purchases totaling $50 or more',
        type: 'weekly',
        difficulty: 'hard',
        status: 'active',
        progress: 25,
        target: 50,
        rewards: [
          { type: 'currency', amount: 1000 },
          { type: 'xp', amount: 500 },
          { type: 'item', itemName: 'Exclusive Avatar' }
        ],
        expiresAt: Date.now() + 604800000
      },
      {
        id: 'w2',
        title: 'Review Games',
        description: 'Write reviews for 5 games you own',
        type: 'weekly',
        difficulty: 'medium',
        status: 'active',
        progress: 2,
        target: 5,
        rewards: [
          { type: 'currency', amount: 500 },
          { type: 'xp', amount: 250 }
        ],
        expiresAt: Date.now() + 604800000
      }
    ]
  },
  {
    type: 'seasonal',
    title: 'Seasonal Quests',
    description: 'Limited time seasonal challenges',
    icon: 'Sparkles',
    quests: [
      {
        id: 's1',
        title: 'Holiday Shopper',
        description: 'Purchase 10 games during the holiday sale',
        type: 'seasonal',
        difficulty: 'legendary',
        status: 'active',
        progress: 3,
        target: 10,
        rewards: [
          { type: 'currency', amount: 5000 },
          { type: 'xp', amount: 2500 },
          { type: 'badge', itemName: 'Holiday Champion 2025' },
          { type: 'title', itemName: 'Master Shopper' }
        ],
        expiresAt: Date.now() + 2592000000
      }
    ]
  },
  {
    type: 'special',
    title: 'Special Quests',
    description: 'Unique one-time quests',
    icon: 'Award',
    quests: [
      {
        id: 'sp1',
        title: 'First Purchase',
        description: 'Make your first purchase on the platform',
        type: 'special',
        difficulty: 'easy',
        status: 'claimed',
        progress: 1,
        target: 1,
        rewards: [
          { type: 'currency', amount: 500 },
          { type: 'badge', itemName: 'First Timer' }
        ]
      },
      {
        id: 'sp2',
        title: 'Social Butterfly',
        description: 'Connect with 10 friends on the platform',
        type: 'special',
        difficulty: 'medium',
        status: 'active',
        progress: 4,
        target: 10,
        rewards: [
          { type: 'currency', amount: 750 },
          { type: 'badge', itemName: 'Social Star' }
        ]
      }
    ]
  }
];

export default function QuestsSystem() {
  const [selectedTab, setSelectedTab] = useState('daily');

  const handleClaimQuest = (questId: string) => {
    console.log('Claiming quest:', questId);
  };

  const totalQuests = mockQuests.reduce((sum, cat) => sum + cat.quests.length, 0);
  const completedQuests = mockQuests.reduce(
    (sum, cat) => sum + cat.quests.filter(q => q.status === 'completed' || q.status === 'claimed').length,
    0
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quests & Challenges</h2>
          <p className="text-sm text-muted-foreground">
            Complete quests to earn rewards and level up
          </p>
        </div>
        <Card className="px-6 py-3">
          <div className="flex items-center gap-3">
            <Icon name="Trophy" className="h-5 w-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{completedQuests}/{totalQuests}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          {mockQuests.map((category) => (
            <TabsTrigger key={category.type} value={category.type}>
              <Icon name={category.icon} className="h-4 w-4 mr-2" />
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {mockQuests.map((category) => (
          <TabsContent key={category.type} value={category.type} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-4">
              {category.quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onClaim={handleClaimQuest}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

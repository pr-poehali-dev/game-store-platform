import { useState } from 'react';
import UserProfile from '@/components/UserProfile';
import AchievementsSystem from '@/components/AchievementsSystem';
import DailyQuests from '@/components/DailyQuests';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Profile() {
  const [showAchievements, setShowAchievements] = useState(false);
  const [showQuests, setShowQuests] = useState(false);

  return (
    <>
      <div className="fixed top-24 right-4 z-30 flex gap-3">
        <Button
          onClick={() => setShowAchievements(true)}
          className="bg-gradient-to-r from-primary to-secondary shadow-lg"
        >
          <Icon name="Trophy" size={18} className="mr-2" />
          Достижения
        </Button>
        <Button
          onClick={() => setShowQuests(true)}
          className="bg-gradient-to-r from-accent to-primary shadow-lg"
        >
          <Icon name="Target" size={18} className="mr-2" />
          Квесты
        </Button>
      </div>
      
      <UserProfile />
      
      <AchievementsSystem 
        isOpen={showAchievements} 
        onClose={() => setShowAchievements(false)} 
      />

      <DailyQuests 
        isOpen={showQuests} 
        onClose={() => setShowQuests(false)} 
      />
    </>
  );
}
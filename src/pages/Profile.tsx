import { useState } from 'react';
import UserProfile from '@/components/UserProfile';
import AchievementsSystem from '@/components/AchievementsSystem';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Profile() {
  const [showAchievements, setShowAchievements] = useState(false);

  return (
    <>
      <div className="fixed top-24 right-4 z-30">
        <Button
          onClick={() => setShowAchievements(true)}
          className="bg-gradient-to-r from-primary to-secondary shadow-lg"
        >
          <Icon name="Trophy" size={18} className="mr-2" />
          Достижения
        </Button>
      </div>
      
      <UserProfile />
      
      <AchievementsSystem 
        isOpen={showAchievements} 
        onClose={() => setShowAchievements(false)} 
      />
    </>
  );
}
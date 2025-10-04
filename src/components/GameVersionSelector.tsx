import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { GameVersion } from '@/types';

interface GameVersionSelectorProps {
  versions: GameVersion[];
  selectedVersion: GameVersion;
  onVersionChange: (version: GameVersion) => void;
  baseDiscount?: number;
}

export default function GameVersionSelector({ 
  versions, 
  selectedVersion, 
  onVersionChange,
  baseDiscount = 0
}: GameVersionSelectorProps) {
  if (!versions || versions.length === 0) {
    return null;
  }

  const calculateFinalPrice = (price: number) => {
    if (baseDiscount > 0) {
      return Math.round(price * (1 - baseDiscount / 100));
    }
    return price;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon name="Layers" size={16} className="text-primary" />
        <h4 className="font-semibold text-sm">Выберите версию игры:</h4>
      </div>
      
      <RadioGroup value={selectedVersion.id} onValueChange={(id) => {
        const version = versions.find(v => v.id === id);
        if (version) onVersionChange(version);
      }}>
        <div className="space-y-2">
          {versions.map((version) => {
            const finalPrice = calculateFinalPrice(version.price);
            const isSelected = selectedVersion.id === version.id;
            
            return (
              <Card
                key={version.id}
                className={`p-3 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-neon-purple bg-neon-purple/10' 
                    : 'border-border hover:border-neon-purple/50'
                }`}
                onClick={() => onVersionChange(version)}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={version.id} id={version.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={version.id} className="cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{version.name}</span>
                        <div className="flex items-center gap-2">
                          {baseDiscount > 0 && (
                            <span className="text-xs text-muted-foreground line-through">
                              {version.price}₽
                            </span>
                          )}
                          <span className="font-bold text-neon-green">{finalPrice}₽</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {version.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {version.platform && (
                          <Badge variant="outline" className="text-xs">
                            {version.platform}
                          </Badge>
                        )}
                        {version.region && (
                          <Badge variant="outline" className="text-xs">
                            <Icon name="Globe" size={10} className="mr-1" />
                            {version.region}
                          </Badge>
                        )}
                      </div>
                    </Label>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}

export type LootboxRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface LootboxItem {
  id: string;
  name: string;
  type: 'skin' | 'emote' | 'currency' | 'item' | 'badge';
  rarity: LootboxRarity;
  image: string;
  value: number;
}

export interface Lootbox {
  id: string;
  name: string;
  description: string;
  rarity: LootboxRarity;
  price: number;
  currency: 'coins' | 'gems' | 'real';
  image: string;
  guaranteedRarity?: LootboxRarity;
  itemPool: LootboxItem[];
}

export interface LootboxOpening {
  id: string;
  lootboxId: string;
  items: LootboxItem[];
  timestamp: number;
  totalValue: number;
}

export type CraftingMaterial = {
  id: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  owned: number;
};

export type CraftingRecipe = {
  id: string;
  name: string;
  description: string;
  resultItem: {
    name: string;
    type: 'skin' | 'weapon' | 'emote' | 'badge';
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
    image: string;
  };
  materials: {
    materialId: string;
    amount: number;
  }[];
  craftingTime: number;
  successRate: number;
};

export type CraftingQueue = {
  id: string;
  recipeId: string;
  recipeName: string;
  startedAt: number;
  completesAt: number;
  status: 'crafting' | 'completed' | 'failed';
};

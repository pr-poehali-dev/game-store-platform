export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
export type ItemCategory = 'weapon' | 'skin' | 'emote' | 'character' | 'vehicle' | 'bundle' | 'boost' | 'other';
export type ListingStatus = 'active' | 'sold' | 'cancelled' | 'expired';
export type TradeStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

export interface MarketplaceItem {
  id: string;
  gameId: number;
  gameName: string;
  name: string;
  description: string;
  image: string;
  rarity: ItemRarity;
  category: ItemCategory;
  stats?: ItemStats;
  tags: string[];
  isTradeble: boolean;
  isSellable: boolean;
}

export interface ItemStats {
  damage?: number;
  defense?: number;
  speed?: number;
  rarity?: number;
  level?: number;
  [key: string]: number | undefined;
}

export interface MarketplaceListing {
  id: string;
  sellerId: number;
  sellerName: string;
  sellerAvatar: string;
  item: MarketplaceItem;
  quantity: number;
  pricePerUnit: number;
  currency: 'coins' | 'gems' | 'real';
  totalPrice: number;
  status: ListingStatus;
  createdAt: number;
  expiresAt: number;
  views: number;
  favorites: number;
}

export interface TradeOffer {
  id: string;
  fromUserId: number;
  fromUserName: string;
  fromUserAvatar: string;
  toUserId: number;
  toUserName: string;
  toUserAvatar: string;
  offeredItems: UserInventoryItem[];
  requestedItems: UserInventoryItem[];
  offeredCoins?: number;
  requestedCoins?: number;
  message?: string;
  status: TradeStatus;
  createdAt: number;
  expiresAt: number;
}

export interface UserInventoryItem {
  id: string;
  itemId: string;
  item: MarketplaceItem;
  quantity: number;
  acquiredAt: number;
  isEquipped?: boolean;
  isFavorite?: boolean;
}

export interface PriceHistory {
  itemId: string;
  timestamp: number;
  price: number;
  quantity: number;
}

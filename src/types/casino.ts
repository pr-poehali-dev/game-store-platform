export type RouletteColor = 'red' | 'black' | 'green';

export interface RouletteNumber {
  number: number;
  color: RouletteColor;
}

export interface RouletteBet {
  type: 'number' | 'color' | 'even-odd' | 'high-low' | 'dozen' | 'column';
  value: string | number;
  amount: number;
  payout: number;
}

export interface SlotSymbol {
  id: string;
  name: string;
  icon: string;
  multiplier: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface SlotResult {
  symbols: SlotSymbol[][];
  winLines: number[];
  totalWin: number;
}

export interface CasinoStats {
  totalWagered: number;
  totalWon: number;
  totalLost: number;
  biggestWin: number;
  gamesPlayed: number;
  winRate: number;
}

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RouletteNumber, RouletteBet, SlotSymbol, SlotResult, CasinoStats } from '@/types/casino';
import Icon from '@/components/ui/icon';

const ROULETTE_NUMBERS: RouletteNumber[] = [
  { number: 0, color: 'green' },
  ...Array.from({ length: 36 }, (_, i) => ({
    number: i + 1,
    color: ([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(i + 1) ? 'red' : 'black') as 'red' | 'black'
  }))
];

const SLOT_SYMBOLS: SlotSymbol[] = [
  { id: 'cherry', name: 'Вишня', icon: '🍒', multiplier: 2, rarity: 'common' },
  { id: 'lemon', name: 'Лимон', icon: '🍋', multiplier: 3, rarity: 'common' },
  { id: 'orange', name: 'Апельсин', icon: '🍊', multiplier: 4, rarity: 'uncommon' },
  { id: 'watermelon', name: 'Арбуз', icon: '🍉', multiplier: 5, rarity: 'uncommon' },
  { id: 'grape', name: 'Виноград', icon: '🍇', multiplier: 8, rarity: 'rare' },
  { id: 'bell', name: 'Колокол', icon: '🔔', multiplier: 10, rarity: 'rare' },
  { id: 'star', name: 'Звезда', icon: '⭐', multiplier: 15, rarity: 'epic' },
  { id: 'seven', name: 'Семёрка', icon: '7️⃣', multiplier: 25, rarity: 'legendary' },
  { id: 'diamond', name: 'Алмаз', icon: '💎', multiplier: 50, rarity: 'legendary' },
];

export default function CasinoSystem() {
  const [balance, setBalance] = useState(10000);
  const [betAmount, setBetAmount] = useState(100);
  const [selectedBets, setSelectedBets] = useState<RouletteBet[]>([]);
  const [rouletteNumber, setRouletteNumber] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [slotResult, setSlotResult] = useState<SlotResult | null>(null);
  const [slotSpinning, setSlotSpinning] = useState(false);

  const [stats] = useState<CasinoStats>({
    totalWagered: 125000,
    totalWon: 98000,
    totalLost: 27000,
    biggestWin: 12500,
    gamesPlayed: 342,
    winRate: 43.5,
  });

  const placeBet = (type: RouletteBet['type'], value: string | number, payout: number) => {
    const bet: RouletteBet = { type, value, amount: betAmount, payout };
    setSelectedBets([...selectedBets, bet]);
  };

  const spinRoulette = () => {
    if (selectedBets.length === 0) return;
    
    setSpinning(true);
    const totalBet = selectedBets.reduce((sum, bet) => sum + bet.amount, 0);
    setBalance(balance - totalBet);

    setTimeout(() => {
      const result = Math.floor(Math.random() * 37);
      setRouletteNumber(result);
      
      let winAmount = 0;
      selectedBets.forEach(bet => {
        const winningNumber = ROULETTE_NUMBERS.find(n => n.number === result)!;
        
        if (bet.type === 'number' && bet.value === result) {
          winAmount += bet.amount * bet.payout;
        } else if (bet.type === 'color' && bet.value === winningNumber.color) {
          winAmount += bet.amount * bet.payout;
        } else if (bet.type === 'even-odd') {
          if ((bet.value === 'even' && result % 2 === 0 && result !== 0) ||
              (bet.value === 'odd' && result % 2 === 1)) {
            winAmount += bet.amount * bet.payout;
          }
        }
      });

      setBalance(prev => prev + winAmount);
      setSelectedBets([]);
      setSpinning(false);
    }, 3000);
  };

  const spinSlots = () => {
    setSlotSpinning(true);
    setBalance(balance - betAmount);

    setTimeout(() => {
      const result: SlotSymbol[][] = Array.from({ length: 3 }, () =>
        Array.from({ length: 5 }, () => 
          SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)]
        )
      );

      const winLines: number[] = [];
      let totalWin = 0;

      result.forEach((row, i) => {
        const firstSymbol = row[0];
        if (row.every(s => s.id === firstSymbol.id)) {
          winLines.push(i);
          totalWin += betAmount * firstSymbol.multiplier;
        }
      });

      setSlotResult({ symbols: result, winLines, totalWin });
      setBalance(prev => prev + totalWin);
      setSlotSpinning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-4xl font-bold">🎰 Казино</h1>
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/'} className="ml-auto">
            <Icon name="Home" size={16} className="mr-2" />
            На главную
          </Button>
        </div>
        <p className="text-muted-foreground">Испытай удачу и выиграй!</p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Icon name="Wallet" size={48} />
            <div>
              <p className="text-sm opacity-80">Твой баланс</p>
              <p className="text-4xl font-bold">{balance.toLocaleString()} 🪙</p>
            </div>
          </div>
          <div className="text-right">
            <Button variant="secondary" size="lg">
              <Icon name="Plus" size={20} className="mr-2" />
              Пополнить
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <Icon name="TrendingUp" size={32} className="mb-2 text-green-500" />
          <div className="text-2xl font-bold">{stats.totalWon.toLocaleString()} 🪙</div>
          <div className="text-sm text-muted-foreground">Всего выиграно</div>
        </Card>
        <Card className="p-4">
          <Icon name="TrendingDown" size={32} className="mb-2 text-red-500" />
          <div className="text-2xl font-bold">{stats.totalLost.toLocaleString()} 🪙</div>
          <div className="text-sm text-muted-foreground">Всего проиграно</div>
        </Card>
        <Card className="p-4">
          <Icon name="Trophy" size={32} className="mb-2 text-yellow-500" />
          <div className="text-2xl font-bold">{stats.biggestWin.toLocaleString()} 🪙</div>
          <div className="text-sm text-muted-foreground">Макс. выигрыш</div>
        </Card>
        <Card className="p-4">
          <Icon name="Percent" size={32} className="mb-2 text-blue-500" />
          <div className="text-2xl font-bold">{stats.winRate}%</div>
          <div className="text-sm text-muted-foreground">Винрейт</div>
        </Card>
      </div>

      <Tabs defaultValue="roulette">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roulette">🎡 Рулетка</TabsTrigger>
          <TabsTrigger value="slots">🎰 Слоты</TabsTrigger>
          <TabsTrigger value="history">📊 История</TabsTrigger>
        </TabsList>

        <TabsContent value="roulette" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-xl font-bold mb-4">Рулетка</h3>
              
              <div className="relative w-full aspect-square max-w-md mx-auto mb-6">
                <div className={`w-full h-full rounded-full border-8 border-yellow-500 ${spinning ? 'animate-spin' : ''}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {rouletteNumber !== null && !spinning && (
                      <div className="text-center">
                        <div className={`text-6xl font-bold ${
                          ROULETTE_NUMBERS.find(n => n.number === rouletteNumber)?.color === 'red' ? 'text-red-500' :
                          ROULETTE_NUMBERS.find(n => n.number === rouletteNumber)?.color === 'black' ? 'text-black' :
                          'text-green-500'
                        }`}>
                          {rouletteNumber}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {ROULETTE_NUMBERS.find(n => n.number === rouletteNumber)?.color}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-1 mb-4">
                <div 
                  className="col-span-12 bg-green-500 text-white p-4 rounded text-center font-bold cursor-pointer hover:opacity-80"
                  onClick={() => placeBet('number', 0, 35)}
                >
                  0
                </div>
                {Array.from({ length: 36 }, (_, i) => {
                  const num = i + 1;
                  const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(num);
                  return (
                    <div
                      key={num}
                      className={`p-2 rounded text-center font-bold cursor-pointer hover:opacity-80 ${
                        isRed ? 'bg-red-500 text-white' : 'bg-black text-white'
                      }`}
                      onClick={() => placeBet('number', num, 35)}
                    >
                      {num}
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button 
                  variant="outline" 
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => placeBet('color', 'red', 2)}
                >
                  Красное
                </Button>
                <Button 
                  variant="outline"
                  className="bg-black text-white hover:bg-gray-800"
                  onClick={() => placeBet('color', 'black', 2)}
                >
                  Чёрное
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => placeBet('even-odd', 'even', 2)}
                >
                  Чёт/Нечёт
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Ставки</h3>
              
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Размер ставки</label>
                <Input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  min={10}
                  max={balance}
                />
                <div className="flex gap-2 mt-2">
                  {[100, 500, 1000, 5000].map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount(amount)}
                    >
                      {amount}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium">Твои ставки:</p>
                {selectedBets.map((bet, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{bet.type}: {bet.value}</span>
                    <Badge>{bet.amount} 🪙</Badge>
                  </div>
                ))}
                {selectedBets.length === 0 && (
                  <p className="text-sm text-muted-foreground">Сделай ставку</p>
                )}
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={spinRoulette}
                disabled={spinning || selectedBets.length === 0}
              >
                {spinning ? 'Крутим...' : 'Крутить!'}
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="slots" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center">🎰 Слот-машина</h3>

            {slotResult && slotResult.totalWin > 0 && (
              <div className="mb-4 p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-white text-center">
                <h4 className="text-2xl font-bold mb-1">ПОБЕДА!</h4>
                <p className="text-3xl font-bold">+{slotResult.totalWin.toLocaleString()} 🪙</p>
              </div>
            )}

            <div className="bg-gradient-to-b from-yellow-500 to-orange-500 p-8 rounded-xl mb-6">
              <div className="space-y-2">
                {slotResult ? slotResult.symbols.map((row, i) => (
                  <div key={i} className={`flex justify-center gap-2 ${slotResult.winLines.includes(i) ? 'animate-pulse' : ''}`}>
                    {row.map((symbol, j) => (
                      <div 
                        key={j} 
                        className="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-4xl shadow-lg"
                      >
                        {symbol.icon}
                      </div>
                    ))}
                  </div>
                )) : (
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center text-4xl">
                        ?
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Ставка на линию</label>
              <Input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                min={10}
                max={balance}
              />
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={spinSlots}
              disabled={slotSpinning}
            >
              {slotSpinning ? 'Крутим...' : 'Крутить! 🎰'}
            </Button>

            <div className="mt-6 p-4 border rounded">
              <h4 className="font-bold mb-2">Таблица выплат:</h4>
              <div className="grid grid-cols-3 gap-2">
                {SLOT_SYMBOLS.map(symbol => (
                  <div key={symbol.id} className="flex items-center justify-between text-sm">
                    <span>{symbol.icon} x3</span>
                    <Badge variant="outline">x{symbol.multiplier}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="p-12 text-center">
            <Icon name="History" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground">История игр пуста</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
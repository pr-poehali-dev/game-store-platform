import { FixedSizeGrid as Grid } from 'react-window';
import { useEffect, useState, useRef } from 'react';
import GameCard from './GameCard';
import { Game } from '@/types';
import { motion } from 'framer-motion';

interface VirtualGamesListProps {
  games: Game[];
  addToCart: (item: Game, type: 'game') => void;
  favorites: number[];
  onToggleFavorite: (gameId: number) => void;
  onViewGame: (game: Game) => void;
}

export default function VirtualGamesList({
  games,
  addToCart,
  favorites,
  onToggleFavorite,
  onViewGame,
}: VirtualGamesListProps) {
  const [columnCount, setColumnCount] = useState(4);
  const [columnWidth, setColumnWidth] = useState(300);
  const [containerWidth, setContainerWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
      
      if (width < 640) {
        setColumnCount(1);
        setColumnWidth(width - 32);
      } else if (width < 1024) {
        setColumnCount(2);
        setColumnWidth((width - 48) / 2);
      } else if (width < 1280) {
        setColumnCount(3);
        setColumnWidth((width - 72) / 3);
      } else {
        setColumnCount(4);
        setColumnWidth((width - 96) / 4);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const rowCount = Math.ceil(games.length / columnCount);
  const rowHeight = columnWidth * 1.5;

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= games.length) return null;
    
    const game = games[index];

    return (
      <div style={style} className="p-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.02 }}
        >
          <GameCard
            game={game}
            onBuy={(g) => addToCart(g, 'game')}
            isFavorite={favorites.includes(game.id)}
            onToggleFavorite={onToggleFavorite}
            onView={onViewGame}
          />
        </motion.div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="w-full">
      <Grid
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={Math.min(rowCount * rowHeight, 2000)}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width={containerWidth}
        overscanRowCount={2}
        className="scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
      >
        {Cell}
      </Grid>
    </div>
  );
}

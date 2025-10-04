import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Game } from '@/data/games';

interface SmartSearchProps {
  games: Game[];
  onSearch: (query: string) => void;
  searchQuery: string;
}

const POPULAR_TAGS = [
  '#multiplayer',
  '#openworld',
  '#singleplayer',
  '#coop',
  '#online',
  '#story',
  '#pvp',
];

export const SmartSearch = ({
  games,
  onSearch,
  searchQuery,
}: SmartSearchProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const filtered = games
        .filter(
          (game) =>
            game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            game.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            game.developer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            game.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((game) => game.title)
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, games]);

  const handleSearch = (query: string) => {
    onSearch(query);
    if (query.trim()) {
      const newHistory = [
        query,
        ...searchHistory.filter((h) => h !== query),
      ].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
    setShowSuggestions(false);
  };

  const handleTagClick = (tag: string) => {
    onSearch(tag.replace('#', ''));
    inputRef.current?.focus();
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Icon
          name="Search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Поиск игр по названию, жанру, описанию..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={18} />
          </button>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-card border rounded-lg shadow-lg z-50 animate-in fade-in duration-200">
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2 px-2">
                Подсказки
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-accent rounded-md flex items-center gap-2 transition-colors"
                >
                  <Icon name="Search" size={14} className="text-muted-foreground" />
                  <span className="text-sm">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Популярные:</span>
        {POPULAR_TAGS.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="cursor-pointer hover:bg-accent transition-colors"
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {searchHistory.length > 0 && !searchQuery && (
        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="History" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">История поиска</span>
            </div>
            <button
              onClick={clearHistory}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Очистить
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((query, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={() => handleSearch(query)}
              >
                {query}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

export interface FilterState {
  categories: string[];
  platforms: string[];
  priceRange: [number, number];
  minRating: number;
  releaseYears: number[];
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

const CATEGORIES = [
  'Shooter',
  'Action',
  'RPG',
  'Racing',
  'Fighting',
  'Sports',
  'Horror',
  'Adventure',
  'Stealth',
];

const PLATFORMS = ['PlayStation', 'Xbox', 'Both'];

const SORT_OPTIONS = [
  { value: 'popularity', label: 'По популярности' },
  { value: 'newest', label: 'Сначала новые' },
  { value: 'rating', label: 'По рейтингу' },
  { value: 'price-asc', label: 'Цена: дешевле' },
  { value: 'price-desc', label: 'Цена: дороже' },
] as const;

const RELEASE_YEARS = [2024, 2023, 2022, 2021, 2020, 2019];

export const AdvancedFilters = ({
  filters,
  onFiltersChange,
  onReset,
}: AdvancedFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const togglePlatform = (platform: string) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter((p) => p !== platform)
      : [...filters.platforms, platform];
    onFiltersChange({ ...filters, platforms: newPlatforms });
  };

  const toggleYear = (year: number) => {
    const newYears = filters.releaseYears.includes(year)
      ? filters.releaseYears.filter((y) => y !== year)
      : [...filters.releaseYears, year];
    onFiltersChange({ ...filters, releaseYears: newYears });
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.platforms.length +
    filters.releaseYears.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0);

  return (
    <div className="bg-card rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="SlidersHorizontal" size={20} className="text-primary" />
          <h3 className="font-semibold">Фильтры и сортировка</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-muted-foreground"
            >
              Сбросить
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              size={18}
            />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Select
          value={filters.sortBy}
          onValueChange={(value: FilterState['sortBy']) =>
            onFiltersChange({ ...filters, sortBy: value })
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isExpanded && (
        <div className="space-y-6 pt-4 border-t animate-in fade-in duration-300">
          <div>
            <Label className="text-sm font-medium mb-3 block">Жанр</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Badge
                  key={category}
                  variant={
                    filters.categories.includes(category)
                      ? 'default'
                      : 'outline'
                  }
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Платформа</Label>
            <div className="flex gap-2">
              {PLATFORMS.map((platform) => (
                <Badge
                  key={platform}
                  variant={
                    filters.platforms.includes(platform) ? 'default' : 'outline'
                  }
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => togglePlatform(platform)}
                >
                  {platform === 'Both' ? 'Обе' : platform}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">
                Диапазон цен (₽)
              </Label>
              <span className="text-sm text-muted-foreground">
                {filters.priceRange[0].toLocaleString('ru-RU')} -{' '}
                {filters.priceRange[1].toLocaleString('ru-RU')}
              </span>
            </div>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={filters.priceRange}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  priceRange: value as [number, number],
                })
              }
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">
                Минимальный рейтинг
              </Label>
              <span className="text-sm text-muted-foreground">
                {filters.minRating > 0 ? `${filters.minRating}+` : 'Любой'}
              </span>
            </div>
            <div className="flex gap-2">
              {[0, 7, 8, 9].map((rating) => (
                <Badge
                  key={rating}
                  variant={filters.minRating === rating ? 'default' : 'outline'}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() =>
                    onFiltersChange({ ...filters, minRating: rating })
                  }
                >
                  <Icon name="Star" size={14} className="mr-1" />
                  {rating === 0 ? 'Все' : `${rating}+`}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">
              Год выпуска
            </Label>
            <div className="flex flex-wrap gap-2">
              {RELEASE_YEARS.map((year) => (
                <Badge
                  key={year}
                  variant={
                    filters.releaseYears.includes(year) ? 'default' : 'outline'
                  }
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleYear(year)}
                >
                  {year}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

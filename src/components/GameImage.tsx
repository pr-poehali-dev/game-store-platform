import { gameCovers } from '@/data/gameCovers';

interface GameImageProps {
  title: string;
  fallbackUrl?: string;
  alt?: string;
  className?: string;
}

export default function GameImage({ title, fallbackUrl, alt, className }: GameImageProps) {
  // Пытаемся получить обложку из нашей базы
  const coverUrl = gameCovers[title];
  
  // Если есть - используем, если нет - fallback или заглушка
  const finalUrl = coverUrl || fallbackUrl || 'https://via.placeholder.com/400x600/1a1a2e/eee?text=' + encodeURIComponent(title);

  return (
    <img
      src={finalUrl}
      alt={alt || title}
      className={className}
      loading="lazy"
      onError={(e) => {
        // Если изображение не загрузилось, показываем заглушку
        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600/1a1a2e/eee?text=' + encodeURIComponent(title);
      }}
    />
  );
}

import { gameCovers } from '@/data/gameCovers';

interface GameImageProps {
  title: string;
  fallbackUrl?: string;
  alt?: string;
  className?: string;
}

export default function GameImage({ title, fallbackUrl, alt, className }: GameImageProps) {
  const coverUrl = gameCovers[title];
  const finalUrl = fallbackUrl || coverUrl || '/img/game-placeholder.jpg';

  return (
    <img
      src={finalUrl}
      alt={alt || title}
      className={className}
      loading="lazy"
    />
  );
}
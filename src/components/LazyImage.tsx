import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const createLowQualityPlaceholder = (src: string): string => {
  return src.replace(/\.(jpg|jpeg|png|webp)$/i, '_thumb.$1');
};

const loadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export default function LazyImage({ src, alt, className, placeholder }: LazyImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [isHdLoaded, setIsHdLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const lqSrc = createLowQualityPlaceholder(src);
    
    loadImage(lqSrc)
      .then(() => {
        setCurrentSrc(lqSrc);
        return loadImage(src);
      })
      .catch(() => {
        setCurrentSrc(src);
        return loadImage(src);
      })
      .then(() => {
        setCurrentSrc(src);
        setIsHdLoaded(true);
      })
      .catch(() => {
        setIsHdLoaded(true);
      });
  }, [isInView, src]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!currentSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/30 animate-pulse">
          <div className="absolute inset-0 skeleton-shimmer"></div>
        </div>
      )}
      
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`${className} transition-all duration-700 ${
            isHdLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-70 blur-sm scale-105'
          }`}
          loading="lazy"
        />
      )}
    </div>
  );
}
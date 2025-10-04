import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

const getOptimizedSrc = (src: string, isWebP: boolean): string => {
  if (isWebP) {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  return src;
};

const createLowQualityPlaceholder = (src: string, isWebP: boolean): string => {
  const optimized = getOptimizedSrc(src, isWebP);
  return optimized.replace(/\.(jpg|jpeg|png|webp)$/i, '_thumb.$1');
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
  const [webpSupported] = useState(supportsWebP());
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

    const lqSrc = createLowQualityPlaceholder(src, webpSupported);
    const hdSrc = getOptimizedSrc(src, webpSupported);
    
    loadImage(lqSrc)
      .then(() => {
        setCurrentSrc(lqSrc);
        return loadImage(hdSrc);
      })
      .catch(() => {
        setCurrentSrc(src);
        return loadImage(src);
      })
      .then(() => {
        setCurrentSrc(hdSrc);
        setIsHdLoaded(true);
      })
      .catch(() => {
        setIsHdLoaded(true);
      });
  }, [isInView, src, webpSupported]);

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
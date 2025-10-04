import { useState, useEffect, useRef } from 'react';
import { imageCache } from '@/utils/imageCache';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const getConnectionSpeed = (): 'slow' | 'fast' => {
  if (typeof navigator === 'undefined') return 'fast';
  
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) return 'fast';
  
  if (connection.effectiveType === '4g' || connection.effectiveType === 'wifi') {
    return 'fast';
  }
  
  if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g') {
    return 'slow';
  }
  
  return 'fast';
};

const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

const getOptimizedSrc = (src: string, isWebP: boolean, quality: 'low' | 'high'): string => {
  let optimized = src;
  
  if (isWebP && quality === 'high') {
    optimized = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  if (quality === 'low') {
    optimized = optimized.replace(/\.(jpg|jpeg|png|webp)$/i, '_thumb.$1');
  }
  
  return optimized;
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
  const [connectionSpeed] = useState(getConnectionSpeed());
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

    const cached = imageCache.get(src);
    if (cached) {
      setCurrentSrc(cached);
      setIsHdLoaded(true);
      return;
    }

    const quality = connectionSpeed === 'slow' ? 'low' : 'high';
    const lqSrc = getOptimizedSrc(src, false, 'low');
    const hdSrc = getOptimizedSrc(src, webpSupported, quality);
    
    if (connectionSpeed === 'slow') {
      loadImage(lqSrc)
        .then(() => {
          setCurrentSrc(lqSrc);
          setIsHdLoaded(true);
          imageCache.cacheImage(lqSrc);
        })
        .catch(() => {
          setCurrentSrc(src);
          setIsHdLoaded(true);
        });
    } else {
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
          imageCache.cacheImage(hdSrc);
        })
        .catch(() => {
          setIsHdLoaded(true);
        });
    }
  }, [isInView, src, webpSupported, connectionSpeed]);

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
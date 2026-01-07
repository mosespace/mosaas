'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { School } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SchoolImageProps {
  src?: string;
  style?: React.CSSProperties;
  alt?: string;
  className?: string;
  imageStyle?: string;
  fallback?: React.ReactNode;
}

export function DataImage({
  src,
  style,
  alt,
  className,
  imageStyle,
  fallback,
}: SchoolImageProps) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div
        className={cn(
          className,
          'flex items-center justify-center bg-linear-to-br from-primary/80 to-primary/10 rounded-lg shadow-sm',
          'w-10 h-10',
        )}
        style={style}
      >
        {fallback || <School className="w-6 h-6 text-white" />}
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg overflow-hidden shadow-sm', className)}>
      <Image
        src={src || '/placeholder.svg'}
        alt={alt || 'Smart Fundi'}
        width={48}
        height={48}
        className={cn('w-full h-full object-contain', imageStyle)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}

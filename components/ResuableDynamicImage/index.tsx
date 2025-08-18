'use client';

import Image, { StaticImageData, ImageProps } from 'next/image';
import React from 'react';
import fallbackImage from '@/static/images/fallbackImage.png' 

interface DynamicImageProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
  objectFit?: string;
  fill?: boolean;
}

const DynamicImage: React.FC<DynamicImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  unoptimized = false,
  fill = false,
  objectFit,
}) => {
  const getFullUrl = (uri: string) => {
    if (!uri) return '';
    if (uri.startsWith('/')) return uri;
    if (uri.startsWith('http')) return uri;
    if (uri.startsWith('public://')) {
      const cleanedUri = uri.replace('public://', '');
      return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/sites/default/files/${cleanedUri}`;
    }
    return uri;
  };

  const getValidImageSrc = (src: string | StaticImageData, fallback: string | StaticImageData) => {
    if (typeof src !== 'string') return src;

    const fullUrl = getFullUrl(src);
    if (
      !fullUrl ||
      fullUrl.includes('undefined') ||
      fullUrl.includes('null')
    ) {
      return fallback;
    }
    return fullUrl;
  };
  const finalSrc = getValidImageSrc(src, fallbackImage);

  return (
    <Image
      src={finalSrc || fallbackImage}
      alt={alt || 'Image'}
      {...(fill
        ? { fill: true }
        : { width: width, height: height || 0 }
      )}
      className={className}
      priority={priority}
      unoptimized={unoptimized}
      quality={80}
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      objectFit={objectFit}
    />
  );
};

export default DynamicImage;


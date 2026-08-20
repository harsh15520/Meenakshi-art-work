/**
 * Image Optimization Utilities
 * 
 * Provides blur placeholders, lazy loading helpers, and image optimization
 * utilities for improved performance.
 */

import { ImageProps } from 'next/image';

/**
 * Generate a simple SVG blur placeholder for images
 * Uses a low-resolution colored block as placeholder
 */
export function getBlurPlaceholder(color: string = '#d9c6b5'): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
      <rect width="10" height="10" fill="${color}"/>
    </svg>
  `.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Generate a blur placeholder with dominant color
 * For hero images that need better UX
 */
export function getHeroBlurPlaceholder(dominantColor: string = '#f8f2e9'): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <rect width="20" height="20" fill="${dominantColor}"/>
      <circle cx="10" cy="10" r="5" fill="#d9c6b5" opacity="0.3"/>
    </svg>
  `.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Default blur placeholder for gallery images
 */
export const DEFAULT_BLUR = getBlurPlaceholder('#d9c6b5');

/**
 * Hero image blur placeholders
 */
export const HERO_BLUR = getHeroBlurPlaceholder('#f8f2e9');

/**
 * Gallery blur placeholder
 */
export const GALLERY_BLUR = getBlurPlaceholder('#302927');

/**
 * Academy blur placeholder
 */
export const ACADEMY_BLUR = getBlurPlaceholder('#ede0d5');

/**
 * Image component props for lazy loading
 * Use these for images below the fold
 */
export const lazyImageProps: Partial<ImageProps> = {
  loading: 'lazy',
  decoding: 'async',
};

/**
 * Image component props for priority images (hero)
 */
export const priorityImageProps: Partial<ImageProps> = {
  priority: true,
  fetchPriority: 'high',
};

/**
 * Check if an image path is a hero image
 */
export function isHeroImage(src: string): boolean {
  return (
    src.includes('hero-home.png') ||
    src.includes('hero-image') ||
    src.includes('/hero') ||
    src.includes('founder-meena.png')
  );
}

/**
 * Get appropriate blur placeholder for an image
 */
export function getPlaceholderForImage(src: string): string {
  if (isHeroImage(src)) return HERO_BLUR;
  if (src.includes('academy') || src.includes('student')) return ACADEMY_BLUR;
  if (src.includes('gallery') || src.includes('painting')) return GALLERY_BLUR;
  return DEFAULT_BLUR;
}

/**
 * Get appropriate image props based on position
 */
export function getImageProps(src: string, isAboveFold: boolean = true): Partial<ImageProps> {
  if (isAboveFold) {
    return {
      ...priorityImageProps,
      placeholder: 'blur',
      blurDataURL: getPlaceholderForImage(src),
    };
  }

  return {
    ...lazyImageProps,
    placeholder: 'blur',
    blurDataURL: getPlaceholderForImage(src),
  };
}
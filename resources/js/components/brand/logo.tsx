import { Link } from '@inertiajs/react';
import * as React from 'react';
import asset from '@/lib/assets';
import { cn } from '@/lib/utils';
import { home } from '@/routes';

export type LogoType =
  | 'horizontal'
  | 'horizontal-tagline'
  | 'stacked'
  | 'stacked-tagline'
  | 'wordmark'
  | 'wordmark-tagline'
  | 'icon-square'
  | 'icon-wide'
  | 'full'
  | 'small';

const typeFileMap: Record<LogoType, string> = {
  horizontal: 'logo-horizontal',
  'horizontal-tagline': 'logo-horizontal-tagline',
  stacked: 'logo-stacked',
  'stacked-tagline': 'logo-stacked-tagline',
  wordmark: 'wordmark',
  'wordmark-tagline': 'wordmark-tagline',
  'icon-square': 'icon-square',
  'icon-wide': 'icon-wide',
  full: 'logo-horizontal-tagline',
  small: 'icon-wide',
};

interface LogoProps extends Omit<React.ComponentProps<typeof Link>, 'size'> {
  imageClassName?: string;
  type?: LogoType;
  size?: 'small' | 'medium' | 'large';
  variant?: 'dark-blue' | 'dark' | 'light';
  tone?: 'default' | 'inverse';
}

function Logo({
  className,
  imageClassName,
  type = 'full',
  size = 'medium',
  tone = 'default',
  variant = 'dark-blue',
  href = home.url(),
  ...props
}: LogoProps) {
  const sizeClass = {
    small: 'h-6 w-auto',
    medium: 'h-8 w-auto',
    large: 'h-10 w-auto',
  };
  const appName = import.meta.env.VITE_APP_NAME || 'App';
  const fileName = `${typeFileMap[type]}-${variant}.svg`;

  return (
    <Link className={cn('flex select-none', className)} href={href} {...props}>
      <img
        src={asset(`assets/logo/${fileName}`)}
        alt={`${appName} Logo`}
        className={cn(
          sizeClass[size],
          tone === 'inverse' && 'brightness-0 invert',
          imageClassName,
        )}
      />
    </Link>
  );
}

export { Logo };

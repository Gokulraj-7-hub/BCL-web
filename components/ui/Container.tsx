import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Element to render as — defaults to `div`. */
  as?: ElementType;
}

/** Centres content and applies the shared responsive page gutters. */
export function Container({ children, className, as: Component = 'div' }: ContainerProps) {
  return <Component className={cn('container-page', className)}>{children}</Component>;
}

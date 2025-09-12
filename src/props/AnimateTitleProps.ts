import { JSX } from 'react'

export type AnimateTitleProps = {
  className?: string;
  tagName: keyof JSX.IntrinsicElements;
  text: string;
  delayCount?: number;
  whiteEnd?: boolean;
  duration?: number;
}
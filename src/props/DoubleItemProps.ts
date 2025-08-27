import { StaticImageData } from 'next/image'

export type DoubleItemProps = {
  title: string,
  icon: string | StaticImageData,
  lines: {
    why_icon?: string,
    why_description?: string,
    what_icon?: string,
    what_description?: string,
  }[],
  isRight?: boolean
}
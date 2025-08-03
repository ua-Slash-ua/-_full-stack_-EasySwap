import React from 'react'
import './styles.css'
import { Inter } from 'next/font/google';
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans', // (необов’язково, але зручно)
  weight: ['400', '700'], // вкажи, які тобі потрібні
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // (необов’язково)
});
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${inter.variable} ${notoSans.variable}`}>
      <body className={`${inter.variable} ${notoSans.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  )
}

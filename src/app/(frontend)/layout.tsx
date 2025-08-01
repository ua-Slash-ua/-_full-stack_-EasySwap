import React from 'react'
import './styles.css'
import { Inter } from 'next/font/google';


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
    <html lang="en" className={inter.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

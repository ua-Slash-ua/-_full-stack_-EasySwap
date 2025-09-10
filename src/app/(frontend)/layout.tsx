import React from 'react'
import './styles.css'
import { Inter, Noto_Sans } from 'next/font/google'
import { PopupProvider } from '@/context/PopupContext'
import { PopupManager } from '@/components/PopUps/PopupManager'
import { generateMetadata as generateMetaDataPage } from '@/api/getPage'
import { menu } from '@/config/menu.config'



const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans', // (необов’язково, але зручно)
  weight: ['400', '700'], // вкажи, які тобі потрібні
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // (необов’язково)
})
export async function generateMetadata(): Promise<any> {
  return await generateMetaDataPage('main',)
}



export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${inter.variable} ${notoSans.variable}`}>
      <body className={`${inter.variable} ${notoSans.variable}`}>
        <main>
          <PopupProvider>
            {children}
            <PopupManager />
          </PopupProvider>
        </main>
      </body>
    </html>
  )
}

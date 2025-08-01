import s from './page.module.css'
import { getPayload } from 'payload'
import React, { JSX } from 'react'

import config from '@/payload.config'
import './styles.css'
import './reset.css'
import HeroSection from '@/components/sections/HeroSection/HeroSection'
import Header from '@/components/Header/Header'
import NumbersSection from '@/components/sections/NumbersSection/NumbersSection'
import PromiseSection from '@/components/sections/PromiseSection/PromiseSection'
import DoubleSection from '@/components/sections/DoubleSection/DoubleSection'

const BLOCK_COMPONENTS =  {
  'hero-block': HeroSection ,
  'numbers-block': NumbersSection ,
  'promise-block': PromiseSection ,
  'double-block': DoubleSection ,
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })


  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'main' } },
  })
  const page = docs[0]

  return (
    <div className={s.page}>
      <Header/>
      {page?.blocks?.map((block, i) => {
        if (block.enabled === false) return null
        const BlockComponent = BLOCK_COMPONENTS[
          block.blockType as keyof typeof BLOCK_COMPONENTS
          ] as unknown as React.ComponentType<{ block: unknown; locale: string }>
        if (!BlockComponent) return null

        return <BlockComponent key={block.id || i} block={block} locale={locale} />
      })}
    </div>
  )
}


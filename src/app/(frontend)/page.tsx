import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import './reset.css'
import HeroSection from '@/components/sections/HeroSection/HeroSection'
import Header from '@/components/Header/Header'
import NumbersSection from '@/components/sections/NumbersSection/NumbersSection'
import PromiseSection from '@/components/sections/PromiseSection/PromiseSection'
import DoubleSection from '@/components/sections/DoubleSection/DoubleSection'
import ServiceSection from '@/components/sections/ServiceSection/ServiceSection'
import FAQSection from '@/components/sections/FAQSection/FAQSection'
import SupportSection from '@/components/sections/SupportSection/SupportSection'
import ReviewSection from '@/components/sections/ReviewSection/ReviewSection'
import { getReviews } from '@/api/getReviews'
import ApplicationSection from '@/components/sections/ApplicationSection/ApplicationSection'
import { getContacts } from '@/api/getContacts'

const BLOCK_COMPONENTS = {
  'hero-block': HeroSection,
  'numbers-block': NumbersSection,
  'promise-block': PromiseSection,
  'double-block': DoubleSection,
  'service-block': ServiceSection,
  'faq-block': FAQSection,
  'support-block': SupportSection,
  'review-block': ReviewSection,
  'application-block': ApplicationSection,
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'main' } },
  })
  const reviews = await getReviews()
  const contacts = await getContacts()
  const page = docs[0]

  return (
    <>
      <Header />
      {page?.blocks?.map((block, i) => {
        if (block.enabled === false) return null
        const BlockComponent = BLOCK_COMPONENTS[
          block.blockType as keyof typeof BLOCK_COMPONENTS
        ] as unknown as React.ComponentType<{ block: unknown; locale: string }>
        if (!BlockComponent) return null
        if (block.blockType === 'review-block') {

          return <BlockComponent key={block.id || i} block={reviews} locale={locale} />
        }else if (block.blockType === 'application-block') {
          return <BlockComponent key={block.id || i} block={contacts} locale={locale} />
        }
        return <BlockComponent key={block.id || i} block={block} locale={locale} />
      })}
    </>
  )
}

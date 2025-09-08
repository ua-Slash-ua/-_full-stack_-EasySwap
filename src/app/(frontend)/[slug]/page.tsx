import config from '@payload-config'
import { getPayload } from 'payload'
import Header from '@/components/Header/Header'
import React from 'react'
import { getContacts } from '@/api/getContacts'
import Footer from '@/components/Footer/Footer'
import HeroSection from '@/components/sections/HeroSection/HeroSection'
import NumbersSection from '@/components/sections/NumbersSection/NumbersSection'
import PromiseSection from '@/components/sections/PromiseSection/PromiseSection'
import DoubleSection from '@/components/sections/DoubleSection/DoubleSection'
import ServiceSection from '@/components/sections/ServiceSection/ServiceSection'
import FAQSection from '@/components/sections/FAQSection/FAQSection'
import SupportSection from '@/components/sections/SupportSection/SupportSection'
import ReviewSection from '@/components/sections/ReviewSection/ReviewSection'
import ApplicationSection from '@/components/sections/ApplicationSection/ApplicationSection'
import ContactsSection from '@/components/sections/ContactsSection/ContactsSection'
import CurrenciesSection from '@/components/sections/CurrenciesSection/CurrenciesSection'
import { getCurrencies } from '@/api/getCurrencies'
import { getReviews } from '@/api/getReviews'

type Props = {
  params: {
    slug: string
  }
}
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
  'contact-block': ContactsSection,
  'currencies-block': CurrenciesSection,
}
export default async function Page({ params }: Props) {

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const contacts = await getContacts()
  const currencies = await getCurrencies()
  const reviews = await getReviews()

  const { docs } = await payload.find({
    collection: 'pages',
    pagination: false,
  })

  const pageMain = docs.find(page => page.slug === params.slug)


  return (
    <>
      <Header block={contacts}/>
      {pageMain?.blocks?.map((block, i) => {
        if (block.enabled === false) return null
        const BlockComponent = BLOCK_COMPONENTS[
          block.blockType as keyof typeof BLOCK_COMPONENTS
          ] as unknown as React.ComponentType<{
          block: unknown
          departments?: any
          telegram?: any
        }>
        if (!BlockComponent) return null
        if (block.blockType === 'review-block') {
          return (
            <BlockComponent
              key={block.id || i}
              block={reviews}
              telegram={contacts.social_networks?.telegram?.link}
            />
          )
        } else if (block.blockType === 'application-block' || block.blockType === 'contact-block') {
          return <BlockComponent key={block.id || i} block={contacts}  />
        } else if (block.blockType === 'support-block') {
          return (
            <BlockComponent
              key={block.id || i}
              block={block}
              telegram={contacts.social_networks?.telegram?.link}
            />
          )
        } else if (block.blockType === 'currencies-block' || block.blockType === 'hero-block') {
          return (
            <BlockComponent
              key={block.id || i}
              block={currencies.docs}
              departments={contacts.locations}
            />
          )
        }

        return <BlockComponent key={block.id || i} block={block}  />
      })}
      <Footer block={contacts}  />
    </>
  )
}

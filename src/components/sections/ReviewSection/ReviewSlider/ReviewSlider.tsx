'use client'
import 'swiper/css'
import 'swiper/css/navigation'

import './ReviewSlider.css'
import s from './ReviewSlider.module.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { ReviewProps } from '@/props/ReviewProps'
import React, { useEffect, useRef, useState } from 'react'
import { reviewData } from '@/config/review.config'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import { usePopup } from '@/context/PopupContext'

export default function ReviewSlider({ reviews }: { reviews: ReviewProps[] }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const { setOpen } = usePopup()
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeSlide)
    }
  }, [activeSlide])
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth / 4)
    handleResize() // виставляємо ширину одразу після маунту

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const reviewCount = reviews.length
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        // autoHeight={true}
        onBeforeInit={swiper => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          0: { slidesPerView: 1.1 }, // для екранів <= 376px
          377: { slidesPerView: 4 }, // для ширших екранів
        }}
        pagination={{ clickable: true }}
        className={s.review_swiper}
        onSwiper={swiper => (swiperRef.current = swiper)}
        onSlideChange={swiper => {
          setActiveSlide(swiper.activeIndex)
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide className={s.review_slide}>
            <div className={s.swiper_header}>
              <div dangerouslySetInnerHTML={{ __html: reviewData.icon }} />
              <p>{review.description}</p>
            </div>
            <div
              className={s.review_image}
              onClick={() =>
                setOpen('review_image', { src: review.photo.url, alt: review.photo.alt })
              }
            >
              <Image width={112} height={104} src={review.photo.url} alt={review.photo.alt} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={s.review_slider_nav}>
        {width <= 376 && (
          <div className={`${s.swiper_scroll_container} show`}>
            <span className={s.swiper_scroll_info}>
              {activeSlide + 1}/{reviewCount}
            </span>
            <div
              className={s.swiper_scroll_back}
              style={{ width: `${((activeSlide + 1) / reviewCount) * 100}%` }}
            ></div>
          </div>
        )}

        <div
          ref={prevRef}
          className="prevReview"
          dangerouslySetInnerHTML={{ __html: reviewData.iconPrev }}
          onClick={() => {
            if (activeSlide <= 0) return
            setActiveSlide(activeSlide - 1)
          }}
        />
        {width >= 376 && (
          <div className={`${s.swiper_scroll_container} hide`}>
            <span className={s.swiper_scroll_info}>
              {activeSlide + 4}/{reviewCount}
            </span>
            <div
              className={s.swiper_scroll_back}
              style={{ width: `${((activeSlide + 4) / reviewCount) * 100}%` }}
            ></div>
          </div>
        )}
        <div
          ref={nextRef}
          className="nextReview"
          dangerouslySetInnerHTML={{ __html: reviewData.iconNext }}
          onClick={() => {
            if (activeSlide >= reviews.length - 4) return
            setActiveSlide(activeSlide + 1)
          }}
        />
      </div>
    </>
  )
}

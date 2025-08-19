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
import ElasticSlider from '@/libs/ElasticSlider/ElasticSlider'
import Image from 'next/image'

export default function ReviewSlider({ reviews }: { reviews: ReviewProps[] }) {
  const [activeSlide, setActiveSlide] = useState(0)

  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeSlide)
    }
  }, [activeSlide])

  const reviewCount = reviews.length
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
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
        slidesPerView={4}
        pagination={{ clickable: true }}
        className={s.review_swiper}
        onSwiper={swiper => (swiperRef.current = swiper)}
      >
        {reviews.map((review, index) => (
          <SwiperSlide className={s.review_slide}>
            <div className={s.swiper_header}>
              <div dangerouslySetInnerHTML={{ __html: reviewData.icon }} />
              <p>
                {activeSlide} - {review.description}
              </p>
            </div>
            <div className={s.review_image}>
              <Image width={112} height={104} src={review.photo.url} alt={review.photo.alt} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={s.review_slider_nav}>
        <ElasticSlider
          leftIcon={
            <>
              <div
                ref={prevRef}
                className="prevReview"
                dangerouslySetInnerHTML={{ __html: reviewData.iconPrev }}
              />
            </>
          }
          rightIcon={
            <>
              <div
                ref={nextRef}
                className="nextReview"
                dangerouslySetInnerHTML={{ __html: reviewData.iconNext }}
              />
            </>
          }
          startingValue={1}
          defaultValue={activeSlide}
          maxValue={reviewCount}
          isStepped
          stepSize={1}
          func={(number: number) => {
            if (number <= 4) {
              number = 4
            }
            setActiveSlide(number - 4)
          }}
        />
      </div>
    </>
  )
}

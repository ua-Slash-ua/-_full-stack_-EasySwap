'use client'
// import 'swiper/css';
// import 'swiper/css/navigation';

import './ReviewSlider.css'
import s from './ReviewSlider.module.css'
import { Swiper } from 'swiper/react'
import ReviewItem from '@/components/sections/ReviewSection/ReviewSlider/ReviewItem/ReviewItem'
import { ReviewProps } from '@/props/ReviewProps'
import { useRef, useState } from 'react'
import { reviewData } from '@/config/review.config'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import ElasticSlider from '@/libs/ElasticSlider/ElasticSlider'


export default function ReviewSlider({ reviews }: { reviews: ReviewProps[] }) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const reviewCount = reviews.length
  const [activeSlide, setActiveSlide] = useState(2)
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        onBeforeInit={(swiper) => {
          // Безпечна перевірка
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== 'boolean'
          ) {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        className={s.review_swiper}
      >
        {reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
        ))}
      </Swiper>

      <div className={s.review_slider_nav}>
        <ElasticSlider
          leftIcon={
            <>
              <div  ref={prevRef}  className="prevReview" dangerouslySetInnerHTML ={{ __html: reviewData.iconPrev }} />
            </>
          }
          rightIcon={
            <>
              <div  ref={nextRef} className="nextReview" dangerouslySetInnerHTML={{ __html: reviewData.iconNext }} />
            </>
          }
          startingValue={1}
          defaultValue={activeSlide}
          maxValue={reviewCount}
          isStepped
          stepSize={1}
        />
      </div>
    </>
  )
}

import Slider, { Settings } from 'react-slick'
import ArrowPrev from '../section-slider/arrowPrev'
import ArrowNext from '../section-slider/arrowNext'
import { useState } from 'react'
import styles from './sectionReviews.module.scss'
import IconCherry from '../../icons/cherry.svg?react'
import IconBanana from '../../icons/banana.svg?react'
import FirstReview from '../../images/review1.png'
import SecondReview from '../../images/review2.png'
import ThirdReview from '../../images/review3.png'

const SectionReviews = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <ArrowPrev />,
    nextArrow: <ArrowNext />,
    appendDots: (dots) => {
      return (
        <div style={{ bottom: '0px', left: '0px' }}>
          <ul style={{ margin: '0px' }}> {dots} </ul>
        </div>
      )
    },
    customPaging: (i) => {
      return (
        <div
          style={{
            width: '17px',
            height: '17px',
            background:
              activeSlide === i ? 'white' : 'rgba(255, 255, 255, 0.60)',
            borderRadius: '17px'
          }}
        ></div>
      )
    },
    beforeChange: (_, next) => {
      setActiveSlide(next)
    }
  }

  return (
    <section className={styles.sectionBg} id="review">
      <div className={styles.border}>
        <div className={styles.iconWrapper}>
          <IconCherry />
        </div>
      </div>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionHeader}>Відгуки</h2>
        <Slider {...settings} className={styles.sliderContainer}>
          <div className={styles.slideWrapper}>
            <div className={styles.slideElement}>
              <img src={FirstReview} alt="good product review" />
            </div>
          </div>
          <div className={styles.slideWrapper}>
            <div className={styles.slideElement}>
              <img src={SecondReview} alt="good product review" />
            </div>
          </div>
          <div className={styles.slideWrapper}>
            <div className={styles.slideElement}>
              <img src={ThirdReview} alt="good product review" />
            </div>
          </div>
          <div className={styles.slideWrapper}>
            <div className={styles.slideElement}>
              <img src={FirstReview} alt="good product review" />
            </div>
          </div>
          <div className={styles.slideWrapper}>
            <div className={styles.slideElement}>
              <img src={SecondReview} alt="good product review" />
            </div>
          </div>
        </Slider>
      </div>
      <div className={styles.borderSecond}>
        <div className={styles.iconBwrapper}>
          <IconBanana />
        </div>
      </div>
    </section>
  )
}

export default SectionReviews

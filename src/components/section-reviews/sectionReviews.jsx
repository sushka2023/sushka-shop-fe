import Slider from "react-slick";
import ArrowPrev from "../section-slider/arrowPrev";
import ArrowNext from "../section-slider/arrowNext";
import { useState } from "react";
import styles from "./sectionReviews.module.scss";
import { ReactComponent as IconCherry } from '../../icons/cherry.svg';
import { ReactComponent as IconBanana } from "../../icons/banana.svg";

const SectionReviews = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <ArrowPrev />,
    nextArrow: <ArrowNext />,
    appendDots: (dots) => (
      <div style={{ bottom: "0px", left: "0px" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "17px",
          height: "17px",
          background: activeSlide === i ? "white" : "rgba(255, 255, 255, 0.60)",
          borderRadius: "17px",
        }}
      ></div>
    ),
    beforeChange: (current, next) => {
      setActiveSlide(next);
    },
  };

  return (
    <section className={styles.sectionBg}>
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
              <img
                width={400}
                height={390}
                src="/src/images/review1.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.slideWrapper}>
            <div className={styles.slideElement}>
              <img
                width={400}
                height={390}
                src="/src/images/review2.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.slideWrapper}>
            <div className={styles.slideElement}>
              <img
                width={400}
                height={390}
                src="/src/images/review3.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.slideWrapper}>
            <div className={styles.slideElement}>
              <img
                width={400}
                height={390}
                src="/src/images/review1.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.slideWrapper}>
            <div className={styles.slideElement}>
              <img
                width={400}
                height={390}
                src="/src/images/review2.png"
                alt=""
              />
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
  );
};

export default SectionReviews

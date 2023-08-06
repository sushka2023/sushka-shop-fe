import Slider from "react-slick";
import ArrowPrev from './arrowPrev';
import ArrowNext from './arrowNext';
import CustomSlider from './customSlider';
import { useState } from "react";
import styles from './sliderSection.module.scss';

const SlideSection = () => {
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
    <div style={{bottom: "0px", left: "0px"}}>
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
      <div className={styles.border}></div>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionHeader}>Популярні товари</h2>
        <Slider {...settings} className={styles.sliderContainer}>
          <CustomSlider index={1} width={400} />
          <CustomSlider index={2} width={400} />
          <CustomSlider index={3} width={400} />
          <CustomSlider index={4} width={400} />
          <CustomSlider index={5} width={400} />
        </Slider>
      </div>
      <div className={styles.borderSecond}></div>
    </section>
  );
};

export default SlideSection;
import { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ArrowPrev from "./arrowPrev";
import ArrowNext from "./arrowNext";
import CustomSlider from "./customSlider";
import styles from "./sliderSection.module.scss";
import { ReactComponent as ArrowBtn } from "../../icons/arrow.svg";

const SlideSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <ArrowPrev/>,
    nextArrow: <ArrowNext/>,
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

  const renderSlide = (index) => {
    if (index === 4) {
      return (
        <div className={styles.lastSlider}>
          <Link
            className={`${styles.customButton} ${styles.customLink}`}
            onClick={handleButtonClick}
          >
            переглянути каталог
            <ArrowBtn className={styles.arrowBtn} width={10} height={17} />
          </Link>
        </div>
      );
    } else {
      return <CustomSlider index={index + 1} width={400} />;
    }
  };

  const handleButtonClick = () => {
    // Обработка действия при клике на кнопку под индексом 6
  };

  return (
    <section className={styles.sectionBg}>
      <div className={styles.border}></div>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionHeader}>Популярні товари</h2>
        <Slider {...settings} className={styles.sliderContainer}>
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index}>{renderSlide(index)}</div>
          ))}
        </Slider>
      </div>
      <div className={styles.borderSecond}></div>
    </section>
  );
};

export default SlideSection;
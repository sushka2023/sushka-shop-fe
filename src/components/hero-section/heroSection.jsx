import styles from './HeroSection.module.scss';

const HeroSection = () => {
    return (
      <section className={styles.mainContainer}>
        <main className={styles.mainBlock}>
          <div className={styles.slogan}>
            <h1 className={styles.sloganHeader}>
              Найсолодші ласощі <br /> <span className={styles.sloganHeaderItalic}>від природи,</span> <br /> зроблені
              з любов`ю
            </h1>
            <p className={styles.sloganParagraph}>
              Відкрийте для себе неперевершені смаки нашої <br /> повністю
              натуральної фруктової <br /> пастили та фріпсів
            </p>
            <button className={styles.sloganButton}>Переглянути каталог</button>
          </div>
          <img
            src="/src/images/hero-pic.jpg"
            alt="dried fruits in plastic bags"
            width={760}
            height={730}
          />
        </main>
      </section>
    );
};

export default HeroSection;
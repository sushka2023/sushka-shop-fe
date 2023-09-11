import { Link } from 'react-router-dom';
import HeroPic from '../../images/hero-pic.jpg';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
    return (
      <section className={styles.mainContainer}>
        <main className={styles.mainBlock}>
          <div className={styles.slogan}>
            <h1 className={styles.sloganHeader}>
              Найсолодші ласощі <br />
              <span className={styles.sloganHeaderItalic}> від природи, </span>
              <br /> зроблені з любов`ю
            </h1>
            <p className={styles.sloganParagraph}>
              Відкрийте для себе неперевершені смаки нашої <br /> повністю
              натуральної фруктової <br /> пастили та фріпсів
            </p>
            <Link
              to="catalog"
              className={`${styles.sloganButton} ${styles.sloganLink} `}
            >
              Переглянути каталог
            </Link>
          </div>
          <img
            src={HeroPic}
            alt="dried fruits in plastic bags"
            width={760}
            height={730}
          />
        </main>
      </section>
    );
};

export default HeroSection;
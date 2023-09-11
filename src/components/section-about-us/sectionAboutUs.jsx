import FruitMix from '../../images/fruit-mix-1.jpg'
import styles from './sectionAboutUs.module.scss';
import { Element } from "react-scroll";


const SectionAboutUs = () => {
    return (
      <Element className={styles.sectionAboutUs} name='aboutUs'>
        <div className={styles.aboutUsWrapper}>
          <h2 className={styles.aboutUsHeader}>Про нас</h2>
          <p className={styles.aboutUsParagraph}>
            Відверто кажучи, ми маленьке крафтове виробництво корисних
            смаколиків. Любимо усе, що дає нам матінка природа, а ще сильніше
            <span className={styles.aboutUsParagraphItalic}> яблука! </span>
          </p>
          <br />
          <p className={styles.aboutUsParagraph}>
            Ми любимо солодке і спорт, малечу та її батьків, а також мандруємо
            {" "}
            <span className={styles.aboutUsParagraphItalic}>
              і обожнюємо Україну
            </span>
            . Наша продукція зростає і покращується, оскільки все більше людей
            обирають наші натуральні смаколики замість цукерок зі складними
            компонентами.
          </p>
          <br />
          <p className={styles.aboutUsParagraph}>
            Будь сильним, дбай про своє здоров’я, а ми подбаємо про смачну
            пастилу та фріпси.
          </p>
          <br />
        </div>
        <div>
          <img src={FruitMix} alt="fruit mix" width={670} />
        </div>
      </Element>
    );
};

export default SectionAboutUs;
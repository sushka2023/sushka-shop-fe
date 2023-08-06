import styles from './sectionAboutUs.module.scss';

const SectionAboutUs = () => {
    return (
      <section className={styles.sectionAboutUs}>
        <div className={styles.aboutUsWrapper}>
          <h2 className={styles.aboutUsHeader}>Про нас</h2>
          <p className={styles.aboutUsParagraph}>
            Відверто кажучи, ми маленьке крафтове виробництво корисних
            смаколиків. Любимо усе, що дає нам матінка природа, а ще сильніше
            <span className={styles.aboutUsParagraphItalic}> яблука!</span>
          </p>
          <br />
          <p className={styles.aboutUsParagraph}>
            Ми любимо солодке і спорт, малечу та її батьків, а також мандруємо
            <span className={styles.aboutUsParagraphItalic}> і обожнюємо Україну</span>. Наша продукція зростає і покращується, оскільки все більше людей
            обирають наші натуральні смаколики замість цукерок зі складними
            компонентами
          </p>
          <br />
          <p className={styles.aboutUsParagraph}>
            Будь сильним, дбай про своє здоров’я, а ми подбаємо про смачну
            пастилу та фріпси
          </p>
          <br />
        </div>
        <div>
          <img src="/src/images/fruit-mix-1.jpg" alt="" width={670} />
        </div>
      </section>
    );
};

export default SectionAboutUs;
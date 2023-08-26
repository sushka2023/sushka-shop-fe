import { ReactComponent as IconMix } from '../../icons/mix.svg';
import { ReactComponent as IconApple } from "../../icons/apple.svg";
import { ReactComponent as IconBowl } from "../../icons/bowl.svg";
import { ReactComponent as IconBox } from "../../icons/box.svg";
import ApllePic from '../../images/aplle-pic.jpg'
import FruitMixSecond from '../../images/fruit-mix-2.jpg'
import styles from './sectionYourChoice.module.scss'


const SectionYourChoice = () => {
  return (
    <section className={styles.sectionYourChoice} id='aboutProduct'>
      <div className={styles.yourChoiceWrapper}>
        <img src={ApllePic} alt="falling apples" width={555} />
        <div className={styles.yourChoiceWrapperDescription}>
          <h3 className={styles.yourChoiceHeader}>Твій свідомий вибір</h3>
          <div className={styles.paragraphWrapper}>
            <p className={styles.yourChoiceParagraph}>
              Наша продукція містить домішки турботи, які підіймають рівень
              <br />
              <span className={styles.paragraphItalic}>дофамінів</span> в
              організмі!
            </p>
            <p className={styles.yourChoiceParagraph}>
              Все, що приносить користь, поєднано у рулетах пастили <br /> та
              ломтиках фріпсів.
            </p>
            <p className={styles.yourChoiceParagraph}>
              Як юзати ці смаколики знає навіть дитина: жуй, кусай, ламай,
              хрусти, відривай, облизуй та отримуй
              <span className={styles.paragraphItalic}> природню користь </span>
              в результаті.
            </p>
          </div>
        </div>
      </div>
      <ul className={styles.yourChoiceList}>
        <li className={styles.yourChoiceListItem}>
          <IconMix />
          Без цукру та барвників
        </li>
        <li className={styles.yourChoiceListItem}>
          <IconApple />
          100% натурально
        </li>
        <li className={styles.yourChoiceListItem}>
          <IconBowl />
          Якісний продукт
        </li>
        <li className={styles.yourChoiceListItem}>
          <IconBox />
          Дійсно поживно
        </li>
      </ul>
      <div className={styles.yourChoiceLastBlock}>
        <div className={styles.yourChoiceLastBlockWrapper}>
          <p className={styles.yourChoiceLastBlockPararaph}>
            Тут знайдеш близько
            {" "}
            <span className={styles.yourChoiceLastBlockPararaphItalic}>
              30 смаків
            </span>
            {" "}
            пастили, від кислої до солодкої, від класичної до незвичної, з
            горіхами чи без.
          </p>
          <br />
          <p className={styles.yourChoiceLastBlockPararaph}>
            Познайомишся з 20-ма фруктами у вигляді чипсів. Усе перераховане
            висушене при бережних температурах у дегідраторах за всіма ТУ,
            зібране у зручні пакунки та готове радувати кращих людей.
          </p>
          <br />
          <p className={styles.yourChoiceLastBlockPararaph}>
            З нами ти обереш той подарунок рідним, що так довго шукав, дозволиш
            собі смачно поїсти перед тренуванням, дасиш волю своїм смаковим
            фантазіям і обов’язково скажеш:
            {" "}
            <span className={styles.yourChoiceLastBlockPararaphItalic}>
              «Це смачно!»
            </span>
          </p>
        </div>
        <img src={FruitMixSecond} alt="fruit mix" width={555} />
      </div>
    </section>
  );
};

export default SectionYourChoice;
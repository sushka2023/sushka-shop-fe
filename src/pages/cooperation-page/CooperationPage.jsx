import CooperationForm from "../../components/Cooperation-form/CooperationForm";
import { ReactComponent as AcceptIcon } from "../../icons/crmcheckbox.svg";
import styles from "./cooperation.module.scss";

const CooperationPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrappDescription}>
        <h1 className={styles.title}>Співпраця з нами</h1>
        <p className={styles.paragraph}>
          Ми завжди відкриті до нових співпраць та раді, що Ви зацікавилися нами
          та нашою продукцією. Головною метою є створити гідні та вигідні умови
          для всіх сторін.
        </p>
        <p className={styles.paragraph}>Чому співпраця з нами буде успішною?</p>
        <ul className={styles.advantagesList}>
          <li className={styles.advantagesLine}>
            <div className={styles.acceptBall}>
              <AcceptIcon className={styles.iconAccept} />
            </div>
            Якісна та сертифікована продукція
          </li>
          <li className={styles.advantagesLine}>
            <div className={styles.acceptBall}>
              <AcceptIcon className={styles.iconAccept} />
            </div>
            Доступна ціна
          </li>
          <li className={styles.advantagesLine}>
            <div className={styles.acceptBall}>
              <AcceptIcon className={styles.iconAccept} />
            </div>
            Гарантуємо, що ваше замовлення буде вчасно оброблене на зручних
            умовах доставки та оплати
          </li>
          <li className={styles.advantagesLine}>
            <div className={styles.acceptBall}>
              <AcceptIcon className={styles.iconAccept} />
            </div>
            Понад 50 позицій в ассортименті
          </li>
          <li className={styles.advantagesLine}>
            <div className={styles.acceptBall}>
              <AcceptIcon className={styles.iconAccept} />
            </div>
            Продукт, що має довготривалий термін зберігання
          </li>
          <li className={styles.advantagesLine}>
            <div className={styles.acceptBall}>
              <AcceptIcon className={styles.iconAccept} />
            </div>
            Надаємо на час співпраці - стенд та рекламні оголошення (за потреби)
          </li>
        </ul>
        <p className={styles.paragraph}>
          Залишайте заявку і ми зв'яжемося з Вами протягом дня.
        </p>
      </div>
      <CooperationForm />
    </section>
  );
};

export default CooperationPage;

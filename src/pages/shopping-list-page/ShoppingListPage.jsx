import { useNavigate } from "react-router-dom";
import styles from "./ShoppingListPage.module.scss";

const ShoppingListPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.shopWrapper}>
        <div className={styles.shopTitleWrapper}>
          <h2 className={styles.shopTitle}>Ваше замовлення</h2>
          <button
            onClick={() => navigate("/catalog")}
            className={styles.btnBackCatalog}
          >
            Продовжити покупки
          </button>
        </div>

        <div className={styles.shopList_titles}>
          <p>Продукт</p>
          <p>Кількість</p>
          <p>Ціна</p>
        </div>

        {/* <ul></ul> */}
      </div>

      <div className={styles.informationWrapper}></div>
    </div>
  );
};

export default ShoppingListPage;

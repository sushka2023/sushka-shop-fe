import { useNavigate } from "react-router-dom";
import styles from "./ShoppingListPage.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import BasketItem from "./BasketItem";
import BasketEmpty from "./BasketEmpty";

const isAuth = true;
const PRODUCT_ORDERS_LS_KEY = "product-orders";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdG9yZS5zdXNoa2EubW9kQGdtYWlsLmNvbSIsImlhdCI6MTY5OTI4MDA1NCwiZXhwIjoxNzA0NjM2ODU0LCJzY29wZSI6ImFjY2Vzc190b2tlbiJ9.z_KIXuGOq-9irj5FaD8-V_npsKMYG7r6j9BXum1vOtY";

const getBasketItems = async () => {
  const { data } = await axios.get(`api/basket_items/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const removeProduct = async (id) => {
  const data = await axios.delete(`api/basket_items/remove`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      product_id: id,
    },
  });

  return data;
};

const ShoppingListPage = () => {
  const [basketList, setBasketList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [prices, setPrices] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      const fetchBasket = async () => {
        try {
          setIsLoading(true);
          const data = await getBasketItems();
          setBasketList(data);

          console.log("список", data);
        } catch (error) {
          setIsLoading(false);
          console.error("Помилка запиту:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBasket();
    } else {
      const productOrders =
        JSON.parse(localStorage.getItem(PRODUCT_ORDERS_LS_KEY)) || [];

      console.log(productOrders);
    }
  }, []);

  const handlePriceChange = (productId, newPrice) => {
    setPrices((prevPrices) => {
      const updatedPrices = {
        ...prevPrices,
        [productId]: newPrice,
      };

      // Отримуємо масив значень всіх ключів у prices
      const allPricesValues = Object.values(updatedPrices);

      // Сумуємо значення
      const total = allPricesValues.reduce((acc, price) => acc + price, 0);

      // Оновлюємо загальну суму
      setTotalAmount(total);

      console.log("updatedPrices", updatedPrices);
      console.log("Prices", prices);

      return updatedPrices;
    });
  };

  const removeProductFromBacket = async (id, quantity, userPrise) => {
    try {
      const data = await removeProduct(id, quantity, userPrise);
      const updatedBasket = await getBasketItems();
      setBasketList(updatedBasket);
      // Видаляємо вартість продукту із загальної вартості
      setPrices((prevPrices) => {
        const updatedPrices = { ...prevPrices };
        delete updatedPrices[id];
        return updatedPrices;
      });

      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!isLoading ? (
        basketList.length > 0 ? (
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

              <ul className={styles.shopList_descriptions}>
                <li className={styles.shopList_description}>Продукт</li>
                <li className={styles.shopList_description}>Кількість</li>
                <li className={styles.shopList_description}>Ціна</li>
              </ul>

              <ul className={styles.basketList}>
                {basketList?.map(
                  ({ id, product, price_id_by_the_user, quantity }) => (
                    <BasketItem
                      key={product.id}
                      product={product}
                      userPrise={price_id_by_the_user}
                      quantity={quantity}
                      idData={id}
                      removeItem={removeProductFromBacket}
                      updateTotalValue={handlePriceChange}
                    />
                  )
                )}
              </ul>
            </div>

            <div className={styles.informationWrapper}>
              <h3 className={styles.informationTitle}>Інформація</h3>
              <div>
                <p className={styles.informationTotal}>Сума</p>
                <p className={styles.informationNumber}>
                  {totalAmount.toLocaleString()}{" "}
                  <span className={styles.informationSymbol}>&#x20B4;</span>
                </p>
              </div>

              <button className={styles.informationBtn} type="button">
                Оформити замовлення
              </button>
            </div>
          </div>
        ) : (
          <BasketEmpty />
        )
      ) : (
        <p>Завантаження...</p>
      )}
    </>
  );
};

export default ShoppingListPage;

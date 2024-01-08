import styles from "./ShoppingListPage.module.scss";
import { ReactComponent as IconMinus } from "../../icons/minus.svg";
import { ReactComponent as IconPlus } from "../../icons/plus.svg";
import { ReactComponent as IconArrowClose } from "../../icons/closemodal.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { ModalProductLimits } from "../../components/modal-product-limits/ModalProductLimits";
import PropTypes from "prop-types";
import customStyles from "../../components/modal-product-limits/CustomStylesBasket.module.scss";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdG9yZS5zdXNoa2EubW9kQGdtYWlsLmNvbSIsImlhdCI6MTcwNDcwMjY1MiwiZXhwIjoxNzEwMDU5NDUyLCJzY29wZSI6ImFjY2Vzc190b2tlbiJ9.Mw17_D-7jMLiwfhCs9QupbGoPMSIRmemPvhCZnU3MNc";
const isAuth = true;
// const isAuth = false;

const PRODUCT_ORDERS_LS_KEY = "product-orders";

const editProductQuantity = async (id, quantity) => {
  const data = await axios.patch(
    `api/basket_items/quantity`,
    { id, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

const BasketItem = ({
  product,
  userPrise,
  quantity,
  idData,
  removeItem,
  updateTotalValue,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const handleClick = () => setShowModal(false);

  const handlePriceChange = (total) => {
    // Викликаємо зворотний виклик для передачі змін ціни батьківському компоненту
    updateTotalValue(product.id, total);
    // console.log(total);
  };

  const calculateTotalPrice = () => {
    const price = product.prices.find((price) => price.id === userPrise).price;
    const total = price * selectedQuantity;
    setTotalPrice(total);

    handlePriceChange(total);
  };

  useEffect(() => {
    setSelectedQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedQuantity, userPrise, product]);

  const increaseQuantity = async () => {
    if (selectedQuantity === 10) {
      setShowModal(true);
    }

    try {
      setSelectedQuantity((prevQuantity) => prevQuantity + 1);
      calculateTotalPrice();
      if (isAuth) {
        await editProductQuantity(idData, selectedQuantity + 1);
      } else {
        const productOrders =
          JSON.parse(localStorage.getItem(PRODUCT_ORDERS_LS_KEY)) || [];

        const productForId = productOrders.find((item) => item.id === idData);

        productForId.quantity = selectedQuantity + 1;

        localStorage.setItem(
          PRODUCT_ORDERS_LS_KEY,
          JSON.stringify(productOrders)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async () => {
    try {
      setSelectedQuantity((prevQuantity) => prevQuantity - 1);
      calculateTotalPrice();
      if (isAuth) {
        await editProductQuantity(idData, selectedQuantity - 1);
      } else {
        const productOrders =
          JSON.parse(localStorage.getItem(PRODUCT_ORDERS_LS_KEY)) || [];

        const productForId = productOrders.find((item) => item.id === idData);

        productForId.quantity = selectedQuantity - 1;

        localStorage.setItem(
          PRODUCT_ORDERS_LS_KEY,
          JSON.stringify(productOrders)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={styles.basketItem}>
      <div className={styles.basketItem_imgWrapper}>
        <img
          src={product.images[0].image_url}
          alt="Product image"
          className={styles.basketItem_img}
        />
      </div>

      <div className={styles.basketItem_infoWrapper}>
        <p className={styles.basketItem_infoName}>{product.name}</p>
        <p className={styles.basketItem_infoPrice}>
          {product.prices.find((price) => price.id === userPrise)?.weight} г
        </p>
      </div>

      <div>
        <div className={styles.btnQuantityWrapper}>
          <button
            className={styles.btnQuantity}
            onClick={decreaseQuantity}
            disabled={selectedQuantity === 1}
          >
            <IconMinus className={styles.iconPlus} />
          </button>
          <span className={styles.selectQuantity}>{selectedQuantity}</span>
          <button
            className={styles.btnQuantity}
            onClick={increaseQuantity}
            disabled={selectedQuantity === 100}
          >
            <IconPlus className={styles.iconPlus} />
          </button>

          {showModal && (
            <ModalProductLimits
              onClick={handleClick}
              customStyles={customStyles}
            />
          )}
        </div>
      </div>

      <p className={styles.basketItem_infoName}>
        {totalPrice.toLocaleString()}{" "}
        <span className={styles.basketItem_infoSymbol}>&#x20B4;</span>
      </p>

      <button
        onClick={() => removeItem(product.id)}
        type="button"
        className={styles.btnCloseModal}
      >
        <IconArrowClose className={styles.iconDeleteItem} />
      </button>
    </li>
  );
};

BasketItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image_url: PropTypes.string.isRequired,
      })
    ).isRequired,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        weight: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  userPrise: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  idData: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
  updateTotalValue: PropTypes.func.isRequired,
};

export default BasketItem;

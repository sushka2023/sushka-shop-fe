import styles from "./ShoppingListPage.module.scss";
import { ReactComponent as IconMinus } from "../../icons/minus.svg";
import { ReactComponent as IconPlus } from "../../icons/plus.svg";
import { ReactComponent as IconArrowClose } from "../../icons/closemodal.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { ModalProductLimits } from "../../components/modal-product-limits/ModalProductLimits";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdG9yZS5zdXNoa2EubW9kQGdtYWlsLmNvbSIsImlhdCI6MTY5OTI4MDA1NCwiZXhwIjoxNzA0NjM2ODU0LCJzY29wZSI6ImFjY2Vzc190b2tlbiJ9.z_KIXuGOq-9irj5FaD8-V_npsKMYG7r6j9BXum1vOtY";

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
      await editProductQuantity(idData, selectedQuantity + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async () => {
    try {
      setSelectedQuantity((prevQuantity) => prevQuantity - 1);
      calculateTotalPrice();
      await editProductQuantity(idData, selectedQuantity - 1);
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

          {showModal && <ModalProductLimits onClick={handleClick} />}
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

export default BasketItem;

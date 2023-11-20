import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { ReactComponent as IconMinus } from "../../icons/minus.svg";
import { ReactComponent as IconPlus } from "../../icons/plus.svg";
import { ReactComponent as IconHeart } from "../../icons/favorite.svg";
import { ReactComponent as IconArrowleft } from "../../icons/arrowleft.svg";
import { ReactComponent as IconArrowRight } from "../../icons/arrowright.svg";
import axios from "axios";

const getProductForId = async (productId) => {
  const { data } = await axios.get(`api/product/${productId}`);
  return data;
};

const ProductPage = () => {
  const [products, setProducts] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [quantity, setQuantity] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductForId(productId);
        setProducts(data);
        if (data.prices.length > 0) {
          setSelectedWeight(data.prices[0].weight);
          setSelectedPrice(data.prices[0].price);
          setQuantity(data.prices[0].quantity);
        }

        console.log(data);
      } catch (error) {
        console.error("Помилка запиту:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  //   Обробник події, який викликається при зміні ваги
  const handleWeightChange = (event) => {
    const selectedWeightValue = event.target.value;

    // Знайти відповідну ціну та кількість для обраної ваги
    const selectedPriceData = products?.prices?.find(
      (price) => price.weight === selectedWeightValue
    );

    setSelectedWeight(selectedWeightValue);
    setSelectedPrice(selectedPriceData.price);
    setQuantity(selectedPriceData.quantity);
    setSelectedQuantity(1);
  };

  const increaseQuantity = () => {
    const selectedPriceData = products?.prices?.find(
      (price) => price.weight === selectedWeight
    );
    setSelectedQuantity((prevQuantity) => prevQuantity + 1);
    setSelectedPrice((prevPrice) => prevPrice + selectedPriceData.price);
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      const selectedPriceData = products?.prices?.find(
        (price) => price.weight === selectedWeight
      );
      setSelectedQuantity((prevQuantity) => prevQuantity - 1);
      setSelectedPrice((prevPrice) => prevPrice - selectedPriceData.price);
    }
  };

  const PRODUCT_ORDERS_LS_KEY = "product-orders";

  const handleBuyButtonClick = () => {
    const orderInfo = {
      productId: products.product.id,
      productName: products.product.name,
      quantity: selectedQuantity,
      price: selectedPrice,
      weight: selectedWeight,
      img: products.images[selectedImage].image_url,
    };

    const productOrders =
      JSON.parse(localStorage.getItem(PRODUCT_ORDERS_LS_KEY)) || [];

    productOrders.push(orderInfo);

    localStorage.setItem(PRODUCT_ORDERS_LS_KEY, JSON.stringify(productOrders));

    console.log(orderInfo);
    alert("Товар додано в кошик!");
  };

  const showNextImage = () => {
    if (selectedImage < products.images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const showPreviousImage = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {products ? (
          <div>
            <div className={styles.productWrapper}>
              <div>
                <div className={styles.imageWrapper}>
                  <img
                    className={styles.imageProduct}
                    src={products.images[selectedImage].image_url}
                    alt={products.images.description}
                  />

                  <button
                    className={`${styles.btnImageChange} ${styles.btnImageChangeLeft}`}
                    onClick={showPreviousImage}
                  >
                    <IconArrowleft className={styles.iconArrow} />
                  </button>
                  <button
                    className={`${styles.btnImageChange} ${styles.btnImageChangeRight}`}
                    type="button"
                    onClick={showNextImage}
                  >
                    <IconArrowRight className={styles.iconArrow} />
                  </button>
                </div>
                <ul className={styles.imageList}>
                  {products.images.map((image, index) => (
                    <li
                      className={styles.imageListItem}
                      key={image.id}
                      onClick={() => {
                        setSelectedImage(index);
                      }}
                    >
                      <img
                        className={styles.imageProduct}
                        src={image.image_url}
                        alt={image.description}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.ordertWrapper}>
                <h2 className={styles.titleProduct}>
                  Структурна йогуртова пастила з малиною, бананом та вівсянкою
                </h2>
                <p className={styles.orderWeight}>Оберіть вагу упаковки:</p>
                <form className={styles.orderForm}>
                  {products.prices.map((price) => (
                    <div key={price.id}>
                      <label
                        className={`${styles.labelWeight} ${
                          selectedWeight === price.weight ? styles.checked : ""
                        }`}
                      >
                        <input
                          className={styles.inputWeight}
                          type="radio"
                          name="weight"
                          value={price.weight}
                          checked={selectedWeight === price.weight}
                          onChange={handleWeightChange}
                        />
                        {price.weight}
                      </label>
                    </div>
                  ))}
                </form>
                <div>
                  <p className={styles.orderWeight}>Оберіть кількість:</p>
                  <div className={styles.btnQuantityWrapper}>
                    <button
                      className={styles.btnQuantity}
                      onClick={decreaseQuantity}
                      disabled={selectedQuantity === 1}
                    >
                      <IconMinus className={styles.iconPlus} />
                    </button>
                    <span className={styles.selectQuantity}>
                      {selectedQuantity}
                    </span>
                    <button
                      className={styles.btnQuantity}
                      onClick={increaseQuantity}
                      disabled={quantity === selectedQuantity}
                    >
                      <IconPlus className={styles.iconPlus} />
                    </button>
                  </div>
                </div>
                {selectedWeight && (
                  <div>
                    <p className={styles.selectPrice}>{selectedPrice} грн</p>
                  </div>
                )}
                <div className={styles.btnByWrapper}>
                  <button
                    type="button"
                    className={styles.btnBy}
                    onClick={handleBuyButtonClick}
                  >
                    Купити
                  </button>
                  <button type="button" className={styles.btnFavorite}>
                    <IconHeart className={styles.iconHeart} />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className={styles.descriptionTitle}>Опис товару</p>
              <p className={styles.descriptionProduct}>
                {products.product.description}
              </p>
            </div>
          </div>
        ) : (
          <p>Завантаження...</p>
        )}
      </div>
    </>
  );
};

export default ProductPage;

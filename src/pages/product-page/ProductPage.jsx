import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { ReactComponent as IconMinus } from "../../icons/minus.svg";
import { ReactComponent as IconPlus } from "../../icons/plus.svg";
import { ReactComponent as IconHeart } from "../../icons/favorite.svg";
import { ReactComponent as IconArrowleft } from "../../icons/arrowleft.svg";
import { ReactComponent as IconArrowRight } from "../../icons/arrowright.svg";
import axios from "axios";
import { ModalProductLimits } from "../../components/modal-product-limits/ModalProductLimits";

const isAuth = true;
const PRODUCT_ORDERS_LS_KEY = "product-orders";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdG9yZS5zdXNoa2EubW9kQGdtYWlsLmNvbSIsImlhdCI6MTY5OTI4MDA1NCwiZXhwIjoxNzA0NjM2ODU0LCJzY29wZSI6ImFjY2Vzc190b2tlbiJ9.z_KIXuGOq-9irj5FaD8-V_npsKMYG7r6j9BXum1vOtY";

const getProductForId = async (productId) => {
  const { data } = await axios.get(`api/product/${productId}`);
  return data;
};

const addProductToBasket = async (
  productId,
  selectedQuantity,
  selectedPriceId
) => {
  const response = await axios.post(
    `api/basket_items/add`,

    {
      product_id: productId,
      quantity: selectedQuantity,
      price_id_by_the_user: selectedPriceId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

const ProductPage = () => {
  const [products, setProducts] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedPriceId, setSelectedPriceId] = useState(0);
  const [selectedOldPrice, setselectedOldPrice] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const handleClick = () => setShowModal(false);

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductForId(productId);
        setProducts(data);

        console.log(data);
        if (data.prices.length > 0) {
          setSelectedWeight(data.prices[0].weight);
          setSelectedPrice(data.prices[0].price);
          setSelectedPriceId(data.prices[0].id);
          setselectedOldPrice(data.prices[0].old_price);
        }
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
    setSelectedPriceId(selectedPriceData.id);
    setselectedOldPrice(selectedPriceData.old_price);
    setSelectedQuantity(1);
  };

  const increaseQuantity = () => {
    if (selectedQuantity === 10) {
      setShowModal(true);
    }

    const selectedPriceData = products?.prices?.find(
      (price) => price.weight === selectedWeight
    );
    setSelectedQuantity((prevQuantity) => prevQuantity + 1);
    setSelectedPrice((prevPrice) => prevPrice + selectedPriceData.price);
    setselectedOldPrice(
      (prevOldPrice) => prevOldPrice + selectedPriceData.old_price
    );
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      const selectedPriceData = products?.prices?.find(
        (price) => price.weight === selectedWeight
      );
      setSelectedQuantity((prevQuantity) => prevQuantity - 1);
      setSelectedPrice((prevPrice) => prevPrice - selectedPriceData.price);
      setselectedOldPrice(
        (prevOldPrice) => prevOldPrice - selectedPriceData.old_price
      );
    }
  };

  const handleBuyButtonClick = async () => {
    console.log(selectedQuantity);
    console.log(productId);
    console.log(selectedPriceId);

    try {
      if (isAuth) {
        await addProductToBasket(productId, selectedQuantity, selectedPriceId);

        alert("Товар добавлено в кошик!");
      } else {
        const orderInfo = {
          id: products.id,
          price_id_by_the_user: selectedPriceId,
          // product: {
          //   id: products.id,
          //   images: [
          //       {
          //       products.images.find((image) => image.main_image === true)
          //         ?.image_url || products.images[selectedImage].image_url,
          //     },
          //   ],
          // },
          name: products.name,
          quantity: selectedQuantity,

          // productId: products.id,
          // productName: products.name,

          price: selectedPrice,
          // weight: selectedWeight,
          // img: products.images[selectedImage].image_url,
        };

        const productOrders =
          JSON.parse(localStorage.getItem(PRODUCT_ORDERS_LS_KEY)) || [];

        productOrders.push(orderInfo);

        localStorage.setItem(
          PRODUCT_ORDERS_LS_KEY,
          JSON.stringify(productOrders)
        );

        console.log(orderInfo);
        alert("Товар додано в кошик!");
      }
    } catch (error) {
      console.error("Помилка при додаванні товару до кошика:", error);
      throw error;
    }
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
                <h2 className={styles.titleProduct}>{products.name}</h2>

                <ul className={styles.sub_categories_list}>
                  {products.sub_categories?.map((sub_category) => (
                    <li
                      key={sub_category.id}
                      className={styles.sub_categories_item}
                    >
                      {sub_category.name}
                    </li>
                  ))}
                </ul>

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
                        {price.weight} г
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
                      disabled={selectedQuantity === 100}
                    >
                      <IconPlus className={styles.iconPlus} />
                    </button>

                    {showModal && <ModalProductLimits onClick={handleClick} />}
                  </div>
                </div>

                {selectedWeight && (
                  <div className={styles.selectPriceWrapper}>
                    {products?.promotional && (
                      <p className={styles.selectOldPrice}>
                        {selectedOldPrice} ₴
                      </p>
                    )}

                    <p className={styles.selectPrice}>{selectedPrice} ₴</p>
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
                {products.description}
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

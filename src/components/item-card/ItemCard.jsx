import styles from './itemCard.module.scss';
import { ReactComponent as IconFavorite } from "../../icons/favorite.svg";
import { ReactComponent as IconFavoriteIsActive } from '../../icons/favoriteactive.svg';
import ShopItem from "../../images/shop-item.jpg";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../../Redax/Products/slices/items-slice';

const ItemCard = ({ item, isFavorite }) => {

   const [selectedWeight, setSelectedWeight] = useState(null);
   const [selectedPrice, setSelectedPrice] = useState(null);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (item) {
      setSelectedWeight(item.prices[0].weight);
      setSelectedPrice(item.prices[0].price);
    }
  }, [item])

  const shortDescription =
    item.description.length > 60
      ? `${item.description.substring(0, 60)}...`
      : item.description;

  const handleClickFavorite = (e) => {
    e.preventDefault();
    dispatch(toggleFavorite(item));
  }

  const handleWeightClick = (e, weight, price) => {
     e.preventDefault();
     setSelectedWeight(weight);
     setSelectedPrice(price);
   };

  return (
    <li>
      <div className={styles.slideElement}>
        <div className={styles.cardContent}>
          <Link to={`/catalog/${item.product_category_id}/${item.id}/details`}>
            <div className={styles.slideImage}>
              <img src={ShopItem} alt="mandarin pastille" />
              {!isFavorite ? (
                <IconFavorite
                  className={styles.cardFavorite}
                  onClick={handleClickFavorite}
                />
              ) : (
                <IconFavoriteIsActive
                  className={styles.cardFavorite}
                  onClick={handleClickFavorite}
                />
              )}
            </div>
            <div className={styles.cardTitle}>
              <h3 className={styles.cardHeader}>{item.name}</h3>
              <p className={styles.cardPararaph}>{shortDescription}</p>
              <ul className={styles.listWeight}>
                {item.prices.map((price) => (
                  <li className={styles.weightElement} key={price.id}>
                    <button
                      className={`${styles.weightElementButton} ${
                        selectedWeight === price.weight
                          ? styles.activeWeightElementButton
                          : ""
                      }`}
                      onClick={(e) =>
                        handleWeightClick(e, price.weight, price.price)
                      }
                    >
                      {price.weight}
                    </button>
                  </li>
                ))}
              </ul>
              <span className={styles.cardPrice}>{selectedPrice} грн</span>
            </div>
          </Link>
        </div>
        <button className={styles.cardButtom}>Купити</button>
      </div>
    </li>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

export default ItemCard
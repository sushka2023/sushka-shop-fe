import styles from './itemCard.module.scss';
import { ReactComponent as IconFavorite } from "../../icons/favorite.svg";
import { ReactComponent as IconFavoriteIsActive } from '../../icons/favoriteactive.svg';
import ShopItem from "../../images/shop-item.jpg";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { addToFavorite } from "../../Redax/Products/slices/favoriteSlice";
import { useState } from 'react';

const ItemCard = ({ item }) => {

  const [isFavorite, setIsFavorite] = useState(false);
  
  const dispatch = useDispatch();

  const handleClickFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(addToFavorite(item));
  }

  return (
    <li>
      <div className={styles.slideElement}>
        <div className={styles.cardContent}>
          <div className={styles.slideImage}>
            <img src={ShopItem} alt="mandarin pastille" />
            {isFavorite ? (
              <IconFavorite
                className={styles.cardFavorite}
                onClick={handleClickFavorite}
              />
            ) : (
              <IconFavoriteIsActive
                className={styles.cardFavorite}
                onClick={handleClickFavorite} />
            )}
          </div>
          <div className={styles.cardTitle}>
            <h3 className={styles.cardHeader}>{item.product.name}</h3>
            <p className={styles.cardPararaph}>{item.product.description}</p>
            <span className={styles.cardPrice}>
              {item.prices[0].price} грн / {item.prices[0].weight} гр.
            </span>
          </div>
        </div>
        <button className={styles.cardButtom}>Додати в кошик</button>
      </div>
    </li>
  );
};

ItemCard.propTypes = {
    item: PropTypes.object.isRequired
};

export default ItemCard
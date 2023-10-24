import styles from './itemCard.module.scss';
import { ReactComponent as IconFavorite } from "../../icons/favorite.svg";
import { ReactComponent as IconFavoriteIsActive } from '../../icons/favoriteactive.svg';
import ShopItem from "../../images/shop-item.jpg";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../../Redax/Products/slices/items-slice';

const ItemCard = ({ item, isFavorite }) => {
  
  const dispatch = useDispatch();

  const handleClickFavorite = (e) => {
    e.preventDefault();
    dispatch(toggleFavorite(item));
  }

  return (
    <li>
      <div className={styles.slideElement}>
        <div className={styles.cardContent}>
          <Link to={`/catalog/${item.product.product_category_id}/${item.product.id}/details`}>
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
              <h3 className={styles.cardHeader}>{item.product.name}</h3>
              <p className={styles.cardPararaph}>{item.product.description}</p>
              <span className={styles.cardPrice}>
                {item.prices[0].price} грн / {item.prices[0].weight} гр.
              </span>
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
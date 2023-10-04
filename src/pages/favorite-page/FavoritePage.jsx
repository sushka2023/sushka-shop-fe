import { ReactComponent as IconAddNewItem } from "../../icons/add.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavoriteItem } from "../../Redax/Products/selectors/Selectors";
import styles from "./favoritePage.module.scss";
import ItemCard from "../../components/item-card/ItemCard";

const FavoritePage = () => {
  const favoriteItem = useSelector(selectFavoriteItem);

    return (
      <section className={styles.favoriteBg}>
        <div className={styles.favoriteBorder}></div>
        <div className={styles.container}>
          <h2 className={styles.title}>Улюблене</h2>
          <ul className={styles.list}>
            {favoriteItem.map((item, index) => (
              <>
                <ItemCard key={index} item={item} />
              </>
            ))}
            <li className={styles.addNewItem}>
              <Link className={styles.link} to="/catalog">
                <IconAddNewItem className={styles.addNewItemIcon} />
                <p className={styles.addNewItemText}>
                  Додати товар до улюбленого
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    );
};

export default FavoritePage;

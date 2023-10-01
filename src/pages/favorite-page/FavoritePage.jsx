import { ReactComponent as IconAddNewItem } from "../../icons/add.svg";
import { Link } from "react-router-dom";
import styles from "./favoritePage.module.scss";

const FavoritePage = () => {
    return (
        <section className={styles.favoriteBg}>
            <div className={styles.favoriteBorder}></div>
            <div className={styles.container}>
                <h2 className={styles.title}>Улюблене</h2>
                <ul className={styles.list}>
                    <li className={styles.addNewItem}>
                        <Link className={styles.link} to='/catalog'>
                            <IconAddNewItem className={styles.addNewItemIcon} />
                            <p className={styles.addNewItemText}>Додати товар до улюбленого</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default FavoritePage;

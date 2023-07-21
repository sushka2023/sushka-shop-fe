import { ReactComponent as IconSearch } from '../../../../icons/search.svg';
import { ReactComponent as IconAccount } from '../../../../icons/account.svg';
import { ReactComponent as IconFavorite } from '../../../../icons/favorite.svg';
import { ReactComponent as IconCart } from '../../../../icons/cart.svg';
import styles from '../_header.module.scss'; 

const HeaderListIcons = () => {
  return (
    <ul className={styles["list-icons"]}>
      <li className={styles["list-icons__line"]}>
        <IconSearch className={styles["icons-nav__search"]} />
      </li>
      <li className={styles["list-icons__line"]}>
        <IconAccount className={styles["icons-nav"]} />
      </li>
      <li className={styles["list-icons__line"]}>
        <IconFavorite className={styles["icons-nav"]} />
      </li>
      <li className={styles["list-icons__line"]}>
        <IconCart className={styles["icons-nav"]} />
      </li>
    </ul>
  );
};

export default HeaderListIcons;

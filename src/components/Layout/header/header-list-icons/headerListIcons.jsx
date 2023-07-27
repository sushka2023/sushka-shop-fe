import { ReactComponent as IconSearch } from '../../../../icons/search.svg';
import { ReactComponent as IconAccount } from '../../../../icons/account.svg';
import { ReactComponent as IconFavorite } from '../../../../icons/favorite.svg';
import { ReactComponent as IconCart } from '../../../../icons/cart.svg';
import styles from '../Header.module.scss'; 

const HeaderListIcons = () => {
  return (
    <ul className={styles.listIcons}>
      <li className={styles.listIconsLine}>
        <IconSearch className={styles.iconsNavSearch} />
      </li>
      <li className={styles.listIconsLine}>
        <IconAccount className={styles.iconsNav} />
      </li>
      <li className={styles.listIconsLine}>
        <IconFavorite className={styles.iconsNav} />
      </li>
      <li className={styles.listIconsLine}>
        <IconCart className={styles.iconsNav} />
      </li>
    </ul>
  );
};

export default HeaderListIcons;

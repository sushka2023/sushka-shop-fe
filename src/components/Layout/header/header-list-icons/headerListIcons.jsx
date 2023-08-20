import { useEffect, useRef, useState } from "react";
import { ReactComponent as IconSearch } from "../../../../icons/search.svg";
import { ReactComponent as IconAccount } from "../../../../icons/account.svg";
import { ReactComponent as IconFavorite } from "../../../../icons/favorite.svg";
import { ReactComponent as IconCart } from "../../../../icons/cart.svg";
import styles from "../Header.module.scss";

const HeaderListIcons = () => {
  const [isActive, setIsActive] = useState(false);
  const iconRef = useRef();
  const inputRef = useRef();

  useEffect(() => {

    const handleClick = (e) => {
      if (iconRef.current.contains(e.target)) {
        setIsActive(true);
        inputRef.current.focus();
      }

      if (!iconRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
    
  return (
    <ul className={styles.listIcons}>
      <li className={styles.listIconsLineContainer}>
        <div
          ref={iconRef}
          id="search"
          className={
            isActive ? styles.searchContainerIsActive : styles.searchContainer
          }
        >
          <input
            ref={inputRef}
            type="search"
            placeholder="Пошук"
            className={
              isActive
                ? ` ${styles.searchInputIsActive}`
                : `${styles.searchInput}`
            }
          />
          <IconSearch
            id="iconSearch"
            className={
              isActive ? styles.iconsNavSearchIsActive : styles.iconsNavSearch
            }
          />
        </div>
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

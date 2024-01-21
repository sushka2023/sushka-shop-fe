import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../../Redax/Auth/slices/auth-slice";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as IconSearch } from "../../../../icons/search.svg";
import { ReactComponent as IconAccount } from "../../../../icons/account.svg";
import { ReactComponent as IconFavorite } from "../../../../icons/favorite.svg";
import { ReactComponent as IconCart } from "../../../../icons/cart.svg";
import styles from "../Header.module.scss";
import { selectIsLogedIn } from "../../../../Redax/Auth/selectors/Selectors";

const HeaderListIcons = () => {
  const [isActive, setIsActive] = useState(false);
  const iconRef = useRef();
  const inputRef = useRef();
  const isLogedIn = useSelector(selectIsLogedIn);
  const dispatch = useDispatch();

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
        {isLogedIn ? (
          <Link to="account">
            <IconAccount className={styles.iconsNav} />
          </Link>
        ) : (
          <IconAccount
            className={styles.iconsNav}
            onClick={() => dispatch(toggleModal(true))}
          />
        )}
      </li>
      <li className={styles.listIconsLine}>
        <Link to="favorite">
          <IconFavorite className={styles.iconsNav} />
        </Link>
      </li>
      <li className={styles.listIconsLine}>
        <Link to="cart">
          <IconCart className={styles.iconsNav} />
        </Link>
      </li>
    </ul>
  );
};

export default HeaderListIcons;

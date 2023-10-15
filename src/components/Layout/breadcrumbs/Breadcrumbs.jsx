import { useLocation, Link } from "react-router-dom";
import { ReactComponent as IconArrow } from "../../../icons/arrow.svg";
import styles from "./breadcrumbs.module.scss";

const getUkrainianName = (name) => {
  const ukrainianNames = {
    catalog: "Каталог",
    favorite: "Улюблене",
    cart: "Кошик",
    conditions: "Співпраця",
    policy: "Політика конфіденційності",
    account: "Особистий кабінет",
  };
  return ukrainianNames[name];
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter(
      (location) => location && isNaN(location) && getUkrainianName(location)
    );

  return (
    <div className={styles.breadBlock}>
      <ul className={styles.breadList}>
        <li className={styles.breadLine}>
          <Link
            className={styles.breadLink}
            to={"/"}
          >
            Головна
          </Link>
          <IconArrow className={styles.IconArrow} />
        </li>
        {pathnames.map((item) => (
          <li className={styles.breadLine} key={item}>
            <Link
              className={`${styles.breadLink} ${
                location.pathname.includes(item) ? styles.currentPath : ""
              }`}
              to={`/${item}`}
            >
              {getUkrainianName(item)}
            </Link>
            <IconArrow className={styles.IconArrow} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;

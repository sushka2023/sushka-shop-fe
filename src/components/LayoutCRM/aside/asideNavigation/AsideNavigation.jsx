import { NavLink } from "react-router-dom";
import { ReactComponent as IconStatistics } from "../../../../icons/statistics.svg";
import { ReactComponent as IconOrders } from "../../../../icons/orders.svg";
import { ReactComponent as IconProducts } from "../../../../icons/products.svg";
import { ReactComponent as IconClients } from "../../../../icons/clients.svg";
import styles from "../AsideCRM.module.scss";

const AsideNavigation = () => {
  return (
    <nav>
      <ul className={styles.asideList}>
        <li>
          <NavLink
            to="dashbord"
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles.navigationLink}`
                : styles.navigationLink
            }
          >
            <IconStatistics className={styles.navigationIcon} />
            <span className={styles.asideCategory}>Статистика</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles.navigationLink}`
                : styles.navigationLink
            }
          >
            <IconOrders className={styles.navigationIcon} />
            <span className={styles.asideCategory}>Замовлення</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="products"
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles.navigationLink}`
                : styles.navigationLink
            }
          >
            <IconProducts className={styles.navigationIcon} />
            <span className={styles.asideCategory}>Товари</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="clients"
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles.navigationLink}`
                : styles.navigationLink
            }
          >
            <IconClients className={styles.navigationIcon} />
            <span className={styles.asideCategory}>Клієнти</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AsideNavigation;

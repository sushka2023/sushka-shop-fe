import styles from "./AsideCRM.module.scss";
import AsideNavigation from "./asideNavigation/AsideNavigation";

const AsideCRM = () => {
  return (
    <aside>
      <h2 className={styles.asideTitle}>CRM</h2>
      <AsideNavigation />
    </aside>
  );
};

export default AsideCRM;

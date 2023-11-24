import ManageCategories from "../../components/sectionCrm-edit-category/ManageCategories";
import styles from "./CrmSettingsPage.module.scss";

const CrmSettingsPage = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Налаштування</h3>
      <div className={styles.createCategoryContainer}>
        <ManageCategories type="product_category" />
        <ManageCategories type="product_sub_category" />
      </div>
    </div>
  );
};

export default CrmSettingsPage;

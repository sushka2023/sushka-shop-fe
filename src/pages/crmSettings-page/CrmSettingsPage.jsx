import EditCategory from "../../components/sectionCrm-edit-category/EditCategory";
import EditSubCategory from "../../components/sectionCrm-edit-category/EditSubCategory";

import styles from "./CrmSettingsPage.module.scss";

const CrmSettingsPage = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Налаштування</h3>
      <div className={styles.createCategoryContainer}>
        <EditCategory />
        <EditSubCategory />
      </div>
    </div>
  );
};

export default CrmSettingsPage;

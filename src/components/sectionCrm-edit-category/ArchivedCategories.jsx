import styles from "./EditCategory.module.scss";
import PropTypes from "prop-types";
import { ReactComponent as IconPlus } from "../../icons/plus1.svg";

const ArchivedCategoriesList = ({
  archivedCategories,
  unarchiveCrmCategory,
  categories,
}) => {
  return (
    <>
      <ul className={styles.categoryList}>
        {archivedCategories?.map((category) => (
          <li key={category.id}>
            <div className={styles.category}>
              <div className={styles.textWrapper}>
                <span className={styles.categoryText}>{category.name}</span>
              </div>

              <button
                className={styles.btnUnarchive}
                onClick={() => unarchiveCrmCategory(category.id)}
                disabled={categories.length >= 5}
              >
                <IconPlus
                  className={
                    categories.length >= 5
                      ? styles.iconPlusDisable
                      : styles.iconPlus
                  }
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ArchivedCategoriesList;

ArchivedCategoriesList.propTypes = {
  archivedCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  unarchiveCrmCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

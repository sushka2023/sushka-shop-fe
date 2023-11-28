import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as ArowIcon } from "../../icons/arrow.svg";
import { ReactComponent as PlusIcon } from "../../icons/plus1.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete.svg";
import { v4 as uuidv4 } from 'uuid';
import { addData } from "../../Redax/Crm-add-new-product/slices/product-slice";
import styles from "./crmCategories.module.scss";
import PropTypes from "prop-types";

const CrmCategories = ({ categories, type }) => {
  const [selectedCategories, setSelectedCategories] = useState({});
  const [isOpen, setIsOpen] = useState({});
  const [categoriesList, setCategoriesList] = useState([0]);
  const dispatch = useDispatch();

  useEffect(() => {
    const valuesSelectedCategories = Object.values(selectedCategories);
    
    const categoriesId = categories && categories.map((category) => {
      const index = valuesSelectedCategories.findIndex((value) => value === category.name);
      return index !== -1 ? category.id : null;
    });

    dispatch(addData({type, value: categoriesId }));  
  }, [categories, dispatch, selectedCategories, type])

  useEffect(() => {
    if (categories) {
      setSelectedCategories({ [0]: categories[0].name });
    }
  }, [categories]);

  const toggleDropdown = (categoriesLine) => {
    setIsOpen({ ...isOpen, [categoriesLine]: !isOpen[categoriesLine] });
  };

  const handleChange = (categoriesLine) => (e) => {
    setSelectedCategories({
      ...selectedCategories,
      [categoriesLine]: e.target.value,
    });
    setIsOpen({ ...isOpen, [categoriesLine]: false });
  };

  const handleClickNewCategoryLine = () => {
    const newId = uuidv4();
    setCategoriesList([...categoriesList, newId]);
    setSelectedCategories({
      ...selectedCategories,
      [newId]: categories[0].name,
    });
  };

  const handleClickDelete = (e, categoriesLine) => {
    setCategoriesList(categoriesList.filter((el) => el !== categoriesLine));
    const newSelectedCategories = { ...selectedCategories };
    delete newSelectedCategories[categoriesLine];
    setSelectedCategories(newSelectedCategories);
    const newIsOpen = { ...isOpen };
    delete newIsOpen[categoriesLine];
    setIsOpen(newIsOpen);
  };

  return (
    <div className={styles.categoriesWrapper}>
      {type === "sub_categories" && (
        <div
          className={`${styles.iconWrapp} ${
            categoriesList.length === 5 ? styles.iconWrappDisabled : ""
          }`}
        >
          <PlusIcon
            className={`${styles.iconPlus} ${
              categoriesList.length === 5 ? styles.iconPlusDisabled : ""
            }`}
            onClick={handleClickNewCategoryLine}
          />
        </div>
      )}
      <div>
        <p
          className={`${styles.categoriesParagraph} ${
            type === "sub" && categoriesList.length === 0
              ? styles.categoriesParagraphEmpty
              : ""
          }
          ${type === "main_category" ? styles.mainCategoryLine : ""}`}
        >
          {type === "main_category"
            ? "Категорія товару*"
            : "Саб-категорія товару"}
        </p>
        <ul className={styles.categoriesListWrapp}>
          {categoriesList.map((categoriesLine) => (
            <li
              className={`${styles.categoryLine} ${
                type === "main_category" ? styles.mainCategoryLine : ""
              }`}
              key={categoriesLine}
            >
              {(type === "sub_categories" ||
                (type === "main_category" && categoriesList.length > 1)) && (
                <DeleteIcon
                  className={styles.iconDel}
                  onClick={(e) => handleClickDelete(e, categoriesLine)}
                />
              )}
              <button
                className={styles.categoriesBtn}
                type="button"
                onClick={() => toggleDropdown(categoriesLine)}
              >
                {selectedCategories[categoriesLine]}
                <ArowIcon className={styles.iconArrow} />
              </button>
              {isOpen[categoriesLine] && (
                <ul className={styles.categoriesList}>
                  {categories.map((category) => (
                    <li className={styles.categoriesListLine} key={category.id}>
                      <input
                        type="radio"
                        id={`${category.name}-${categoriesLine}`}
                        name={category.id}
                        value={category.name}
                        className={styles.categoryInput}
                        onChange={handleChange(categoriesLine)}
                        checked={
                          selectedCategories[categoriesLine] === category.name
                        }
                      />
                      <label
                        htmlFor={`${category.name}-${categoriesLine}`}
                        className={`${styles.categoryLabel} ${
                          selectedCategories[categoriesLine] === category.name
                            ? styles.categoryLabelActive
                            : ""
                        }`}
                      >
                        {category.name}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

CrmCategories.propTypes = {
  categories: PropTypes.array,
  type: PropTypes.string
};

export default CrmCategories;

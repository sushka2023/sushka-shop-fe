import { useEffect, useState } from "react";
import styles from "./EditCategory.module.scss";
import axios from "axios";
import CategoriesList from "./CategoriesList";
import ArchivedCategoriesList from "./ArchivedCategories";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import PropTypes from "prop-types";
import FormAddCategory from "./FormAddCategory";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdG9yZS5zdXNoa2EubW9kQGdtYWlsLmNvbSIsImlhdCI6MTY5OTI4MDA1NCwiZXhwIjoxNzA0NjM2ODU0LCJzY29wZSI6ImFjY2Vzc190b2tlbiJ9.z_KIXuGOq-9irj5FaD8-V_npsKMYG7r6j9BXum1vOtY";

const ManageCategories = ({ type }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(null);
  const [categories, setCategories] = useState([]);
  const [archivedCategories, setArchivedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState({ id: null, name: "" });

  // get categories

  useEffect(() => {
    const fetchCrmCategories = async () => {
      try {
        const { data } = await axios.get(`api/${type}/all_for_crm`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredData = data.filter((item) => !item.is_deleted);
        const filteredArchivedData = data.filter((item) => item.is_deleted);

        setCategories(filteredData);
        setArchivedCategories(filteredArchivedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCrmCategories();
  }, [type]);

  // create category

  const isCategoryExists = async (categoryList, categoryName) => {
    return categoryList.find(
      (category) =>
        category.name.trim().toLowerCase() === categoryName.trim().toLowerCase()
    );
  };

  const createCrmCategory = async () => {
    if (newCategory.trim() === "" || newCategory.trim().length < 3) {
      Notify.warning(
        "Для створення категорії ведіть текстове значення  (мін. кількість символів: 3)"
      );
      return;
    }

    try {
      const categoryExistsInMain = await isCategoryExists(
        categories,
        newCategory
      );

      const categoryExistsInArchived = await isCategoryExists(
        archivedCategories,
        newCategory
      );

      if (categoryExistsInMain || categoryExistsInArchived) {
        Notify.failure(`Категорія <${newCategory}> вже існує у вашому списку!`);
        return;
      } else {
        const { data } = await axios.post(
          `api/${type}/create`,
          {
            name: newCategory.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCategories([...categories, data]);
        setNewCategory("");

        Notify.success(`Категорія <${newCategory}> додана успішно`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    createCrmCategory();
  };

  // delete category

  const deleteCrmCategory = async (categoryId) => {
    try {
      const { data } = await axios.put(
        `api/${type}/archive`,
        {
          id: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCategories = categories.filter(
        (category) => category.id !== categoryId
      );

      setArchivedCategories((prevArchivedCategories) => [
        ...prevArchivedCategories,
        data,
      ]);
      setCategories(updatedCategories);
      Notify.success(`Категорію архівовано`);
    } catch (error) {
      console.error(error);
    }
  };

  //  edit category

  const updateCrmCategory = async () => {
    try {
      if (
        editedCategory.name.trim() === "" ||
        editedCategory.name.trim().length < 3
      ) {
        Notify.warning(
          "Для едагування категорії ведіть текстове значення  (мін. кількість символів: 3)"
        );
        setCurrentlyEditing(null);
        setEditedCategory({ id: null, name: "" });
        return;
      }

      const { id, name } = editedCategory;
      const categoryExistsInMain = await isCategoryExists(categories, name);

      const categoryExistsInArchived = await isCategoryExists(
        archivedCategories,
        name
      );

      if (categoryExistsInMain || categoryExistsInArchived) {
        Notify.failure(`Категорія <${name}> вже існує у вашому списку!`);
        setCurrentlyEditing(null);
        setEditedCategory({ id: null, name: "" });
      } else {
        await axios.patch(
          `api/${type}/edit`,
          { id, name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedCategories = categories.map((category) =>
          category.id === id ? { ...category, name } : category
        );

        setCategories(updatedCategories);
        setCurrentlyEditing(null);
        setEditedCategory({ id: null, name: "" });
        Notify.success(`Категорію змінено успішно`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCategory = (e) => {
    const inputValue = e.target.value;

    if (!/^[а-яА-ЯЁёіІїЇєЄ\s]+$/u.test(inputValue) && inputValue !== "") {
      Notify.warning("Будь ласка, введіть тільки кириличний текст");
    } else {
      setEditedCategory({
        ...editedCategory,
        name: inputValue,
      });
    }
  };

  const startEditing = (categoryId) => {
    const categoryToEdit = categories.find(
      (category) => category.id === categoryId
    );
    setEditedCategory({ ...categoryToEdit });
    setCurrentlyEditing(categoryId);
  };

  const cancelEditing = (e) => {
    e.preventDefault();
  };

  // unarchive category
  const unarchiveCrmCategory = async (categoryId) => {
    try {
      const { data } = await axios.put(
        `api/${type}/unarchive`,
        {
          id: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedArchivedCategories = archivedCategories.filter(
        (category) => category.id !== categoryId
      );
      setArchivedCategories(updatedArchivedCategories);
      addUnarchivedToCategories(data);
      Notify.success(`Категорію успішно додано у список`);
    } catch (error) {
      console.error(error);
    }
  };

  const addUnarchivedToCategories = (unarchived) => {
    setCategories((prevCategories) => [...prevCategories, unarchived]);
  };

  return (
    <div>
      <div className={styles.container}>
        <div
          className={`${styles.categoryContainer} ${styles.heightContainer}`}
        >
          {type === "product_category" ? (
            <h4 className={styles.categoryTitle}>Категорії товарів</h4>
          ) : (
            <h4 className={styles.categoryTitle}>Саб-категорії товарів</h4>
          )}

          <FormAddCategory
            handleCreateCategory={handleCreateCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            categories={categories}
          />

          <CategoriesList
            handleCreateCategory={handleCreateCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            categories={categories}
            currentlyEditing={currentlyEditing}
            cancelEditing={cancelEditing}
            editedCategory={editedCategory}
            handleEditCategory={handleEditCategory}
            updateCrmCategory={updateCrmCategory}
            startEditing={startEditing}
            deleteCrmCategory={deleteCrmCategory}
          />
        </div>
      </div>
      {archivedCategories?.length !== 0 && (
        <div className={styles.container}>
          <div className={styles.categoryContainer}>
            {type === "product_category" ? (
              <h4 className={styles.categoryTitle}>
                Архівовані категорії товарів
              </h4>
            ) : (
              <h4 className={styles.categoryTitle}>
                Архівовані саб-категорії товарів
              </h4>
            )}

            <ArchivedCategoriesList
              categories={categories}
              unarchiveCrmCategory={unarchiveCrmCategory}
              archivedCategories={archivedCategories}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;

ManageCategories.propTypes = {
  type: PropTypes.oneOf(["product_category", "product_sub_category"])
    .isRequired,
};

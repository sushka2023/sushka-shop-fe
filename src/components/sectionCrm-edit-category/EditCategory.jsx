import { useEffect, useState } from "react";
import styles from "./EditCategory.module.scss";
import axios from "axios";
import CategoriesList from "./CategoriesList";
import ArchivedCategoriesList from "./ArchivedCategories";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdG9yZS5zdXNoa2EubW9kQGdtYWlsLmNvbSIsImlhdCI6MTY5OTI4MDA1NCwiZXhwIjoxNzA0NjM2ODU0LCJzY29wZSI6ImFjY2Vzc190b2tlbiJ9.z_KIXuGOq-9irj5FaD8-V_npsKMYG7r6j9BXum1vOtY";

const EditCategory = () => {
  const [currentlyEditing, setCurrentlyEditing] = useState(null);
  const [categories, setCategories] = useState([]);
  const [archivedCategories, setArchivedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState({ id: null, name: "" });

  // get categories

  useEffect(() => {
    const fetchCrmCategories = async () => {
      try {
        const { data } = await axios.get("api/product_category/all_for_crm", {
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
  }, []);

  // create category

  const createCrmCategory = async () => {
    try {
      const { data } = await axios.post(
        "api/product_category/create",
        {
          name: newCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories([...categories, data]);
      setNewCategory("");
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
        `api/product_category/archive`,
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
    } catch (error) {
      console.error(error);
    }
  };

  //  edit category

  const updateCrmCategory = async () => {
    try {
      const { id, name } = editedCategory;

      await axios.patch(
        `api/product_category/edit`,
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCategory = (e) => {
    setEditedCategory({
      ...editedCategory,
      name: e.target.value,
    });
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
        `api/product_category/unarchive`,
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
          <h4 className={styles.categoryTitle}>Категорії товарів</h4>
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
            <h4 className={styles.categoryTitle}>
              Архівовані категорії товарів
            </h4>
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

export default EditCategory;

import { ReactComponent as IconCheck } from "../../icons/check.svg";
import styles from "./EditCategory.module.scss";
import PropTypes from "prop-types";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const FormAddCategory = ({
  handleCreateCategory,
  newCategory,
  setNewCategory,
  categories,
}) => {
  const handleChangeInput = (e) => {
    const inputValue = e.target.value;

    if (!/^[а-яА-ЯЁёіІїЇєЄ\s]+$/u.test(inputValue) && inputValue !== "") {
      Notify.warning("Будь ласка, введіть тільки кириличний текст");
    } else {
      setNewCategory(inputValue);
    }
  };

  return (
    <>
      <form
        className={styles.formAdd}
        autoComplete="off"
        onSubmit={handleCreateCategory}
      >
        <input
          className={styles.categoryAdd}
          maxLength={20}
          type="text"
          placeholder="Нова категорія"
          required
          value={newCategory}
          onInput={handleChangeInput}
        />
        <button
          className={styles.btnAdd}
          type="submit"
          disabled={categories.length >= 5 || !newCategory}
        >
          <IconCheck
            className={
              categories.length >= 5 ? styles.iconAddDisable : styles.iconAdd
            }
          />
        </button>
      </form>
    </>
  );
};

export default FormAddCategory;

FormAddCategory.propTypes = {
  handleCreateCategory: PropTypes.func.isRequired,
  newCategory: PropTypes.string.isRequired,
  setNewCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

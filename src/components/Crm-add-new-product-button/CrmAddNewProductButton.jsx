import { Report } from "notiflix/build/notiflix-report-aio";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../../Redax/Crm-add-new-product/operation/Operation";
import { selectFormData } from "../../Redax/Crm-add-new-product/selectors/Selectors";
import newProductSchema from "../Halpers/validateNewProduct";
import styles from "./crmAddNewProductButton.module.scss";

const CrmAddNewProductButton = () => {
  const productData = useSelector(selectFormData);
  const dispatch = useDispatch();

  const handleClickSaveProduct = async (e) => {
    e.preventDefault();

    try {
      await newProductSchema.validate(productData, { abortEarly: false });
      dispatch(createNewProduct(productData));
    } catch (error) {
      Report.failure(
        "Помилка при перевірці форми",
        'Не заповненні обов`язкові поля',
        "Добре"
      );
    }
  };
    return (
      <div className={styles.saveBtnWrapp}>
        <button
          className={styles.saveBtns}
          onClick={handleClickSaveProduct}
          disabled={productData.isLoading}
        >
          {productData.isLoading > 0 && (
            <span>
              <ClipLoader size={15} color={"#FFFFFF"} />
            </span>
          )}
          Зберегти
        </button>
        {productData.isLoading > 0 && (
          <p className={styles.isLoadingText}>
            Збереження! Не закривайте сторінку.
          </p>
        )}
      </div>
    );
};

export default CrmAddNewProductButton;

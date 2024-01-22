import { useState, useEffect, useRef } from "react";
import * as yup from "yup";
import { newProductSchema } from "../../Halpers/validateNewProduct";
import { useDispatch, useSelector } from "react-redux";
import { selectProductId, selectFormErrors } from "../../Redax/Crm-add-new-product/selectors/Selectors";
import { addData, setFormErrors } from "../../Redax/Crm-add-new-product/slices/product-slice";
import CrmStatus from "../../components/Crm-status/CrmStatus";
import CrmImages from "../../components/Crm-images/crmImages";
import CrmCategoriesBlock from "../../components/Crm-categories-block/CrmCategoriesBlock";
import CrmAddNewProductTable from "../../components/Crm-add-new-product-table/CrmAddNewProductTable";
import CrmAddNewProductButton from "../../components/Crm-add-new-product-button/CrmAddNewProductButton";
import { ReactComponent as ArowIcon } from "../../icons/arrow.svg";
import styles from "./crmAddNewProduct.module.scss";

const CrmAddNewProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Новий");
  const containerRef = useRef(null);
  const nameInputRef = useRef(null);
  const descriptionRef = useRef(null);
  const dispatch = useDispatch();
  const productId = useSelector(selectProductId);
  const formErrors = useSelector(selectFormErrors);

const validateField = async (name, value) => {
  try {
    await yup.reach(newProductSchema, name).validate(value);
    dispatch(setFormErrors({ ...formErrors, [name]: "" }));
  } catch (error) {
    dispatch(setFormErrors({ ...formErrors, [name]: error.message }));
  }
};
  
  const handleStatusChange = (type, newStatusValue, newStatusName) => {
    setCurrentStatus(newStatusName);
    dispatch(addData({ type, value: newStatusValue }));
  };

  const handleChangeFormData = (e) => {
    const { value, name } = e.target;
    validateField(name, value);
    dispatch(addData({type: name, value }))
  };

  useEffect(() => {
    if (productId) {
      if (nameInputRef.current) nameInputRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";
    }
  }, [productId]);
  
  useEffect(() => {
    const handleClickDropdown = (e) => {
      setIsOpen(!isOpen)

      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickDropdown)

    return () => {
      document.removeEventListener('click', handleClickDropdown)
    }
  }, [isOpen])

  const applyDropDown = (e) => {
    if (e.target.nodeName === 'BUTTON') {
      return
    }

    e.stopPropagation()
  }

  const statusClasses = {
    Новий: styles.statusNew,
    Активний: styles.statusActive,
    Архівований: styles.statusArchive
  }

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={styles.formWrapp}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>
              <span
                className={`${styles.status} ${statusClasses[currentStatus]}`}
              >
                {currentStatus}
              </span>
            </div>
            <div className={styles.editSaveBtnsBlock}>
              <div className={styles.dropdownPosition} onClick={applyDropDown}>
                <button
                  type="button"
                  ref={containerRef}
                  className={styles.editBtn}
                >
                  Змінити статус
                  <ArowIcon className={styles.arrowIcon} />
                </button>
                {isOpen && (
                  <CrmStatus
                    onChange={handleChangeFormData}
                    onStatusChange={handleStatusChange}
                    currentStatus={currentStatus}
                  />
                )}
              </div>
              <CrmAddNewProductButton />
            </div>
          </div>
          <div className={styles.inputsWrapp}>
            <div className={styles.textInputsLayout}>
              <label
                htmlFor="name"
                className={`${styles.label} ${
                  formErrors.name ? styles.error : ""
                }`}
              >
                Назва товару*
                <input
                  ref={nameInputRef}
                  onChange={handleChangeFormData}
                  type="text"
                  minLength={6}
                  maxLength={50}
                  id="name"
                  name="name"
                  className={`${styles.nameInput} ${
                    formErrors.name ? styles.errorInput : ""
                  }`}
                />
                {formErrors.name && (
                  <p className={styles.errorMessage}>{formErrors.name}</p>
                )}
              </label>
              <label
                htmlFor="description"
                className={`${styles.label} ${
                  formErrors.description ? styles.error : ""
                }`}
              >
                Опис*
                <textarea
                  ref={descriptionRef}
                  onChange={handleChangeFormData}
                  type="text"
                  minLength={6}
                  maxLength={150}
                  id="description"
                  name="description"
                  className={`${styles.descriptionTextaria} ${
                    formErrors.description ? styles.errorInput : ""
                  }`}
                />
                {formErrors.description && (
                  <p className={styles.errorMessage}>
                    {formErrors.description}
                  </p>
                )}
              </label>
            </div>
            <CrmImages />
          </div>
          <div className={styles.categoriesOptionWrapp}>
            <CrmCategoriesBlock />
          </div>
        </div>
        <CrmAddNewProductTable />
      </form>
    </section>
  )
}

export default CrmAddNewProduct

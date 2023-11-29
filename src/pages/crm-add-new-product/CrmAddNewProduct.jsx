import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../../Redax/Crm-add-new-product/slices/product-slice";
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
  const [timerId, setTimerId] = useState(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  
  const handleStatusChange = (type, newStatusValue, newStatusName) => {
    setCurrentStatus(newStatusName);
    dispatch(addData({ type, value: newStatusValue }));
  };

  const handleChangeFormData = (e) => {
    const { value, name } = e.target;

    if (timerId) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(() => {
      dispatch(addData({type: name, value }));
    }, 1000);

    setTimerId(newTimerId);
  };
  
  useEffect(() => {
    const handleClickDropdown = (e) => {
      setIsOpen(!isOpen);

      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickDropdown);

    return () => {
      document.removeEventListener("click", handleClickDropdown);
    };
  }, [isOpen]);

  const applyDropDown = (e) => {
    
    if (e.target.nodeName === "BUTTON") {
      return;
    }

    e.stopPropagation();
  };

  const statusClasses = {
    Новий: styles.statusNew,
    Активний: styles.statusActive,
    Архівований: styles.statusArchive,
  };

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
              <label htmlFor="name" className={styles.label}>
                Назва товару*
                <input
                  onChange={handleChangeFormData}
                  type="text"
                  id="name"
                  name="name"
                  className={styles.nameInput}
                />
              </label>
              <label htmlFor="description" className={styles.label}>
                Опис*
                <textarea
                  onChange={handleChangeFormData}
                  type="text"
                  id="description"
                  name="description"
                  className={styles.descriptionTextaria}
                />
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
  );
};

export default CrmAddNewProduct;

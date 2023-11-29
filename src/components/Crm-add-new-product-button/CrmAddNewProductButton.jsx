import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../../Redax/Crm-add-new-product/operation/Operation";
import { selectFormData } from "../../Redax/Crm-add-new-product/selectors/Selectors";
import styles from "./crmAddNewProductButton.module.scss";

const CrmAddNewProductButton = () => {
    const productData = useSelector(selectFormData);
    const dispatch = useDispatch();

    const handleClickSaveProduct = (e) => {
        e.preventDefault();
        dispatch(createNewProduct(productData))
    }
    return <button className={styles.saveBtns} onClick={handleClickSaveProduct}>Зберегти</button>;
}

export default CrmAddNewProductButton;
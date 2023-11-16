import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainCategories, fetchSubCategories } from "../../Redax/Crm-add-new-product/operation/Operation";
import { selectMainCategories, selectSubCategories } from "../../Redax/Crm-add-new-product/selectors/Selectors";
import CrmCategories from "../Crm-categories/CrmCategories"
import styles from "./CrmCategoriesBlock.module.scss"

const CrmCategoriesBlock = () => {
    const mainCategories = useSelector(selectMainCategories);
    const subCategories = useSelector(selectSubCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMainCategories({ operationType: "fetch-main-categories" }))
        dispatch(fetchSubCategories({ operationType: "fetch-sub-categories" }))
    }, [dispatch]);

    return (
      <div className={styles.categoriesOptionWrapp}>
        <CrmCategories categories={mainCategories} type="main" />
        <CrmCategories categories={subCategories} type="sub" />
      </div>
    );
};

export default CrmCategoriesBlock;
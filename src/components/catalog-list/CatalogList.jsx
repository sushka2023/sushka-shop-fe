import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllItems } from "../../Redax/Products/operation/Operation";
import {
  selectAllItem,
  selectOffset,
  selectOperationType,
  selectSortValue,
} from "../../Redax/Products/selectors/Selectors";
import ItemCard from "../../components/item-card/ItemCard";
import styles from "./catalog-list.module.scss";

const CatalogList = () => {
    const currentPath = window.location.pathname;
    const allProducts = useSelector(selectAllItem);
    const operationType = useSelector(selectOperationType);
    const offset = useSelector(selectOffset);
    const sortValue = useSelector(selectSortValue);
    const { category } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(
          fetchAllItems({
            offset,
            operationType,
            sortValue,
            category:
              (currentPath !== "/catalog" || currentPath !== "/catalog/all") &&
              category,
          })
        );
      }, [category, currentPath, dispatch, offset, sortValue]);

  return (
    <ul className={styles.catalogList}>
      {allProducts.map((item, index) => (
        <ItemCard item={item} key={index} isFavorite={item.is_favorite} />
      ))}
    </ul>
  );
};

export default CatalogList;

import { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffset, setOperation } from "../../Redax/Products/slices/items-slice";
import { selectAllItem, selectOffset, selectOperationType } from "../../Redax/Products/selectors/Selectors";
import ItemCard from "../../components/item-card/ItemCard";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as ScrollLink } from "react-scroll";
import { useParams } from "react-router-dom";
import styles from "./CatalogPage.module.scss";
import { ReactComponent as ArowIcon } from "../../icons/arrowdown.svg";
import Filter from "../../components/Filter/filter";
import { fetchAllItems, fetchItemsByCategoties } from "../../Redax/Products/operation/Operation";
import CategoriesButtons from "../../components/Categories-button/Categories";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FCC812",
    },
  },
});

const paginationStyles = {
  "& .MuiPaginationItem-root": {
    fontFamily: "Open Sans",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "120%",
    color: "#FFF !important",
  },
};

const CatalogPage = () => {
  const { category, page } = useParams();
  const [pageN, setPageN] = useState(parseInt(page) || 1);

  const currentPath = window.location.pathname;
  const allProducts = useSelector(selectAllItem);
  const operationType = useSelector(selectOperationType);
  const offset = useSelector(selectOffset);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setPageN(parseInt(page) || 1);
    const initialPage = parseInt(page) || 1;
    dispatch(setOffset((initialPage - 1) * 9));
    dispatch(setOperation("fatch"));
  }, [dispatch, page]);
  
  console.log(currentPath);

  useEffect(() => {
    const fetchData = async () => {
      if (operationType === "fatch" || operationType === "loadMore") {
        if (currentPath === "/catalog" || currentPath === "/catalog/all") {
          dispatch(
            fetchAllItems({
              params: offset,
              operationType: operationType,
            })
          );
        } else {
          dispatch(
            fetchItemsByCategoties({
              params: offset,
              operationType: operationType,
              category: category,
            })
          );
        }
      }
    };

    fetchData();
  }, [category, currentPath, dispatch, offset, operationType]);

  const handleClickLoadMore = () => {
    dispatch(setOperation("loadMore"));
    const newOffset = offset + 9;
    setPageN(pageN + 1);
    dispatch(setOffset(newOffset))
  };

  const handleClickPagination = (e) => {
    dispatch(setOperation("fatch"));
    const currentPage = e.target.innerText;
    setPageN(parseInt(currentPage));
    dispatch(setOffset(parseInt((currentPage - 1) * 9)));
  };

  return (
    <section className={styles.catalogBg}>
      <div className={styles.catalogBorder}></div>
      <div className={styles.container}>
        <div className={styles.catalogOption}>
          <CategoriesButtons />
          <div className={styles.optionsWrapper}>
            <Filter />
          </div>
        </div>
        <div>
          <ul className={styles.catalogList}>
            {allProducts.map((item, index) => (
              <ItemCard item={item} key={index} isFavorite={item.is_favorite} />
            ))}
          </ul>
        </div>
        <div className={styles.btnWrapper}>
          {pageN < 3 && (
            <button
              type="button"
              className={styles.loadMore}
              onClick={handleClickLoadMore}
            >
              Більше
              <ArowIcon />
            </button>
          )}
        </div>
        <div className={styles.pagination}>
          <ThemeProvider theme={theme}>
            <ScrollLink to="nav">
              <Pagination
                count={3}
                color="primary"
                size="large"
                hidePrevButton
                hideNextButton
                sx={paginationStyles}
                onClick={handleClickPagination}
                page={pageN}
              />
            </ScrollLink>
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;

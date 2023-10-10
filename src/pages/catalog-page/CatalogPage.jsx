import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllItem } from "../../Redax/Products/selectors/Selectors";
import ItemCard from "../../components/item-card/ItemCard";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as ScrollLink } from "react-scroll";
import styles from "./CatalogPage.module.scss";
import { ReactComponent as ArowIcon } from "../../icons/arrowdown.svg";
import Filter from "../../components/Filter/filter";
import { fetchItems } from "../../Redax/Products/operation/Operation";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const allProducts = useSelector(selectAllItem);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems({ params: 0, operationType: "fatch" }));
  }, [dispatch]);

  const handleClickLoadMore = () => {
    setOffset(offset + 1);
    setCurrentPage(currentPage + 1);
    dispatch(fetchItems({ params: offset + 1, operationType: "loadMore" }));
  };

  const handleClickPagination = (e) => {
    setOffset(parseInt(e.target.textContent));
    setCurrentPage(parseInt(e.target.textContent));
    dispatch(
      fetchItems({ params: e.target.textContent, operationType: "pagination" })
    );
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
              <ItemCard item={item} key={index} />
            ))}
          </ul>
        </div>
        <div className={styles.btnWrapper}>
          {currentPage < 3 && (
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
                page={currentPage}
              />
            </ScrollLink>
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;

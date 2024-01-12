import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffset, setOperation } from "../../Redax/Products/slices/items-slice";
import { selectOffset } from "../../Redax/Products/selectors/Selectors";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as ScrollLink } from "react-scroll";
import { useParams } from "react-router-dom";
import styles from "./CatalogPage.module.scss";
import { ReactComponent as ArowIcon } from "../../icons/arrowdown.svg";
import Filter from "../../components/Filter/filter";
import CategoriesButtons from "../../components/Categories-button/Categories";
import CatalogList from "../../components/catalog-list/CatalogList";

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
  const { page } = useParams();
  const [pageN, setPageN] = useState(parseInt(page) || 1);

  const offset = useSelector(selectOffset);
  const dispatch = useDispatch();

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
          <CatalogList />
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

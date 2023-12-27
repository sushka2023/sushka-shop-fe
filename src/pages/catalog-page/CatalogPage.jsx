import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllItem } from "../../Redax/Products/selectors/Selectors";
import ItemCard from "../../components/item-card/ItemCard";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as ScrollLink } from "react-scroll";
import { useParams, useNavigate } from "react-router-dom";
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
  const { params, page } = useParams();
  const [offset, setOffset] = useState(0);
  const [pageN, setPageN] = useState(1);
  const [operationType, setOperationType] = useState("fatch");

  const allProducts = useSelector(selectAllItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchItems({ params: offset, operationType: operationType }));
  }, [dispatch, offset, operationType]);

  const handleClickLoadMore = () => {
    setOperationType("loadMore");
    const newOffset = offset + 9;
    setPageN(parseInt(pageN + 1));
    setOffset(newOffset === 0 ? newOffset + 1 : newOffset)
    // navigate(`/catalog/${params}/${parseInt(page) + 1}`);
  };

  const handleClickPagination = (e) => {
    setOperationType("fatch");
    const newOffset = offset + 9;
    const currentPage = e.target.innerText;
    
    setPageN(parseInt(currentPage));
    setOffset(newOffset);
    // navigate(`/catalog/${params}/${newPage - 1}`);
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
          {offset < 3 && (
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

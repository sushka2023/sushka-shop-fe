import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Suspense, useEffect } from "react";
import { fetchAllCategories } from "../../Redax/Products/operation/Operation";
import { selectAllCategories } from "../../Redax/Products/selectors/Selectors";
import { Outlet } from "react-router-dom";
import HeaderCRM from "./header/HeaderCRM";
import AsideCRM from "./aside/AsideCRM";
import styles from "./LayoutCRM.module.scss";

const LayoutCRM = () => {
  // const allCategories = useSelector(selectAllCategories);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!allCategories) {
  //     dispatch(fetchAllCategories({ operationType: "fatchAllCategories" }));
  //   }
  // }, [dispatch, allCategories]);

  return (
    <div className={styles.containerCrm}>
      <div className={styles.asideCrm}>
        <AsideCRM />
      </div>
      <div className={styles.containerHeader}>
        <HeaderCRM />
        <div className={styles.containerContent}>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

LayoutCRM.propTypes = {
  children: PropTypes.node,
};

export default LayoutCRM;

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import HeaderCRM from "./header/HeaderCRM";
import AsideCRM from "./aside/AsideCRM";
import styles from "./LayoutCRM.module.scss";
import { selectIsLoading } from "../../Redax/Crm-add-new-product/selectors/Selectors";
import { Report } from "notiflix/build/notiflix-report-aio";

const LayoutCRM = () => {

  const isLoading = useSelector(selectIsLoading);

   useEffect(() => {
     if (isLoading === 0) {
       Report.success("Товар успішно створено", "", "Добре");
     }
   }, [isLoading]);

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

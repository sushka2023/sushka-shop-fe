import React from 'react';
import styles from './ProductsTable.module.scss'
import ProductsList from './components/products-list/ProductsList';
import PaginationTable from './components/products-list/PaginationTable';


const ProductsTable = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.mainContainerProductPageContainer}>
                <h1 className={styles.mainContainerProductPageContainerTableTitle}>CRM</h1>
                <PaginationTable />
            </div>
        </div>
    )
}

export default ProductsTable;


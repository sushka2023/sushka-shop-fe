import React, { useMemo } from 'react';
import styles from './ProductsList.module.scss';
import { useTable } from "react-table";
import TEST_DATA from './TEST_DATA.json';
import { ReactComponent as ArchiveIcon } from '../icons/ArchiveIcon.svg';
import { ReactComponent as EditIcon } from '../icons/EditIcon.svg';
import { ReactComponent as NextArrow } from '../icons/NextArrow.svg';

const ProductsList = () => {

    const COLUMNS = [
        {
            header: 'Номер',
            accessor: 'id',
        },
        {
            header: 'Назва товару',
            accessor: 'name',
        },
        {
            header: 'Опис',
            accessor: 'description',
        },
        {
            header: 'Змінити',
            accessor: 'actions',
            Cell: ({ cell }) => (
                <>
                    <button className={styles.btn}><ArchiveIcon /></button>
                    <button className={styles.btn}><EditIcon /></button>
                </>
            )
        },
    ];

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => TEST_DATA, []);

    const tableInstance = useTable({
        columns,
        data,
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance

    return (
        <>
        <table 
        className={styles.container} 
        {...getTableProps()}
        style={{width: '1360px',
            height: '761px',
            overflow: 'hidden',
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '30px',
            margin: '0 0 20px 0',
            display: 'flex',
            flexDirection: 'column',
            borderCollapse: 'collapse'}} 
        >
            <div className={styles.containerHeader}>
                <h1 className={styles.containerHeaderTitle}>Табличка товарів <span>()</span></h1>
                <button className={styles.containerHeaderBtn}>Додати новий товар</button>
            </div>
            <thead className={styles.containerTableHeaders}>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}
                style={{display: 'block', width: '100%'}}>
                    {headerGroup.headers.map(column => (
                        <th 
                            {...column.getHeaderProps()} 
                            className={styles.containerTableHeadersColumnHeader} 
                            style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                backgroundColor: '#F2F2F2',
                                textAlign: 'left',
                            }}
                        >
                            {column.render('header')}
                        </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody  {...getTableBodyProps()} className={styles.containerTableRows}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr 
                        {...row.getRowProps()} 
                        className={styles.containerTableRowsRow}
                        >
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()} className={styles.containerTableRowsRowRowCell}>
                                    {cell.render('Cell')}
                                    </td>
                                })
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className={styles.footer}> 
            <p className={styles.footerNumberOfPages}></p>
            <button className={styles.footerBtn}>Попередня </button>
            <button className={styles.footerBtn}>Наступна <span className={styles.footerBtnArrow}><NextArrow /></span></button>
        </div>
        </>
    )
}

export default ProductsList;

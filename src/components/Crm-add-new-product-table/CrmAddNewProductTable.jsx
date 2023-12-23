import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProductId, selectFormErrors } from "../../Redax/Crm-add-new-product/selectors/Selectors";
import { addData } from "../../Redax/Crm-add-new-product/slices/product-slice";
import { v4 as uuidv4 } from "uuid";
import WeightList from "./WeightList";
import { ReactComponent as PlusIcon } from "../../icons/plus1.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete.svg";
import { ReactComponent as ArowIcon } from "../../icons/arrow.svg";
import styles from './CrmAddNewProduct.module.scss'

const arrayOptionWeight = ['50', '100', '150', '200', '300', '400', '500', '1000'];

const CrmAddNewProductTable = () => {
  const [isOpen] = useState(null);
  const [openRows, setOpenRows] = useState({});
  const [currentWeight] = useState(arrayOptionWeight[0]);
  const [data, setData] = useState([
    {
      id: uuidv4(),
      active: false,
      weight: arrayOptionWeight[0],
      availability: "",
      price: "",
      sale: false,
      priceSale: "",
    },
  ]);
  const dispatch = useDispatch();
  const productId = useSelector(selectProductId);
  const validationErrors = useSelector(selectFormErrors);

 const hasError = (rowIndex, columnName) => {
   const errorKey = `[${rowIndex}].${columnName}`;
   return validationErrors && validationErrors[errorKey];
 };

  const handleInputChange = (id, columnId, value) => {
      let formattedValue = value;

      if (
        columnId === "price" ||
        columnId === "priceSale" ||
        columnId === "availability"
      ) {
        formattedValue = value === "" ? "" : parseFloat(value);
      }
    
    setData((currentData) =>
      currentData.map((row) =>
        row.id === id ? { ...row, [columnId]: formattedValue } : row
      )
    );
  };

  useEffect(() => {
    setData([
      {
        id: uuidv4(),
        active: false,
        weight: arrayOptionWeight[0],
        availability: null,
        price: null,
        sale: false,
        priceSale: null,
      },
    ]);
  }, [productId])

  useEffect(() => {
    dispatch(addData({ type: 'price', value: data }));
  }, [data, dispatch])

  const addNewRow = () => {
    const newRow = {
      id: uuidv4(),
      active: false,
      weight: arrayOptionWeight[0],
      availability: null,
      price: null,
      sale: false,
      priceSale: null,
    };
    setData((currentData) => [...currentData, newRow]);
  };

  useEffect(() => {
    if (isOpen) {
      setData(data.map((row) =>
        row.id === isOpen.id ? { ...row, weight: currentWeight } : row
      ))
    }
  }, [currentWeight, data, isOpen]);

  const toggleWeightList = (id) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [id]: !prevOpenRows[id],
    }));
  };

  const handleDeleteRow = (id) => data.length > 1 && setData(data.filter((row) => row.id !== id));

  const handleWeightChange = (id, newWeight) => {
    setData((currentData) =>
      currentData.map((row) =>
        row.id === id ? { ...row, weight: newWeight } : row
      )
    );
  };
  
  const handleCloseWeightList = () => setOpenRows({});

  return (
    <table className={`${styles.tableWrapp} ${styles.formWrapp}`} name="price">
      <thead className={styles.tableHeader}>
        <tr className={styles.tableHeaderRow}>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextActive}`}
          >
            Активна
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextWeight}`}
          >
            Вага (г)*
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextAvailability}`}
          >
            Наявність (шт)*
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextPrice}`}
          >
            Ціна (грн)*
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextSale}`}
          >
            Акція
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextPriceSale}`}
          >
            Ціна (акційна)
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextDellete}`}
          ></th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {data.map((row, index) => (
          <tr className={styles.tableContentRow} key={row.id}>
            <td
              className={`${styles.tableColumnInput} ${styles.tableHeaderTextActive}`}
            >
              <div className={styles.checkboxContainer}>
                <input
                  className={styles.inputTable}
                  id={`customCheckboxActive${row.id}`}
                  type="checkbox"
                  checked={row.active}
                  onChange={(e) =>
                    handleInputChange(row.id, "active", e.target.checked)
                  }
                />
                <label htmlFor={`customCheckboxActive${row.id}`}></label>
              </div>
            </td>
            <td
              className={`${styles.weightColumnWrapp} ${styles.tableColumnInput} ${styles.tableHeaderTextWeight}`}
            >
              <div
                className={styles.weightColumn}
                onClick={() => toggleWeightList(row.id)}
              >
                {row.weight}
                <div className={styles.arrowWrapp}>
                  <ArowIcon
                    className={`${styles.arowIcon} ${
                      openRows[row.id] ? styles.arowIconActive : ""
                    }`}
                  />
                </div>
              </div>
              {openRows[row.id] && (
                <WeightList
                  WeightList={arrayOptionWeight}
                  currentWeight={row.weight}
                  onWeightChange={(newWeight) =>
                    handleWeightChange(row.id, newWeight)
                  }
                  onClose={handleCloseWeightList}
                />
              )}
            </td>
            <td
              className={`${styles.tableColumnInput} ${
                styles.tableHeaderTextAvailability
              } ${hasError(index, "availability") ? styles.errorBorder : ""}`}
            >
              <input
                className={`${styles.inputTable} ${
                  !row.availability ? "" : styles.inputTableTextEmpty
                }`}
                type="number"
                value={row.availability || ""}
                onChange={(e) =>
                  handleInputChange(row.id, "availability", e.target.value)
                }
              />
            </td>
            <td
              className={`${styles.tableColumnInput} ${
                styles.tableHeaderTextPrice
              } ${hasError(index, "price") ? styles.errorBorder : ""}`}
            >
              <input
                className={`${styles.inputTable} ${styles.inputTablePrice} ${
                  !row.price ? "" : styles.inputTableTextEmpty
                }`}
                type="number"
                value={row.price || ""}
                onChange={(e) =>
                  handleInputChange(row.id, "price", e.target.value)
                }
              />
            </td>
            <td
              className={`${styles.tableColumnInput} ${styles.tableHeaderTextSale}`}
            >
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id={`customCheckboxSale${row.id}`}
                  checked={row.sale}
                  onChange={(e) =>
                    handleInputChange(row.id, "sale", e.target.checked)
                  }
                />
                <label htmlFor={`customCheckboxSale${row.id}`}></label>
              </div>
            </td>
            <td
              className={`${styles.tableColumnInput} ${
                styles.tableHeaderTextPriceSale
              } ${hasError(index, "priceSale") ? styles.errorBorder : ""}`}
            >
              <input
                className={`${styles.inputTable} ${
                  !row.priceSale ? "" : styles.inputTableTextEmpty
                }`}
                type="number"
                value={row.priceSale || ""}
                onChange={(e) =>
                  handleInputChange(row.id, "priceSale", e.target.value)
                }
              />
            </td>
            <td
              className={`${styles.tableColumnInput} ${styles.tableHeaderTextDellete}`}
            >
              <DeleteIcon
                className={styles.iconDel}
                onClick={() => handleDeleteRow(row.id)}
              />
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="6" className={styles.containerPlus}>
            <div
              className={`${styles.iconWrapp} ${
                arrayOptionWeight.length === data.length
                  ? styles.iconWrappDisabled
                  : ""
              }`}
            >
              <PlusIcon
                className={`${styles.iconPlus} ${
                  arrayOptionWeight.length === data.length
                    ? styles.iconPlusDisabled
                    : ""
                }`}
                onClick={addNewRow}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CrmAddNewProductTable;

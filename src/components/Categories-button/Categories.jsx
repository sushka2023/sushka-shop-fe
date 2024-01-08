import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAllCategories } from '../../Redax/Products/selectors/Selectors';
import { setOffset, setOperation } from '../../Redax/Products/slices/items-slice';
import styles from './Categories.module.scss';


const CategoriesButtons = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [activeButton, setActiveButton] = useState(parseInt(category) || 'all');
    const allCategories = useSelector(selectAllCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        setActiveButton(parseInt(category) || 'all')
    }, [category]);

    const handleClickButton = (e, categoryId) => {
        navigate(`/catalog/${categoryId}/1`);
        dispatch(setOffset(0));
        dispatch(setOperation("fatch"))

        if (categoryId === 'all') {
            navigate(`/catalog/all`);
            dispatch(setOffset(0));
            dispatch(setOperation("fatch"))
        }

        setActiveButton(categoryId);
    }

    return (
        <ul className={`${styles.list}`}>
            {allCategories &&
                allCategories.map((category) => (
                    <li key={category.id}>
                        <button
                            type="button"
                            className={`${styles.listButton} ${activeButton === category.id ? styles.active : ""}`}
                            onClick={(e) => handleClickButton(e, category.id)}
                        >
                            {category.name}
                        </button>
                    </li>
                ))}
            <li>
                <button
                    type="button"
                    className={`${styles.listButton} ${activeButton === 'all' ? styles.active : ""}`}
                    onClick={(e) => handleClickButton(e, 'all')}
                >
                    Все
                </button>
            </li>
        </ul>
    );
};

export default CategoriesButtons;
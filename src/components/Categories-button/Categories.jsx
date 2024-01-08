import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAllCategories } from '../../Redax/Products/selectors/Selectors';
import styles from './Categories.module.scss';


const CategoriesButtons = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [activeButton, setActiveButton] = useState(parseInt(category) || 'all');
    const allCategories = useSelector(selectAllCategories);

    useEffect(() => {
        setActiveButton(parseInt(category) || 'all')
    }, [category]);

    const handleClickButton = (e, categoryId) => {
        navigate(`/catalog/${categoryId}/1`);

        if (categoryId === 'all') {
            navigate(`/catalog`);
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